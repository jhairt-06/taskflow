import { Dialog, useClose, DialogPanel, DialogTitle, DialogBackdrop } from '@headlessui/react'
import {useState, useActionState} from 'react'

interface ActionState {
    success: boolean,
    message: string | null,
    error?: unknown
}

export default function DialogForm({setBoards, setIsOpen}: {setBoards: (data: unknown) => void; setIsOpen: (isOpen: boolean) => void}) {
    const [color, setColor] = useState('')
    let close = useClose()

    const handleSubmit = async(_prevState, formData): Promise<ActionState> => {

        const bgColor:string= formData.get('color')
        const title: string = formData.get('title')
        const token = localStorage.getItem('taskflow_token')
        try {
            const response = await fetch('http://localhost:5000/boards', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({bgColor, title}),
            })
            const data = await response.json()
            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong')
            }
            console.log(data)
            setBoards(prevBoards => [...prevBoards, data.data])
            close()
            return {success: true,
                message: 'Board created successfully!'}

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
            return {
                success: false,
                message: errorMessage,
                error: errorMessage
            }
        }

    }



    const [state, handleAction, isPending] = useActionState(handleSubmit,         {
        success: false,
        message: null,
    })

    return (
        <>

                <DialogBackdrop className="fixed inset-0 bg-black/30" />
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4 ">
                    <DialogPanel className="max-w-lg space-y-4 border bg-white p-12 rounded-xl" >
                        <DialogTitle className='text-2xl font-bold font-header flex justify-center items-center'>
                            <span>
                            Create a board
                            </span>
                        </DialogTitle>

                        <form
                            action={handleAction}
                            className="bg-white rounded-xl flex flex-col gap-4">
                            <div>
                                <label className="text-gray-600 mb-2">
                                    Title
                                </label>
                                <div className="flex items-center gap-3 mb-4">

                                    <input
                                        type="text"
                                        placeholder='e.g Website Redesign'
                                        name='title'
                                        className="px-3 w-full py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <label className="text-gray-600 mb-2">
                                   Color
                                </label>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="color"
                                        value={color}
                                        onChange={(e) => setColor(e.target.value)}
                                        className="h-10 rounded-lg cursor-pointer border border-gray-300 bg-transparent [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-lg [&::-webkit-color-swatch]:border-none"
                                    />
                                    <input
                                        type="text"
                                        name="color"
                                        placeholder='Hex, e.g. #FFFFFF'
                                        value={color}
                                        onChange={(e) => setColor(e.target.value)}
                                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm uppercase focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                            </div>
                            {
                                state.message && !state.success &&(
                                <div className="text-sm text-red-500">
                                    {state.message}
                            </div>)}
                            <div className='flex items-center gap-3'>

                            <button
                                className="cursor-pointer border
                                border-gray-300 w-full text-black py-2 rounded-lg "
                                onClick={() => setIsOpen(false)}
                            >
                                Cancel
                            </button>
                            <button type="submit" className="cursor-pointer w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-800 transition">
                                Save Selection
                            </button>
                            </div>

                        </form>
                    </DialogPanel>
                </div>
        </>
    )
}