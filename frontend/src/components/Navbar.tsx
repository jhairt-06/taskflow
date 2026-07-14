import {Outlet} from "react-router";
import Logo from "./Logo.tsx"
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";


export default function Navbar() {
    return (
        <div>

            <nav className='h-16 py-4 px-8 bg-white flex gap-8 items-center justify-between border-b border-gray-300'>
                <div className='flex items-center gap-2'>
                    <Logo width={26} height={26}/>
                    <p className='font-header font-bold text-2xl'>
                        Task<span className='bg-linear-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent'>Flow</span>
                    </p>
                </div>
                <div className="hidden md:block md:relative w-full max-w-sm">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <HiOutlineMagnifyingGlass />
                    </div>
                    <input
                        type="text"
                        placeholder="Search here..."
                        className="w-full text-sm pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                <div>
                    <div
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-r from-blue-500 to-indigo-600 text-white font-semibold">
                        <span>JP</span>
                    </div>

                </div>
            </nav>
            <Outlet/>
        </div>

    )
}
