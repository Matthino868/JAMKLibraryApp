import { FiLogOut, } from 'react-icons/fi';
import { MdDarkMode, } from 'react-icons/md';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import { Session } from 'next-auth';


const Sidemenu = ({ children, session, setIsMenuOpen }: { children: React.ReactNode, session: Session, setIsMenuOpen: (value: boolean) => void }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setIsMenuOpen(false)}>
            <div className="bg-[#0D004C] w-2/3 sm:w-1/3 h-full p-4 fixed right-0" onClick={(e) => e.stopPropagation()}>
                <button
                    onClick={() => setIsMenuOpen(false)}
                    className="text-white absolute top-2 right-2 text-2xl"
                >
                    &times;
                </button>

                {/* User Info */}
                <div className="flex flex-col items-center justify-between h-full">
                    <div className="flex flex-col items-center">
                        <Image
                            src={`https://placehold.co/320x320/lightgrey/black?text=${encodeURIComponent(session.user.name)}`}
                            alt="Profile"
                            className="w-40 h-40 rounded-full"
                            width={96}
                            height={96}
                        />
                        <h1 className="text-white text-2xl mt-4">{session.user.name}</h1>
                        <h2 className="text-gray-400 mb-4">{session.user.email}</h2>
                    </div>

                    {/* Menu Links */}
                    <div className="flex flex-col w-full gap-5">
                        <hr className="border-t border-white w-full" />
                        {children}
                        <hr className="border-t border-white w-full" />
                    </div>

                    {/* Bottom Actions */}
                    <div className="flex justify-between items-center w-full mt-auto">
                        <button className="text-white hover:text-gray-300">
                            <MdDarkMode size={32} />
                        </button>
                        <button
                            onClick={async () => {
                                const res = await signOut();
                                console.log(res);
                            }}
                            className="bg-pink-500 text-white p-2 rounded-md hover:bg-white hover:text-pink-800 flex items-center justify-center transition"
                        >
                            <FiLogOut size={24} />
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Sidemenu;