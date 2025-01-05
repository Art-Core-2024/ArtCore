import Image from 'next/image';
import React from 'react';
import {
    signInWithPopup,
    linkWithCredential,
    fetchSignInMethodsForEmail,
} from 'firebase/auth';
import {
    auth,
    googleProvider,
    facebookProvider,
    githubProvider,
    twitterProvider,
} from '@/firebase/firebase';
import { addUserToDatabase } from '@/firebase/firebaseFirestore';
import { useRouter } from 'next/navigation';

const SocialLogins = () => {
    const router = useRouter();

    const handleLogin = async (provider) => {
        try {
            // Attempt sign-in with the selected provider
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Validate and determine the providerId
            const providerId = user.providerData?.[0]?.providerId || provider?.providerId;

            if (!providerId) {
                console.error('Provider ID is undefined. Ensure the provider is valid.');
                throw new Error('Provider ID is undefined. Cannot proceed with login.');
            }

            const userData = {
                username: user.displayName || 'Unknown',
                email: user.email || '',
                provider: providerId,
                role: 'user',
            };

            // Add user to database
            await addUserToDatabase(userData);
            router.push('/');
            console.log('User signed in and stored:', userData);
        } catch (error) {
            if (error.code === 'auth/account-exists-with-different-credential') {
                const email = error.customData.email;
                const pendingCredential = error.credential;

                // Fetch existing sign-in methods for this email
                const signInMethods = await fetchSignInMethodsForEmail(auth, email);

                if (!signInMethods || signInMethods.length === 0) {
                    console.error('No sign-in methods found for this email.');
                    throw new Error('No sign-in methods found.');
                }

                const existingProvider = getProviderById(signInMethods[0]);

                // Prompt the user to sign in with the existing provider
                const linkedResult = await signInWithPopup(auth, existingProvider);

                // Link the pending credential
                await linkWithCredential(linkedResult.user, pendingCredential);

                // Store user data after linking
                const userData = {
                    username: linkedResult.user.displayName || 'Unknown',
                    email: linkedResult.user.email,
                    provider: linkedResult.user.providerData[0].providerId,
                    role: 'user',
                };

                await addUserToDatabase(userData);

                console.log('Providers linked and user stored:', userData);
            } else {
                console.error('Error during login:', error);
            }
        }
    };

    const getProviderById = (id) => {
        console.log('Provider ID received:', id);
        switch (id) {
            case 'google.com':
                return googleProvider;
            case 'facebook.com':
                return facebookProvider;
            case 'github.com':
                return githubProvider;
            case 'twitter.com':
                return twitterProvider;
            default:
                console.error(`Unknown provider ID: ${id}`);
                throw new Error(`Unknown provider ID: ${id}`);
        }
    };

    return (
        <div className='bg-[#0000008f] backdrop-blur-md border-2 border-green-500 h-[72%] w-56 mt-24 rounded-md py-10 px-4 flex flex-col items-center justify-between z-10 shadow-md drop-shadow-2xl shadow-green-400'>
            <div className='text-white flex items-center justify-center flex-col font-jim w-full'>
                <p className='text-lg'>Login with</p>
                <p className='text-3xl'>Social Media</p>
                <hr className='w-full bg-green-500 h-[1px] border-none my-4' />
            </div>
            <div className='w-full text-white font-bold tracking-wide gap-7 flex flex-col items-center justify-center'>
                <button
                    onClick={() => handleLogin(googleProvider)}
                    className='w-full bg-black rounded-full border-2 border-green-500 py-2 transition duration-200 ease-in-out hover:scale-110 hover:bg-green-900 flex items-center justify-center gap-3'
                >
                    <Image src='/Google.png' alt='Google icon' width={18} height={18} />
                    Google
                </button>
                <button
                    onClick={() => handleLogin(facebookProvider)}
                    className='w-full bg-black rounded-full border-2 border-green-500 py-2 transition duration-200 ease-in-out hover:scale-110 hover:bg-green-900 flex items-center justify-center gap-3'
                >
                    <Image
                        src='/Facebook.png'
                        alt='Facebook icon'
                        width={18}
                        height={18}
                    />
                    Facebook
                </button>
                <button
                    onClick={() => handleLogin(twitterProvider)}
                    className='w-full bg-black rounded-full border-2 border-green-500 py-2 transition duration-200 ease-in-out hover:scale-110 hover:bg-green-900 flex items-center justify-center gap-3'
                >
                    <Image
                        src='/Twitter.png'
                        alt='Twitter icon'
                        width={25}
                        height={25}
                    />
                    Twitter
                </button>
            </div>
        </div>
    );
};

export default SocialLogins;