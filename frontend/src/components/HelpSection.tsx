import { HelpCircle, Wrench, Droplets, Upload, CheckCircle, AlertCircle, Info, Camera, FileImage } from 'lucide-react';

export function HelpSection() {
    const features = [
        {
            icon: Wrench,
            title: 'Scratch & Dent Detection',
            description: 'Detect surface damage, scratches, and dents on your vehicle',
            details: [
                'Identifies various types of surface damage',
                'Highlights affected areas on the image',
                'Provides confidence scores for each detection',
                'Works with multiple image formats'
            ]
        },
        {
            icon: Droplets,
            title: 'Dirty/Clean Detection',
            description: 'Determine if your car is dirty or clean using AI analysis',
            details: [
                'Binary classification (dirty/clean)',
                'Confidence percentage for accuracy',
                'Visual indicators for easy understanding',
                'Trained on diverse car images'
            ]
        }
    ];

    const steps = [
        {
            step: 1,
            title: 'Choose Detection Type',
            description: 'Select either Scratch & Dent or Dirty/Clean detection from the main menu',
            icon: HelpCircle
        },
        {
            step: 2,
            title: 'Upload Your Image',
            description: 'Upload a clear image of your car or paste an image URL',
            icon: Upload
        },
        {
            step: 3,
            title: 'Start Analysis',
            description: 'Click the detection button to begin AI analysis',
            icon: CheckCircle
        },
        {
            step: 4,
            title: 'View Results',
            description: 'Review the detection results and confidence scores',
            icon: Info
        }
    ];

    const tips = [
        {
            icon: Camera,
            title: 'Image Quality',
            description: 'Use high-resolution images with good lighting for best results'
        },
        {
            icon: FileImage,
            title: 'Supported Formats',
            description: 'JPEG, PNG, and WebP formats are supported'
        },
        {
            icon: AlertCircle,
            title: 'Clear View',
            description: 'Ensure the car is clearly visible and not obstructed'
        }
    ];

    return (
        <div className="p-8">
            <div className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-purple-100 rounded-lg">
                        <HelpCircle className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Help & Guide</h2>
                        <p className="text-gray-600">Learn how to use the Car Analysis AI application</p>
                    </div>
                </div>
            </div>

            <div className="space-y-8">
                <section>
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Features Overview</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                                    <div className="flex items-start space-x-4">
                                        <div className="flex-shrink-0 p-3 bg-gray-100 rounded-lg">
                                            <Icon className="w-6 h-6 text-gray-600" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-lg font-semibold text-gray-900 mb-2">
                                                {feature.title}
                                            </h4>
                                            <p className="text-gray-600 mb-4">{feature.description}</p>
                                            <ul className="space-y-2">
                                                {feature.details.map((detail, detailIndex) => (
                                                    <li key={detailIndex} className="flex items-center space-x-2 text-sm text-gray-600">
                                                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                                        <span>{detail}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                <section>
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">How to Use</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {steps.map((step) => {
                            const Icon = step.icon;
                            return (
                                <div key={step.step} className="text-center">
                                    <div className="relative">
                                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Icon className="w-8 h-8 text-blue-600" />
                                        </div>
                                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                            {step.step}
                                        </div>
                                    </div>
                                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                                        {step.title}
                                    </h4>
                                    <p className="text-gray-600 text-sm">
                                        {step.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </section>

                <section>
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Tips for Best Results</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {tips.map((tip, index) => {
                            const Icon = tip.icon;
                            return (
                                <div key={index} className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                                    <div className="flex items-start space-x-4">
                                        <div className="flex-shrink-0 p-2 bg-yellow-100 rounded-lg">
                                            <Icon className="w-5 h-5 text-yellow-600" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-semibold text-yellow-900 mb-2">
                                                {tip.title}
                                            </h4>
                                            <p className="text-yellow-800 text-sm">
                                                {tip.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                <section>
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Technical Information</h3>
                    <div className="bg-gray-50 rounded-lg p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="text-lg font-semibold text-gray-900 mb-4">Scratch & Dent Detection</h4>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    <li>• Uses Roboflow API for object detection</li>
                                    <li>• Trained on automotive damage datasets</li>
                                    <li>• Detects various types of surface damage</li>
                                    <li>• Provides bounding box coordinates</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-gray-900 mb-4">Dirty/Clean Detection</h4>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    <li>• Uses custom TensorFlow model</li>
                                    <li>• Binary classification (dirty/clean)</li>
                                    <li>• Confidence scores for accuracy</li>
                                    <li>• Optimized for car images</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Troubleshooting</h3>
                    <div className="space-y-4">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <h4 className="font-semibold text-red-900 mb-2">Common Issues</h4>
                            <ul className="text-sm text-red-800 space-y-1">
                                <li>• <strong>Upload fails:</strong> Check file format (JPEG, PNG, WebP only)</li>
                                <li>• <strong>Poor detection:</strong> Try a higher quality image with better lighting</li>
                                <li>• <strong>Network errors:</strong> Check your internet connection</li>
                                <li>• <strong>Processing timeout:</strong> Try with a smaller image file</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                        <h3 className="text-lg font-semibold text-blue-900 mb-2">Need More Help?</h3>
                        <p className="text-blue-800 mb-4">
                            If you&apos;re experiencing issues or have questions, please contact our support team.
                        </p>
                        <div className="flex justify-center space-x-4">
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                Contact Support
                            </button>
                            <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                                View Documentation
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
