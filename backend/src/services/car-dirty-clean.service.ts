import { Injectable, BadRequestException } from '@nestjs/common';
import { spawn } from 'child_process';
import { promises as fs } from 'fs';
import * as path from 'path';
import axios from 'axios';
import { DetectionResponseDto } from '../dto/detection-response.dto';

@Injectable()
export class CarDirtyCleanService {
    private readonly modelPath: string;
    private readonly pythonScriptPath: string;

    constructor() {
        this.modelPath = path.join(process.cwd(), '..', 'model', 'car_dirty_clean_model.h5');
        this.pythonScriptPath = path.join(process.cwd(), 'scripts', 'car_dirty_prediction.py');
    }

    async detectFromBase64(base64Image: string): Promise<DetectionResponseDto> {
        try {
            await this.validatePaths();

            const result = await this.executePythonScript(base64Image);

            if (!result.success) {
                throw new BadRequestException(result.error || 'Prediction failed');
            }

            return this.formatDetectionResponse(result.prediction);
        } catch (error: any) {
            console.error('Car dirty clean detection error:', error);
            throw new BadRequestException(
                error.message || 'Failed to process image for car dirty clean detection'
            );
        }
    }

    async detectFromUrl(imageUrl: string): Promise<DetectionResponseDto> {
        try {
            const response = await axios.get(imageUrl, {
                responseType: 'arraybuffer',
                timeout: 10000,
            });

            const base64Image = Buffer.from(response.data).toString('base64');

            return this.detectFromBase64(base64Image);
        } catch (error: any) {
            console.error('Image URL download error:', error);
            throw new BadRequestException(
                `Failed to download image from URL: ${error.message}`
            );
        }
    }

    convertBufferToBase64(buffer: Buffer): string {
        return buffer.toString('base64');
    }

    private async validatePaths(): Promise<void> {
        try {
            await fs.access(this.modelPath);
            await fs.access(this.pythonScriptPath);
        } catch (error) {
            throw new BadRequestException(
                `Required files not found. Model: ${this.modelPath}, Script: ${this.pythonScriptPath}`
            );
        }
    }

    private async executePythonScript(inputData: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const pythonProcess = spawn('python3', [
                this.pythonScriptPath,
                this.modelPath,
                inputData
            ], {
                stdio: ['pipe', 'pipe', 'pipe']
            });

            let stdout = '';
            let stderr = '';

            pythonProcess.stdout.on('data', (data) => {
                stdout += data.toString();
            });

            pythonProcess.stderr.on('data', (data) => {
                stderr += data.toString();
            });

            pythonProcess.on('close', (code) => {
                if (code !== 0) {
                    console.error('Python script error:', stderr);
                    reject(new Error(`Python script failed with code ${code}: ${stderr}`));
                    return;
                }

                try {
                    const result = JSON.parse(stdout);
                    resolve(result);
                } catch (parseError) {
                    console.error('Failed to parse Python script output:', stdout);
                    reject(new Error('Invalid response from Python script'));
                }
            });

            pythonProcess.on('error', (error) => {
                console.error('Python process error:', error);
                reject(new Error(`Failed to start Python process: ${error.message}`));
            });
        });
    }

    private formatDetectionResponse(prediction: any): DetectionResponseDto {
        return {
            predictions: [
                {
                    class: prediction.label,
                    confidence: prediction.confidence,
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0,
                }
            ],
            image: {
                width: 224,
                height: 224,
            },
            time: 0,
        };
    }
}
