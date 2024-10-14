'use client'
import { useEffect, useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useRouter } from 'next/navigation';
import { UserAuth } from '../context/AuthContext';
import Link from "next/link";
import Image from 'next/image';

const SignIn = () => {
    const { user, googleSignIn, logOut } = UserAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
    const [currentUser, setUser] = useState(null);
    const router = useRouter();

    const handleLogin = async () => {
        try {
            await googleSignIn();
            router.push('/root');
        } catch (error) {
            console.log(error);
        }
    };

    const handleSignOut = async () => {
        try {
            await logOut();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, [user]);

    const handleSignIn = async () => {
        try {
            const res = await signInWithEmailAndPassword(email, password);
            console.log({ res });
            // Set user information to session storage or state if needed
            sessionStorage.setItem('user', JSON.stringify({ email: res.user.email, displayName: res.user.displayName || 'User' }));
            setEmail('');
            setPassword('');
            router.push('/root');
        } catch (e) {
            console.error(e);
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
                    Login
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
                    onClick={handleSignIn}
                    className="w-full p-3 bg-orange-400 rounded text-white hover:bg-orange-800"
                >
                    Sign In
                </button>

                <div className="flex items-center justify-center mb-6 mt-5">
                    <span className="border-b  flex-1"></span>
                    <span className="px-3 text-black">or continue with:</span>
                    <span className="border-b flex-1"></span>
                </div>

                <div className="flex justify-center mb-4">
                    <button className="w-1/3  bg-white hover:bg-gray-100 border-2 border-black rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 flex items-center justify-center ">
                        <Image
                            onClick={handleLogin}
                            src="/google.png"
                            alt="Google"
                            width={20}  // Set the width
                            height={20} // Set the height
                        />
                    </button>
                </div>
            </div>

            <div className="my-3 flex items-center justify-center">
                <p className="text-lg text-black">
                    Dont have an account?
                </p>
                <Link href="/sign-up">
                    <h1 className="text-sm text-yellow-100 underline font-semibold ml-2">Sign Up</h1>
                </Link>
            </div>
        </div>
    );
};

export default SignIn;