'use client'
import { useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { auth } from '../firebase/config';
import { useRouter } from 'next/navigation';
import Link from "next/link";

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
    const router = useRouter()

    const handleSignIn = async () => {
        try {
            const res = await signInWithEmailAndPassword(email, password);
            console.log({ res });
            sessionStorage.setItem('user', true)
            setEmail('');
            setPassword('');
            router.push('/')
        } catch (e) {
            console.error(e)
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-yellow-50">
            <div className='w-96 mb-8'>
                <Link href="/src/app">
                    <h1 className='text-center text-2xl font-semibold text-gray-700'>
                        Stock Inventory
                    </h1>
                </Link>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-8 w-96">
                <h1 className="text-center text-2xl font-semibold text-gray-700 mb-4">
                    Login
                </h1>
                <h1 className="text-black font-bold mb-2">Email:</h1>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 mb-4 bg-white rounded-lg outline-none focus:ring-2 focus:ring-teal-800 text-white placeholder-gray-500"
                />
                <h1 className="text-black font-bold mb-2">Password:</h1>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 mb-4 bg-white rounded-lg outline-none focus:ring-2 focus:ring-teal-800 text-white placeholder-gray-500"
                />
                <button
                    onClick={handleSignIn}
                    className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500"
                >
                    Sign In
                </button>



                <div className="my-3 flex items-center justify-center">
                    <p className="text-sm text-black">
                        Dont have an account?
                    </p>
                    <Link href="/sign-up"><h1 className="text-sm  text-blue-600 underline font-semibold">Sign Up</h1></Link>
                </div>
            </div>


        </div>
    );
};

export default SignIn;