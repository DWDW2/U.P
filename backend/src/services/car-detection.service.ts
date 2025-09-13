import { Injectable, BadRequestException } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { DetectionResponseDto } from '../dto/detection-response.dto';

@Injectable()
export class CarDetectionService {
    private readonly roboflowApiUrl = 'https://serverless.roboflow.com/car-scratch-and-dent/3';
    private readonly apiKey = process.env.ROBOFLOW_API_KEY || "jRvy6uNoL4L1v5WdFJKv";

    constructor() {
        if (!this.apiKey) {
            console.warn('⚠️  ROBOFLOW_API_KEY environment variable is not set!');
            console.warn('   Please set ROBOFLOW_API_KEY in your .env file or environment variables.');
            console.warn('   Get your API key from: https://roboflow.com/');
        }
    }

    async detectFromBase64(base64Image: string): Promise<DetectionResponseDto> {
        if (!this.apiKey) {
            throw new BadRequestException(
                'Roboflow API key is not configured. Please set ROBOFLOW_API_KEY environment variable.',
            );
        }

        try {
            const response: AxiosResponse<DetectionResponseDto> = await axios({
                method: 'POST',
                url: this.roboflowApiUrl,
                params: {
                    api_key: this.apiKey,
                },
                data: base64Image,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            return response.data;
        } catch (error: any) {
            console.error('Roboflow API Error:', error.response?.data || error.message);

            if (error.response?.status === 401) {
                throw new BadRequestException(
                    'Invalid Roboflow API key. Please check your ROBOFLOW_API_KEY environment variable.',
                );
            } else if (error.response?.status === 403) {
                throw new BadRequestException(
                    'Roboflow API access forbidden. Please check your API key permissions.',
                );
            } else if (error.response?.status === 429) {
                throw new BadRequestException(
                    'Roboflow API rate limit exceeded. Please try again later.',
                );
            } else {
                throw new BadRequestException(
                    `Failed to process image: ${error.response?.data?.message || error.message}`,
                );
            }
        }
    }

    async detectFromUrl(imageUrl: string): Promise<DetectionResponseDto> {
        if (!this.apiKey) {
            throw new BadRequestException(
                'Roboflow API key is not configured. Please set ROBOFLOW_API_KEY environment variable.',
            );
        }

        try {
            const response: AxiosResponse<DetectionResponseDto> = await axios({
                method: 'POST',
                url: this.roboflowApiUrl,
                params: {
                    api_key: this.apiKey,
                    image: imageUrl,
                },
            });

            return response.data;
        } catch (error: any) {
            console.error('Roboflow API Error:', error.response?.data || error.message);

            if (error.response?.status === 401) {
                throw new BadRequestException(
                    'Invalid Roboflow API key. Please check your ROBOFLOW_API_KEY environment variable.',
                );
            } else if (error.response?.status === 403) {
                throw new BadRequestException(
                    'Roboflow API access forbidden. Please check your API key permissions.',
                );
            } else if (error.response?.status === 429) {
                throw new BadRequestException(
                    'Roboflow API rate limit exceeded. Please try again later.',
                );
            } else {
                throw new BadRequestException(
                    `Failed to process image URL: ${error.response?.data?.message || error.message}`,
                );
            }
        }
    }

    convertBufferToBase64(buffer: Buffer): string {
        return buffer.toString('base64');
    }
}
