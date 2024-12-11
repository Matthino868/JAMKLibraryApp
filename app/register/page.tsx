'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logo from '../../public/images/logo1x.png';

export default function RegisterPage() {
    const router = useRouter();
    const [data, setData] = useState({ name: '', email: '', password: '' });

    const [errorMessage, setErrorMessage] = useState("");
    const [showBubble, setShowBubble] = useState(false);

    const registerUser = async (event) => {
        event.preventDefault();
        const response = await fetch('/api/register',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data }),
            });
        const userInfo = await response.json();
        if (response.ok) {
            console.log(userInfo);
            router.push('/login');
        }
        else {
            console.log(userInfo.error);
            // setErrorPopUp(true);
            setErrorMessage(userInfo.error);
            setShowBubble(true);
            // setTimeout(() => setErrorMessage(null), 3000);
            setTimeout(() => setShowBubble(false), 3000);
        }
    }
    return (

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
            <div className="flex flex-col justify-start px-6  lg:px-8 bg-white rounded-xl py-10 z-10">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm  p-6 rounded-md">
                    <Image placeholder='blur' src={logo} alt="Your Company" className="mx-auto h-100 w-auto bg-[#0d004c] p-2 rounded-md" width={764}
                        height={462} />
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Sign up for an account
                    </h2>
                </div>

                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <form action="#" onSubmit={registerUser} method="POST" className="space-y-6">
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                                    Name
                                </label>

                            </div>
                            <div className="mt-2">
                                <input
                                    id="name"
                                    name="name"
                                    type="name"
                                    required
                                    autoComplete="current-name"
                                    value={data.name}
                                    onChange={(e) => setData({ ...data, name: e.target.value })}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>
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
                                Sign up
                            </button>
                        </div>
                    </form>
                    {errorMessage && (
                        <div
                            className={` mt-4 p-4 bg-red-300 text-red-00 rounded-md text-center transform shadow-lg z-50 transition-opacity duration-300 ${showBubble ? 'opacity-100' : 'opacity-0'
                                }`}
                        >
                            <strong>Error:</strong> {errorMessage}
                        </div>
                    )}


                </div>
            </div>
        </div>
    );
}
