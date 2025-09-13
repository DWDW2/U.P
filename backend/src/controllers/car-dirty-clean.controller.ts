import {
    Controller,
    Post,
    Body,
    UseInterceptors,
    UploadedFile,
    BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CarDirtyCleanService } from 'src/services/car-dirty-clean.service';
import { DetectByUrlDto } from 'src/dto/detect-by-url.dto';
import { DetectionResponseDto } from 'src/dto/detection-response.dto';

@Controller('car-dirty-clean')
export class CarDirtyCleanController {
    constructor(private readonly carDirtyCleanService: CarDirtyCleanService) { }

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

        const base64Image = this.carDirtyCleanService.convertBufferToBase64(file.buffer);

        return this.carDirtyCleanService.detectFromBase64(base64Image);
    }

    @Post('url')
    async detectFromUrl(
        @Body() detectByUrlDto: DetectByUrlDto,
    ): Promise<DetectionResponseDto> {
        return this.carDirtyCleanService.detectFromUrl(detectByUrlDto.imageUrl);
    }

    @Post('health')
    getHealth(): { status: string; message: string } {
        return {
            status: 'ok',
            message: 'Car dirty clean detection service is running',
        };
    }
}
