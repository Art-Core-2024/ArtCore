/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { hostname: 'lh3.googleusercontent.com' }, // Google profile pictures
            { hostname: 'platform-lookaside.fbsbx.com' }, // Facebook profile pictures
            { hostname: 'pbs.twimg.com' }, // Twitter profile pictures
            { hostname: 'abs.twimg.com' } // Twitter assets (e.g., icons)
        ],
    },
};

export default nextConfig;