import Image from 'next/image'
import React from 'react'

const SocialLogins = () => {
    return (
        <div className='bg-[#0000008f] backdrop-blur-md border-2 border-green-500 h-[72%] w-56 mt-24 rounded-md p-5 px-4 flex flex-col items-center justify-between z-10 shadow-md drop-shadow-2xl shadow-green-400'>
            <div className='text-white flex items-center justify-center flex-col font-jim w-full'>
                <p className='text-lg'>Login with</p>
                <p className='text-3xl'>Social Media</p>
                <hr className='w-full bg-green-500 h-[1px] border-none my-2' />
            </div>
            <div className='w-full text-white font-bold tracking-wide gap-5 flex flex-col items-center justify-center'>
                <button className='w-full bg-black rounded-full border-2 border-green-500 py-2 transition duration-200 ease-in-out hover:scale-110 hover:bg-green-900 flex items-center justify-center gap-3'>
                    <Image
                        src='/Google.png'
                        alt='Google icon'
                        width={18}
                        height={18}
                    />
                    Google
                </button>
                <button className='w-full bg-black rounded-full border-2 border-green-500 py-2 transition duration-200 ease-in-out hover:scale-110 hover:bg-green-900 flex items-center justify-center gap-3'>
                    <Image
                        src='/Facebook.png'
                        alt='Facebook icon'
                        width={18}
                        height={18}
                    />
                    Facebook
                </button>
                <button className='w-full bg-black rounded-full border-2 border-green-500 py-2 transition duration-200 ease-in-out hover:scale-110 hover:bg-green-900 flex items-center justify-center gap-3'>
                    <Image
                        src='/Twitter.png'
                        alt='Twitter icon'
                        width={25}
                        height={25}
                    />
                    Twitter
                </button>
                <button className='w-full bg-black rounded-full border-2 border-green-500 py-2 transition duration-200 ease-in-out hover:scale-110 hover:bg-green-900 flex items-center justify-center gap-3'>
                    <Image
                        src='/GitHub.png'
                        alt='GitHub icon'
                        width={18}
                        height={18}
                    />
                    GitHub
                </button>
            </div>
        </div>
    )
}

export default SocialLogins