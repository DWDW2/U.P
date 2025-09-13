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
exports.CarDetectionService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
let CarDetectionService = class CarDetectionService {
    roboflowApiUrl = 'https://serverless.roboflow.com/car-scratch-and-dent/3';
    apiKey = process.env.ROBOFLOW_API_KEY;
    constructor() {
        if (!this.apiKey) {
            console.warn('⚠️  ROBOFLOW_API_KEY environment variable is not set!');
            console.warn('   Please set ROBOFLOW_API_KEY in your .env file or environment variables.');
            console.warn('   Get your API key from: https://roboflow.com/');
        }
    }
    async detectFromBase64(base64Image) {
        if (!this.apiKey) {
            throw new common_1.BadRequestException('Roboflow API key is not configured. Please set ROBOFLOW_API_KEY environment variable.');
        }
        try {
            const response = await (0, axios_1.default)({
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
        }
        catch (error) {
            console.error('Roboflow API Error:', error.response?.data || error.message);
            if (error.response?.status === 401) {
                throw new common_1.BadRequestException('Invalid Roboflow API key. Please check your ROBOFLOW_API_KEY environment variable.');
            }
            else if (error.response?.status === 403) {
                throw new common_1.BadRequestException('Roboflow API access forbidden. Please check your API key permissions.');
            }
            else if (error.response?.status === 429) {
                throw new common_1.BadRequestException('Roboflow API rate limit exceeded. Please try again later.');
            }
            else {
                throw new common_1.BadRequestException(`Failed to process image: ${error.response?.data?.message || error.message}`);
            }
        }
    }
    async detectFromUrl(imageUrl) {
        if (!this.apiKey) {
            throw new common_1.BadRequestException('Roboflow API key is not configured. Please set ROBOFLOW_API_KEY environment variable.');
        }
        try {
            const response = await (0, axios_1.default)({
                method: 'POST',
                url: this.roboflowApiUrl,
                params: {
                    api_key: this.apiKey,
                    image: imageUrl,
                },
            });
            return response.data;
        }
        catch (error) {
            console.error('Roboflow API Error:', error.response?.data || error.message);
            if (error.response?.status === 401) {
                throw new common_1.BadRequestException('Invalid Roboflow API key. Please check your ROBOFLOW_API_KEY environment variable.');
            }
            else if (error.response?.status === 403) {
                throw new common_1.BadRequestException('Roboflow API access forbidden. Please check your API key permissions.');
            }
            else if (error.response?.status === 429) {
                throw new common_1.BadRequestException('Roboflow API rate limit exceeded. Please try again later.');
            }
            else {
                throw new common_1.BadRequestException(`Failed to process image URL: ${error.response?.data?.message || error.message}`);
            }
        }
    }
    convertBufferToBase64(buffer) {
        return buffer.toString('base64');
    }
};
exports.CarDetectionService = CarDetectionService;
exports.CarDetectionService = CarDetectionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], CarDetectionService);
//# sourceMappingURL=car-detection.service.js.map