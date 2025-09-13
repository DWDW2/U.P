import { CarDirtyCleanService } from 'src/services/car-dirty-clean.service';
import { DetectByUrlDto } from 'src/dto/detect-by-url.dto';
import { DetectionResponseDto } from 'src/dto/detection-response.dto';
export declare class CarDirtyCleanController {
    private readonly carDirtyCleanService;
    constructor(carDirtyCleanService: CarDirtyCleanService);
    detectFromUpload(file: Express.Multer.File): Promise<DetectionResponseDto>;
    detectFromUrl(detectByUrlDto: DetectByUrlDto): Promise<DetectionResponseDto>;
    getHealth(): {
        status: string;
        message: string;
    };
}
