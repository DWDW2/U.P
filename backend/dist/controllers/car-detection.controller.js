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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarDetectionController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const car_detection_service_1 = require("../services/car-detection.service");
const detect_by_url_dto_1 = require("../dto/detect-by-url.dto");
let CarDetectionController = class CarDetectionController {
    carDetectionService;
    constructor(carDetectionService) {
        this.carDetectionService = carDetectionService;
    }
    async detectFromUpload(file) {
        if (!file) {
            throw new common_1.BadRequestException('No image file provided');
        }
        const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (!allowedMimeTypes.includes(file.mimetype)) {
            throw new common_1.BadRequestException('Invalid file type. Only JPEG, PNG, and WebP images are allowed.');
        }
        const base64Image = this.carDetectionService.convertBufferToBase64(file.buffer);
        return this.carDetectionService.detectFromBase64(base64Image);
    }
    async detectFromUrl(detectByUrlDto) {
        return this.carDetectionService.detectFromUrl(detectByUrlDto.imageUrl);
    }
    getHealth() {
        return {
            status: 'ok',
            message: 'Car detection service is running',
        };
    }
};
exports.CarDetectionController = CarDetectionController;
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CarDetectionController.prototype, "detectFromUpload", null);
__decorate([
    (0, common_1.Post)('url'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [detect_by_url_dto_1.DetectByUrlDto]),
    __metadata("design:returntype", Promise)
], CarDetectionController.prototype, "detectFromUrl", null);
__decorate([
    (0, common_1.Post)('health'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], CarDetectionController.prototype, "getHealth", null);
exports.CarDetectionController = CarDetectionController = __decorate([
    (0, common_1.Controller)('car-scratch-and-dent'),
    __metadata("design:paramtypes", [car_detection_service_1.CarDetectionService])
], CarDetectionController);
//# sourceMappingURL=car-detection.controller.js.map