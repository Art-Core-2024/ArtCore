/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { hostname: 'lh3.googleusercontent.com' },
            { hostname: 'platform-lookaside.fbsbx.com' },
            { hostname: 'pbs.twimg.com' },
            { hostname: 'abs.twimg.com' },
            { hostname: 'drive.google.com' } 
        ],
    },
};

export default nextConfig;