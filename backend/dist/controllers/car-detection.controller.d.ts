import { CarDetectionService } from '../services/car-detection.service';
import { DetectByUrlDto } from '../dto/detect-by-url.dto';
import { DetectionResponseDto } from '../dto/detection-response.dto';
export declare class CarDetectionController {
    private readonly carDetectionService;
    constructor(carDetectionService: CarDetectionService);
    detectFromUpload(file: Express.Multer.File): Promise<DetectionResponseDto>;
    detectFromUrl(detectByUrlDto: DetectByUrlDto): Promise<DetectionResponseDto>;
    getHealth(): {
        status: string;
        message: string;
    };
}
