'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import '../globals.css';
import Image from 'next/image';
import logo from '../../public/images/logo1x.png';

export default function LoginPage() {
    const router = useRouter();
    const [data, setData] = useState({ email: '', password: '' });

    const [showBubble, setShowBubble] = useState(false);

    const loginUser = async (event) => {
        event.preventDefault();
        const result = await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false, // Prevent automatic redirection to the error page
        });
        if (result.ok) {
            console.log("Sign-in successful", result);
            router.push('/homepage');
        }
        else {
            console.log(result)
            setShowBubble(true);
            setTimeout(() => setShowBubble(false), 3000);
        }
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat">
                <div className="absolute inset-0 z-0 ">
                    <img
                        className='object-cover w-full h-full'
                        src='images/background/background.png'
                        srcSet='images/background/background@2x.png 1500w, images/background/background.png 1000w, images/background/background@0,5x.png 500w'
                        sizes='(min-width: 960px) 960px, 100vw'
                        alt="Responsive Background"
                    />
                </div>
                <div className="flex flex-col h-auto py-10 justify-start px-6 lg:px-8 bg-white rounded-xl z-10">
                    <div className=" sm:mx-auto sm:w-full sm:max-w-sm  p-6 rounded-md">
                        <Image placeholder='blur' src={logo} alt="Your Company" className="mx-auto h-100 w-auto bg-[#0d004c] p-2 rounded-md" width={764}
                            height={462} />
                        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                            Sign in to your account
                        </h2>
                    </div>

                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <form action="#" onSubmit={loginUser} method="POST" className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        autoComplete="email"
                                        value={data.email}
                                        onChange={(e) => setData({ ...data, email: e.target.value })}
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>


                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                        Password
                                    </label>
                                    <div className="text-sm">
                                        <a href="#" className="font-semibold text-[#0d004c] hover:text-indigo-500">
                                            Forgot password?
                                        </a>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        autoComplete="current-password"
                                        value={data.password}
                                        onChange={(e) => setData({ ...data, password: e.target.value })}
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-[#0d004c] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Sign in
                                </button>
                            </div>
                        </form>

                        {/* Error message box */}
                        {showBubble && (
                            <div className="mt-4 p-4 bg-red-300 text-red-00 rounded-md text-center transition">
                                Invalid email or password. Please try again.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>

    );
}