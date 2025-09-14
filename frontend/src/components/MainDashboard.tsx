import { useState } from 'react';
import { ArrowRight, CheckCircle, Zap, Shield } from 'lucide-react';
import Navbar from './Navbar';
import HeroImage from '../assets/Hero.svg';
import { Dashboard } from './Dashboard';

export function MainDashboard() {
    const [showDashboard, setShowDashboard] = useState(false);

    if (showDashboard) {
        return <Dashboard />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <Navbar />

            {/* Hero Section */}
            <div className="relative py-16 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-black mb-8">
                        Change the U/eXperience
                    </h1>
                    <div className="relative">
                        <img
                            src={HeroImage}
                            alt="Car Analysis Application Interface"
                            className="mx-5"
                        />
                    </div>
                </div>
            </div>

            {/* About Section */}
            <div className="py-20 px-4 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            About Our <span className="text-lime-500">AI-Powered</span> Car Analysis
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Revolutionize your car maintenance with our cutting-edge AI technology that detects scratches, dents, and cleanliness levels with unprecedented accuracy.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-lime-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Zap className="w-8 h-8 text-lime-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Lightning Fast</h3>
                            <p className="text-gray-600">Get instant analysis results in seconds, not minutes. Our optimized AI processes images at lightning speed.</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-lime-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="w-8 h-8 text-lime-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Highly Accurate</h3>
                            <p className="text-gray-600">Advanced machine learning models trained on thousands of car images for precise detection and analysis.</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-lime-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Shield className="w-8 h-8 text-lime-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Secure & Private</h3>
                            <p className="text-gray-600">Your images are processed securely and never stored. Complete privacy protection for your data.</p>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="bg-lime-50 rounded-2xl p-12 text-center">
                        <h3 className="text-3xl font-bold text-gray-900 mb-4">
                            Ready to Transform Your Car Care?
                        </h3>
                        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                            Join thousands of car owners who trust our AI-powered analysis for accurate, instant car condition assessment.
                        </p>
                        <button
                            onClick={() => setShowDashboard(true)}
                            className="inline-flex items-center px-8 py-4 bg-lime-500 hover:bg-lime-600 text-white font-semibold rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl"
                        >
                            Start Analyzing Now
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
