export interface Prediction {
    x: number;
    y: number;
    width: number;
    height: number;
    confidence: number;
    class: string;
}

export interface ImageDimensions {
    width: number;
    height: number;
}

export interface DetectionResponse {
    predictions: Prediction[];
    image: ImageDimensions;
    time: number;
}

export interface ApiError {
    message: string;
    statusCode: number;
}
