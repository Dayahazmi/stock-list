'use client'
import { useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { auth } from '../firebase/config';
import Link from "next/link";

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);

    const handleSignUp = async () => {
        try {
            const res = await createUserWithEmailAndPassword(email, password)
            console.log({ res })
            sessionStorage.setItem('user', true)
            setEmail('');
            setPassword('')

        } catch (e) {
            console.error(e)
        }
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-teal-900">
            <div className='w-96 mb-8'>
                <Link href="/src/app">
                    <h1 className='text-center text-2xl font-semibold text-white'>
                        Stock Inventory
                    </h1>
                </Link>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-8 w-96">
                <h1 className="text-center text-2xl font-semibold text-gray-700 mb-4">
                    Register
                </h1>
                <h1 className="text-black font-bold mb-2">Email:</h1>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 mb-4 bg-white rounded-lg border-2 border-teal-800 outline-none focus:ring-2 focus:ring-teal-800 text-black placeholder-teal-800"
                />
                <h1 className="text-black font-bold mb-2">Password:</h1>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 mb-4 bg-white rounded-lg border-2 border-teal-800 outline-none focus:ring-2 focus:ring-teal-800 text-black placeholder-teal-800"
                />
                <button
                    onClick={handleSignUp}
                    className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500"
                >
                    Sign Up
                </button>
            </div>

            <div className="my-3 flex items-center justify-center">
                <p className="text-lg text-black">
                    Already have an account?
                </p>
                <Link href="/login"><h1 className="text-sm  text-yellow-100 underline font-semibold ml-2">Login</h1></Link>
            </div>
        </div>
    );
};

export default SignUp;