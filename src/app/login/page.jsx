import React from 'react'
import Image from 'next/image'
import Link from "next/link";

const Page = () => {
    return (
        <div className='flex flex-col justify-center items-center min-h-screen bg-yellow-50'>
            <div className='w-96 mb-4'>
                <Link href="/root">
                    <h1 className='text-center text-2xl font-semibold text-gray-700'>
                        Stock Inventory
                    </h1>
                </Link>
            </div>

            <div className='bg-white shadow-lg rounded-lg p-8 w-96'>
                <h1 className="text-center text-2xl font-semibold text-gray-700 mb-4">
                    Login
                </h1>

                <div className="mb-4">
                    <h1 className="text-black font-bold mb-2">Email</h1>
                    <input type="email"
                        id="email"
                        placeholder="Enter your email"
                        className='w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-800'>
                    </input>
                </div>

                <div className='mb-4'>
                    <button className='w-full bg-teal-400 hover:bg-teal-800  text-white font-semibold py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-900'> Continue </button>
                </div>

                <div className='flex items-center justify-center mb-6'>
                    <span className='border-b flex-1'></span>
                    <span className=' text-gray-500 flex-2'> or continue with:</span>
                    <span className='border-b flex-1'></span>
                </div>

                <div className="flex justify-center mb-4">
                    <button className="w-1/3 bg-white hover:bg-gray-100 border rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 flex items-center justify-center">
                        <Image src="/google.png" alt="Google" width={20} height={20} className="mr-2" />
                        Google
                    </button>
                </div>

                <p className="text-center text-sm text-gray-500">
                    Dont have an account?{' '}
                    <a href="#" className="text-yellow-500 hover:underline">
                        Sign up
                    </a>
                </p>

            </div>
        </div>
    )
}

export default Page
