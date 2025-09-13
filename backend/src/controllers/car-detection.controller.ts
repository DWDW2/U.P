import {
    Controller,
    Post,
    Body,
    UseInterceptors,
    UploadedFile,
    BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CarDetectionService } from '../services/car-detection.service';
import { DetectByUrlDto } from '../dto/detect-by-url.dto';
import { DetectionResponseDto } from '../dto/detection-response.dto';

@Controller('car-scratch-and-dent')
export class CarDetectionController {
    constructor(private readonly carDetectionService: CarDetectionService) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('image'))
    async detectFromUpload(
        @UploadedFile() file: Express.Multer.File,
    ): Promise<DetectionResponseDto> {
        if (!file) {
            throw new BadRequestException('No image file provided');
        }

        const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (!allowedMimeTypes.includes(file.mimetype)) {
            throw new BadRequestException(
                'Invalid file type. Only JPEG, PNG, and WebP images are allowed.',
            );
        }

        const base64Image = this.carDetectionService.convertBufferToBase64(file.buffer);

        return this.carDetectionService.detectFromBase64(base64Image);
    }

    @Post('url')
    async detectFromUrl(
        @Body() detectByUrlDto: DetectByUrlDto,
    ): Promise<DetectionResponseDto> {
        return this.carDetectionService.detectFromUrl(detectByUrlDto.imageUrl);
    }

    @Post('health')
    getHealth(): { status: string; message: string } {
        return {
            status: 'ok',
            message: 'Car detection service is running',
        };
    }
}
