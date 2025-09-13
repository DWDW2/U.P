export interface DetectionResponseDto {
    predictions: Array<{
        x: number;
        y: number;
        width: number;
        height: number;
        confidence: number;
        class: string;
    }>;
    image: {
        width: number;
        height: number;
    };
    time: number;
}
