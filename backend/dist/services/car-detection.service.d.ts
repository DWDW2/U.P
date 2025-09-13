import { DetectionResponseDto } from '../dto/detection-response.dto';
export declare class CarDetectionService {
    private readonly roboflowApiUrl;
    private readonly apiKey;
    constructor();
    detectFromBase64(base64Image: string): Promise<DetectionResponseDto>;
    detectFromUrl(imageUrl: string): Promise<DetectionResponseDto>;
    convertBufferToBase64(buffer: Buffer): string;
}
