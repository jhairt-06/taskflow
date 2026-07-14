export default function AddNewBoardCard({setIsOpen}: { setIsOpen: (isOpen: boolean) => void }) {
    return (
        <button className=' cursor-pointer transition-all 200ms
        hover:-translate-y-1 rounded-xl max-w-100 border border-gray-300 border-dotted flex flex-col
        items-center justify-center p-6 hover:bg-blue-100 hover:border-blue-600 group
        '
        onClick={() => setIsOpen(true)}
        >
            <div
                className="flex leading-none h-10 w-10 items-center
                justify-center rounded-full bg-white border
                border-gray-400 text-black
                group-hover:text-blue-500
                group-hover:border-blue-500
                ">
                <span className='text-2xl text-gray-800
                group-hover:text-blue-500
                '>+</span>
            </div>
            <span className='text-center text-gray-800 text-lg font-header
            group-hover:text-blue-600
            '>
                New Board
            </span>
            <span className='text-gray-500 text-xs
            group-hover:text-blue-400
            '>
                Let's create something new
            </span>
        </button>
    )
}