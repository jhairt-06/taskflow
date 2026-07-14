import BoardCard from "../components/BoardCard.tsx";
import {useEffect, useState, useActionState} from "react";
import {Dialog} from "@headlessui/react";
import DialogForm from "../components/DialogForm.tsx";
import AddNewBoardCard from "../components/AddNewBoardCard.tsx";

interface Board {
    id: string,
    title: string,
    bgColor: string,
}

export default function Dashboard() {
    const [time, setTime] = useState('Morning')
    const [boards, setBoards] = useState<Board[]>([])
    let [isOpen, setIsOpen] = useState(false)
    console.log(boards)

    useEffect(() => {
        const hour = new Date().getHours()
        let currentTime = 'Night'
        if (hour >= 5 && hour < 12) currentTime = 'Morning'
        if (hour >= 12 && hour < 17) currentTime = 'Afternoon'
        if (hour >= 17 && hour < 21) currentTime = 'Evening'
        setTime(currentTime)

        const fetchBoards = async () => {
            const token = localStorage.getItem("taskflow_token")
            const response = await fetch('http://localhost:5000/boards', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })
            const data = await response.json()
            setBoards(data.data)
        }
        fetchBoards()
    }, [])

    console.log(time)
    console.log(boards)
    return (
        <main className='mx-4'>
            <Dialog
                transition
                className="fixed inset-0 flex w-screen items-center justify-center p-4 transition duration-100 ease-out data-closed:opacity-0"
                open={isOpen} onClose={() => setIsOpen(false)} >

            <DialogForm
            setBoards={setBoards}
            setIsOpen={setIsOpen}
            />
            </Dialog>

        <section className='my-8 flex justify-between'>
            <div>

            <h1 className='text-3xl font-semibold font-header '>
                Good {time}
            </h1>
            <div className='flex items-center gap-2 text-sm mt-2'>
                <p className='text-gray-600'>
                    <span className='font-bold text-blue-800 text-lg'>5</span> boards in motion
                </p>
                <span className='text-3xl'>
                    ·
                </span>
                <p className='text-gray-600'>
                    <span className='font-bold text-indigo-800 text-lg'>46</span> cards total
                </p>
            </div>
            </div>
            <div>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className='cursor-pointer bg-blue-500 px-6 py-2 text-white text-xl rounded-xl hover:bg-blue-800'>
                    +
                </button>
            </div>
        </section>

        <section className='grid grid-cols-1 gap-6'>
            {
                boards.map((board: Board) => (
                    <BoardCard
                        key={board.id}
                        title={board.title}
                        bgColor={board.bgColor}
                        taskQuantity={10}
                    />
                ))
            }

            <AddNewBoardCard
            setIsOpen={setIsOpen}
            />
        </section>
        </main>

    )
}