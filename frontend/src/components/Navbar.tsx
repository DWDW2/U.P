import Logo from '../assets/U.P-logo.svg';


export default function Navbar() {
    return (
        <header className="shadow-sm border my-3  rounded-4xl max-w-7xl mx-auto p-1">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-3">
                        <div>
                            <img src={Logo} alt="Car Analysis AI" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}