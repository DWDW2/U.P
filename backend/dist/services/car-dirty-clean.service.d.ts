import { DetectionResponseDto } from '../dto/detection-response.dto';
export declare class CarDirtyCleanService {
    private readonly modelPath;
    private readonly pythonScriptPath;
    constructor();
    detectFromBase64(base64Image: string): Promise<DetectionResponseDto>;
    detectFromUrl(imageUrl: string): Promise<DetectionResponseDto>;
    convertBufferToBase64(buffer: Buffer): string;
    private validatePaths;
    private executePythonScript;
    private formatDetectionResponse;
}
