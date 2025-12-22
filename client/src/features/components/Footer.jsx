import React from 'react';
import SocialIcons from './SocialIcons';

const Footer = () => {
    return (
        <footer className="bg-black py-12 border-t border-white/5 mt-auto">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    {/* Left side - Copyright and links */}
                    <div className="text-center md:text-left text-gray-500 text-sm flex-1">
                        <p className="mb-4">© 2026 ProveIT.IO  All rights reserved.</p>
                        <div className="flex justify-center md:justify-start gap-6">
                            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                            <a href="#" className="hover:text-white transition-colors">Contact</a>
                        </div>
                    </div>

                    {/* Right side - 3D Social Icons with padding */}
                    <div className="flex items-center justify-center md:justify-end md:pr-8">
                        <SocialIcons />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default React.memo(Footer);
