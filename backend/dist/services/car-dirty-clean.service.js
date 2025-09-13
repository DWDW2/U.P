"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarDirtyCleanService = void 0;
const common_1 = require("@nestjs/common");
const child_process_1 = require("child_process");
const fs_1 = require("fs");
const path = require("path");
const axios_1 = require("axios");
let CarDirtyCleanService = class CarDirtyCleanService {
    modelPath;
    pythonScriptPath;
    constructor() {
        this.modelPath = path.join(process.cwd(), '..', 'model', 'car_dirty_clean_model.h5');
        this.pythonScriptPath = path.join(process.cwd(), 'scripts', 'car_dirty_prediction.py');
    }
    async detectFromBase64(base64Image) {
        try {
            await this.validatePaths();
            const result = await this.executePythonScript(base64Image);
            if (!result.success) {
                throw new common_1.BadRequestException(result.error || 'Prediction failed');
            }
            return this.formatDetectionResponse(result.prediction);
        }
        catch (error) {
            console.error('Car dirty clean detection error:', error);
            throw new common_1.BadRequestException(error.message || 'Failed to process image for car dirty clean detection');
        }
    }
    async detectFromUrl(imageUrl) {
        try {
            const response = await axios_1.default.get(imageUrl, {
                responseType: 'arraybuffer',
                timeout: 10000,
            });
            const base64Image = Buffer.from(response.data).toString('base64');
            return this.detectFromBase64(base64Image);
        }
        catch (error) {
            console.error('Image URL download error:', error);
            throw new common_1.BadRequestException(`Failed to download image from URL: ${error.message}`);
        }
    }
    convertBufferToBase64(buffer) {
        return buffer.toString('base64');
    }
    async validatePaths() {
        try {
            await fs_1.promises.access(this.modelPath);
            await fs_1.promises.access(this.pythonScriptPath);
        }
        catch (error) {
            throw new common_1.BadRequestException(`Required files not found. Model: ${this.modelPath}, Script: ${this.pythonScriptPath}`);
        }
    }
    async executePythonScript(inputData) {
        return new Promise((resolve, reject) => {
            const pythonProcess = (0, child_process_1.spawn)('python3', [
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
                }
                catch (parseError) {
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
    formatDetectionResponse(prediction) {
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
};
exports.CarDirtyCleanService = CarDirtyCleanService;
exports.CarDirtyCleanService = CarDirtyCleanService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], CarDirtyCleanService);
//# sourceMappingURL=car-dirty-clean.service.js.map