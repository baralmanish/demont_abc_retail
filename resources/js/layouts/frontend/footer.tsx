import { Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';

import { ISocialLinks } from '@/types/socialLinks';

interface AppFooterProps {
    socialLink: ISocialLinks;
}

export default function AppFooter({ socialLink }: AppFooterProps) {
    return (
        <div className="bg-[#f6f6f6] py-4">
            <div className="container">
                <div className="flex justify-between max-sm:flex-col max-sm:items-center max-sm:gap-3">
                    <div>
                        Copyright © 2025 by <span className="text-green-600">ABC</span> Retail
                    </div>
                    <div className="flex gap-2.5">
                        {socialLink.facebook && (
                            <a href={socialLink.facebook} className="text-black opacity-50 hover:opacity-70" title="Facebook">
                                <Facebook />
                            </a>
                        )}
                        {socialLink.instagram && (
                            <a href={socialLink.instagram} className="text-black opacity-50 hover:opacity-70" title="Facebook">
                                <Instagram />
                            </a>
                        )}
                        {socialLink.twitter && (
                            <a href={socialLink.twitter} className="text-black opacity-50 hover:opacity-70" title="Facebook">
                                <Twitter />
                            </a>
                        )}
                        {socialLink.youtube && (
                            <a href={socialLink.youtube} className="text-black opacity-50 hover:opacity-70" title="Facebook">
                                <Youtube />
                            </a>
                        )}
                        {socialLink.linkedin && (
                            <a href={socialLink.linkedin} className="text-black opacity-50 hover:opacity-70" title="Facebook">
                                <Linkedin />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
