import React from 'react';
import { Instagram, Link as LinkIcon, Mail, Phone } from 'react-feather';

// Reusable IconLink component for social links
const IconLink = ({ href, icon: Icon, label, ariaLabel }) => (
    <a
        href={href}
        className="flex items-center justify-between w-full text-white border-neutral-400 border-2 rounded-full px-4 py-2 cursor-pointer transition duration-200 ease-in-out hover:bg-neutral-800"
        aria-label={ariaLabel || label}
        target="_blank"
        rel="noopener noreferrer"
    >
        <Icon className="text-white" />
        <span className="ml-3">{label}</span>
    </a>
);

const ContactSocials = () => {
    return (
        <div className="w-1/3 h-full flex items-start justify-center">
            <div className="h-[65%] w-full border-2 border-green-500 rounded-md flex flex-col items-center justify-between">
                <header className="w-full px-4 py-4 text-center">
                    <p className="font-jim text-white text-2xl font-bold tracking-wider">
                        Let&apos;s connect
                    </p>
                    <hr className="w-full border-none h-[2px] bg-white mt-2" />
                </header>

                <div className="w-full flex flex-col items-center gap-5 px-4 pb-5">
                    <IconLink
                        href="https://www.instagram.com/art_core"
                        icon={Instagram}
                        label="art_core"
                        ariaLabel="Visit Instagram profile art_core"
                    />
                    <IconLink
                        href="tel:+916295029851"
                        icon={Phone}
                        label="+91 62950 29851"
                        ariaLabel="Call +91 62950 29851"
                    />
                    <IconLink
                        href="mailto:artcore2k24@gmail.com"
                        icon={Mail}
                        label="artcore2k24@gmail.com"
                        ariaLabel="Email artcore2k24@gmail.com"
                    />
                </div>
            </div>
        </div>
    );
};

export default ContactSocials;