import { useRef, useEffect, useState } from 'react';
import type { Prediction } from '../types/api';

interface ImageDisplayProps {
    imageUrl: string;
    predictions: Prediction[];
    imageDimensions: { width: number; height: number };
    isLoading?: boolean;
}

export function ImageDisplay({ imageUrl, predictions, imageDimensions, isLoading = false }: ImageDisplayProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [displayDimensions, setDisplayDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !imageUrl) return;

        const img = new Image();
        img.onload = () => {
            const maxWidth = 800;
            const maxHeight = 600;

            let { width, height } = imageDimensions;

            if (width > maxWidth || height > maxHeight) {
                const aspectRatio = width / height;
                if (width > height) {
                    width = maxWidth;
                    height = maxWidth / aspectRatio;
                } else {
                    height = maxHeight;
                    width = maxHeight * aspectRatio;
                }
            }

            setDisplayDimensions({ width, height });
            canvas.width = width;
            canvas.height = height;

            drawImageWithPredictions();
        };

        img.src = imageUrl;
    }, [imageUrl, predictions, imageDimensions]);

    const drawImageWithPredictions = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const img = new Image();
        img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            predictions.forEach((prediction, index) => {
                const { x, y, width, height, confidence, class: className } = prediction;

                // Scale coordinates to display dimensions
                const scaleX = canvas.width / imageDimensions.width;
                const scaleY = canvas.height / imageDimensions.height;

                const scaledX = x * scaleX;
                const scaledY = y * scaleY;
                const scaledWidth = width * scaleX;
                const scaledHeight = height * scaleY;

                const alpha = Math.max(0.3, confidence);
                const color = confidence > 0.7 ? '#10b981' : confidence > 0.5 ? '#f59e0b' : '#ef4444';

                ctx.strokeStyle = color;
                ctx.lineWidth = 2;
                ctx.globalAlpha = alpha;
                ctx.strokeRect(scaledX, scaledY, scaledWidth, scaledHeight);

                const labelText = `${className} (${(confidence * 100).toFixed(1)}%)`;
                const textMetrics = ctx.measureText(labelText);
                const labelWidth = textMetrics.width + 8;
                const labelHeight = 20;

                ctx.fillStyle = color;
                ctx.globalAlpha = 0.8;
                ctx.fillRect(scaledX, scaledY - labelHeight, labelWidth, labelHeight);

                ctx.fillStyle = 'white';
                ctx.font = '12px sans-serif';
                ctx.globalAlpha = 1;
                ctx.fillText(labelText, scaledX + 4, scaledY - 6);
            });
        };

        img.src = imageUrl;
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center w-full h-96 bg-gray-100 rounded-lg">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
                    <p className="text-gray-500">Processing image...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="relative inline-block">
                <canvas
                    ref={canvasRef}
                    className="max-w-full h-auto rounded-lg shadow-lg"
                    style={{ width: displayDimensions.width, height: displayDimensions.height }}
                />

                {predictions.length > 0 && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <h3 className="text-sm font-medium text-gray-900 mb-2">
                            Detection Results ({predictions.length} found)
                        </h3>
                        <div className="space-y-2">
                            {predictions.map((prediction, index) => (
                                <div key={index} className="flex items-center justify-between text-sm">
                                    <span className="text-gray-700">{prediction.class}</span>
                                    <span className="text-gray-500">
                                        {(prediction.confidence * 100).toFixed(1)}% confidence
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
