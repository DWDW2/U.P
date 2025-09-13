import { useState } from 'react';
import { Car, Wrench, Droplets, HelpCircle } from 'lucide-react';
import { ScratchDentSection } from './ScratchDentSection';
import { DirtyCleanSection } from './DirtyCleanSection';
import { HelpSection } from './HelpSection';

type Section = 'scratch-dent' | 'dirty-clean' | 'help';

export function MainDashboard() {
    const [activeSection, setActiveSection] = useState<Section>('scratch-dent');

    const sections = [
        {
            id: 'scratch-dent' as Section,
            title: 'Scratch & Dent Detection',
            description: 'Detect scratches, dents, and surface damage',
            icon: Wrench,
            color: 'blue'
        },
        {
            id: 'dirty-clean' as Section,
            title: 'Dirty/Clean Detection',
            description: 'Check if your car is dirty or clean',
            icon: Droplets,
            color: 'green'
        },
        {
            id: 'help' as Section,
            title: 'Help & Guide',
            description: 'Learn how to use the application',
            icon: HelpCircle,
            color: 'purple'
        }
    ];

    const renderActiveSection = () => {
        switch (activeSection) {
            case 'scratch-dent':
                return <ScratchDentSection />;
            case 'dirty-clean':
                return <DirtyCleanSection />;
            case 'help':
                return <HelpSection />;
            default:
                return <ScratchDentSection />;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-3">
                            <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
                                <Car className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">Car Analysis AI</h1>
                                <p className="text-sm text-gray-500">Advanced vehicle damage detection</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="hidden sm:block">
                                <div className="flex items-center space-x-2 text-sm text-gray-500">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span>System Online</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <nav className="mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {sections.map((section) => {
                            const Icon = section.icon;
                            const isActive = activeSection === section.id;

                            return (
                                <button
                                    key={section.id}
                                    onClick={() => setActiveSection(section.id)}
                                    className={`group relative p-6 rounded-xl border-2 transition-all duration-200 ${isActive
                                        ? `border-${section.color}-500 bg-${section.color}-50 shadow-lg`
                                        : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                                        }`}
                                >
                                    <div className="flex items-start space-x-4">
                                        <div className={`flex-shrink-0 p-3 rounded-lg ${isActive
                                            ? `bg-${section.color}-100 text-${section.color}-600`
                                            : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
                                            }`}>
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <div className="flex-1 text-left">
                                            <h3 className={`text-lg font-semibold ${isActive ? `text-${section.color}-900` : 'text-gray-900'
                                                }`}>
                                                {section.title}
                                            </h3>
                                            <p className={`text-sm mt-1 ${isActive ? `text-${section.color}-700` : 'text-gray-500'
                                                }`}>
                                                {section.description}
                                            </p>
                                        </div>
                                    </div>
                                    {isActive && (
                                        <div className={`absolute top-2 right-2 w-3 h-3 bg-${section.color}-500 rounded-full`}></div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </nav>

                <main className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    {renderActiveSection()}
                </main>
            </div>
        </div>
    );
}
