import { useState, useCallback } from 'react';
import { Button } from './ui/button';
import { ImageUpload } from './ImageUpload';
import { ImageDisplay } from './ImageDisplay';
import { apiService } from '../services/api';
import type { DetectionResponse, ApiError } from '../types/api';
import { Wrench, AlertCircle, CheckCircle, Upload, Link, Loader2 } from 'lucide-react';

export function ScratchDentSection() {
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
            const result = await apiService.uploadImageForScratchDent(selectedImage);
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
            const result = await apiService.detectFromUrlForScratchDent(url);
            setDetectionResult(result);
        } catch (err: any) {
            const apiError = err as ApiError;
            setError(apiError.message || 'Failed to process image URL');
        } finally {
            setIsLoading(false);
        }
    }, []);

    return (
        <div className="p-8">
            <div className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                        <Wrench className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Scratch & Dent Detection</h2>
                        <p className="text-gray-600">Upload a car image to detect scratches, dents, and surface damage</p>
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
                                className="w-full bg-blue-600 hover:bg-blue-700"
                                size="lg"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <Wrench className="w-4 h-4 mr-2" />
                                        Detect Scratches & Dents
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
                                Detect from URL
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
                                    Analysis complete! Found {detectionResult.predictions.length} damage detection(s) in {detectionResult.time}ms
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="space-y-6">
                    <div className="bg-gray-50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Detection Results</h3>

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
                                    <p className="text-lg font-medium">Upload an image to see detection results</p>
                                    <p className="text-sm">Supports JPEG, PNG, and WebP formats</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {detectionResult && (
                        <div className="bg-gray-50 rounded-lg p-6">
                            <h4 className="text-lg font-semibold text-gray-900 mb-4">Analysis Summary</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center p-4 bg-blue-50 rounded-lg">
                                    <p className="text-2xl font-bold text-blue-600">
                                        {detectionResult.predictions.length}
                                    </p>
                                    <p className="text-sm text-blue-700">Damage Detections</p>
                                </div>
                                <div className="text-center p-4 bg-green-50 rounded-lg">
                                    <p className="text-2xl font-bold text-green-600">
                                        {detectionResult.time}ms
                                    </p>
                                    <p className="text-sm text-green-700">Processing Time</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
