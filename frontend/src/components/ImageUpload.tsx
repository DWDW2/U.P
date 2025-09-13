import { useCallback, useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { Button } from './ui/button';

interface ImageUploadProps {
    onImageSelect: (file: File) => void;
    selectedImage: File | null;
    onClearImage: () => void;
    isLoading: boolean;
}

export function ImageUpload({ onImageSelect, selectedImage, onClearImage, isLoading }: ImageUploadProps) {
    const [isDragOver, setIsDragOver] = useState(false);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);

        const files = Array.from(e.dataTransfer.files);
        const imageFile = files.find(file => file.type.startsWith('image/'));

        if (imageFile) {
            onImageSelect(imageFile);
        }
    }, [onImageSelect]);

    const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onImageSelect(file);
        }
    }, [onImageSelect]);

    const handleClearImage = useCallback(() => {
        onClearImage();
    }, [onClearImage]);

    return (
        <div className="w-full">
            {!selectedImage ? (
                <div
                    className={`
            relative border-2 border-dashed rounded-lg p-8 text-center transition-colors
            ${isDragOver
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-300 hover:border-gray-400'
                        }
            ${isLoading ? 'opacity-50 pointer-events-none' : 'cursor-pointer'}
          `}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => !isLoading && document.getElementById('file-input')?.click()}
                >
                    <input
                        id="file-input"
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                        disabled={isLoading}
                    />

                    <div className="flex flex-col items-center space-y-4">
                        <div className="p-4 bg-gray-100 rounded-full">
                            <Upload className="w-8 h-8 text-gray-500" />
                        </div>

                        <div>
                            <p className="text-lg font-medium text-gray-900">
                                Upload a car image
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                                Drag and drop an image here, or click to select
                            </p>
                            <p className="text-xs text-gray-400 mt-2">
                                Supports JPEG, PNG, and WebP formats
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="relative">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                            <ImageIcon className="w-5 h-5 text-gray-500" />
                            <div>
                                <p className="text-sm font-medium text-gray-900">{selectedImage.name}</p>
                                <p className="text-xs text-gray-500">
                                    {(selectedImage.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                            </div>
                        </div>

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleClearImage}
                            disabled={isLoading}
                            className="text-gray-500 hover:text-red-500"
                        >
                            <X className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
