import { useState, useCallback } from 'react';
import { Button } from './ui/button';
import { ImageUpload } from './ImageUpload';
import { ImageDisplay } from './ImageDisplay';
import { apiService } from '../services/api';
import type { DetectionResponse, ApiError } from '../types/api';
import { Droplets, AlertCircle, CheckCircle, Upload, Link, Loader2, Sparkles } from 'lucide-react';

export function DirtyCleanSection() {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string>('');
    const [detectionResult, setDetectionResult] = useState<DetectionResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleImageSelect = useCallback((file: File) => {
        setSelectedImage(file);
        setImageUrl(URL.createObjectURL(file));
        setDetectionResult(null);
        setError(null);
    }, []);

    const handleClearImage = useCallback(() => {
        setSelectedImage(null);
        setImageUrl('');
        setDetectionResult(null);
        setError(null);
        if (imageUrl) {
            URL.revokeObjectURL(imageUrl);
        }
    }, [imageUrl]);

    const handleDetect = useCallback(async () => {
        if (!selectedImage) return;

        setIsLoading(true);
        setError(null);

        try {
            const result = await apiService.uploadImageForDirtyClean(selectedImage);
            setDetectionResult(result);
        } catch (err: any) {
            const apiError = err as ApiError;
            setError(apiError.message || 'Failed to process image');
        } finally {
            setIsLoading(false);
        }
    }, [selectedImage]);

    const handleUrlDetection = useCallback(async () => {
        const url = prompt('Enter image URL:');
        if (!url) return;

        setIsLoading(true);
        setError(null);
        setSelectedImage(null);
        setImageUrl(url);
        setDetectionResult(null);

        try {
            const result = await apiService.detectFromUrlForDirtyClean(url);
            setDetectionResult(result);
        } catch (err: any) {
            const apiError = err as ApiError;
            setError(apiError.message || 'Failed to process image URL');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const getPredictionResult = () => {
        if (!detectionResult || !detectionResult.predictions.length) return null;

        const prediction = detectionResult.predictions[0];
        const isDirty = prediction.class === 'dirty';
        const confidence = Math.round(prediction.confidence * 100);

        return {
            isDirty,
            confidence,
            label: prediction.class,
            rawScore: prediction.confidence
        };
    };

    const predictionResult = getPredictionResult();

    return (
        <div className="p-8">
            <div className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-green-100 rounded-lg">
                        <Droplets className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Dirty/Clean Detection</h2>
                        <p className="text-gray-600">Check if your car is dirty or clean using AI analysis</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="bg-gray-50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Image</h3>

                        <ImageUpload
                            onImageSelect={handleImageSelect}
                            selectedImage={selectedImage}
                            onClearImage={handleClearImage}
                            isLoading={isLoading}
                        />

                        <div className="mt-6 space-y-3">
                            <Button
                                onClick={handleDetect}
                                disabled={!selectedImage || isLoading}
                                className="w-full bg-green-600 hover:bg-green-700"
                                size="lg"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Analyzing...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="w-4 h-4 mr-2" />
                                        Check if Dirty/Clean
                                    </>
                                )}
                            </Button>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-gray-50 text-gray-500">or</span>
                                </div>
                            </div>

                            <Button
                                onClick={handleUrlDetection}
                                disabled={isLoading}
                                variant="outline"
                                className="w-full"
                                size="lg"
                            >
                                <Link className="w-4 h-4 mr-2" />
                                Check from URL
                            </Button>
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <div className="flex items-center space-x-2">
                                <AlertCircle className="w-5 h-5 text-red-500" />
                                <p className="text-red-700">{error}</p>
                            </div>
                        </div>
                    )}

                    {detectionResult && !error && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <div className="flex items-center space-x-2">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <p className="text-green-700">
                                    Analysis complete! Car is {predictionResult?.label} with {predictionResult?.confidence}% confidence
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="space-y-6">
                    <div className="bg-gray-50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Analysis Results</h3>

                        {imageUrl ? (
                            <ImageDisplay
                                imageUrl={imageUrl}
                                predictions={detectionResult?.predictions || []}
                                imageDimensions={detectionResult?.image || { width: 0, height: 0 }}
                                isLoading={isLoading}
                            />
                        ) : (
                            <div className="flex items-center justify-center h-96 bg-white rounded-lg border-2 border-dashed border-gray-300">
                                <div className="text-center text-gray-500">
                                    <Upload className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                    <p className="text-lg font-medium">Upload an image to check if it's dirty or clean</p>
                                    <p className="text-sm">Supports JPEG, PNG, and WebP formats</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {predictionResult && (
                        <div className="bg-gray-50 rounded-lg p-6">
                            <h4 className="text-lg font-semibold text-gray-900 mb-4">Prediction Result</h4>
                            <div className="text-center">
                                <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-4 ${predictionResult.isDirty
                                    ? 'bg-red-100 text-red-600'
                                    : 'bg-green-100 text-green-600'
                                    }`}>
                                    {predictionResult.isDirty ? (
                                        <Droplets className="w-12 h-12" />
                                    ) : (
                                        <Sparkles className="w-12 h-12" />
                                    )}
                                </div>
                                <h5 className={`text-2xl font-bold mb-2 ${predictionResult.isDirty ? 'text-red-600' : 'text-green-600'
                                    }`}>
                                    {predictionResult.label.charAt(0).toUpperCase() + predictionResult.label.slice(1)}
                                </h5>
                                <p className="text-gray-600 mb-4">
                                    Confidence: {predictionResult.confidence}%
                                </p>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className={`h-2 rounded-full ${predictionResult.isDirty ? 'bg-red-500' : 'bg-green-500'
                                            }`}
                                        style={{ width: `${predictionResult.confidence}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    )}

                    {detectionResult && (
                        <div className="bg-gray-50 rounded-lg p-6">
                            <h4 className="text-lg font-semibold text-gray-900 mb-4">Processing Info</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center p-4 bg-blue-50 rounded-lg">
                                    <p className="text-2xl font-bold text-blue-600">
                                        {detectionResult.time}ms
                                    </p>
                                    <p className="text-sm text-blue-700">Processing Time</p>
                                </div>
                                <div className="text-center p-4 bg-purple-50 rounded-lg">
                                    <p className="text-2xl font-bold text-purple-600">
                                        AI
                                    </p>
                                    <p className="text-sm text-purple-700">Model Used</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
