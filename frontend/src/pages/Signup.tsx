import SignupScreen from '../assets/signup screenshot.png'
import {useActionState, useEffect} from "react";
import {Link, useNavigate} from 'react-router'

interface ActionState {
    success: boolean,
    message: string | null,
    error?: unknown
}

export default function Signup(){

    const navigate = useNavigate();
    const signUpUser = async (_prevState: unknown, formData:FormData): Promise<ActionState> => {
        const email = formData.get('email') as string
        const password = formData.get('password') as string
        const name = formData.get('name') as string
        try {
            const response = await fetch('http://localhost:5000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email, password, name})
            })

            const data = await response.json()
            if (!response.ok) {
                throw new Error(data.message || 'Authentication failed');
            }
            console.log(data)

            localStorage.setItem('taskflow_token', data.token)
            return {success: true,
                message: 'User Logged in successfully!'}

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
            return {
                success: false,
                message: errorMessage,
                error: errorMessage
            }
        }
    }
    const [state, submitAction, isPending] = useActionState( signUpUser,
        {
            success: false,
            message: null,
        } )

    useEffect(() => {
        if (state.success) {
            navigate('/dashboard')
        }
    }, [state.sucess, navigate])

    return (
        <div className='m-8 h-screen flex justify-center flex-col md:grid md:grid-cols-2 md:gap-4 md:items-center'>
            <div className='hidden md:flex bg-blue-500
            h-[66%] rounded-xl text-white p-8 flex-col
            '>
                <h2 className='text-3xl font-bold'>
                    The simplest way to manage your projects
                </h2>
                <p className='mb-8 mt-2 text-sm '>
                    Enter your credentials and let's get started
                </p>
                <div className='bg-gray-700 p-4 rounded-xl flex justify-center'>
                    <img
                        alt='Picture of board in use'
                        src={SignupScreen}
                        className='rounded-sm'
                    />
                </div>
            </div>
            <div className='flex md:h-[66%] justify-center p-8 flex-col rounded-xl shadow-2xl md:shadow-lg border border-gray-200'>
                <h1 className='text-3xl font-bold'>
                    We're happy to meet you!
                </h1>
                <p className='mb-8 mt-2 text-sm text-gray-600'>
                    Enter your credentials and let's get started
                </p>
                <div>
                    <form className='flex flex-col gap-4' action={submitAction}>
                        <label htmlFor="name"
                               className='text-xl '

                        >Name</label>
                        <input
                            required
                            id='name'
                            name='name'
                            placeholder='John Doe'
                            className='p-4 rounded-full border border-gray-200'
                        />

                        <label htmlFor="email"
                               className='text-xl '

                        >Email</label>
                        <input
                            required
                            id='email'
                            type='email'
                            name='email'
                            placeholder='yourname@email.com'
                            className='p-4 rounded-full border border-gray-200'
                        />
                        <label htmlFor="password"
                               className='text-xl '

                        >Password</label>
                        <input
                            name='password'
                            id='password'
                            required
                            type='password'
                            placeholder='Min 6. characters'
                            className='p-4 rounded-full border border-gray-200 '
                        />

                        <div className='border-b border-gray-200'>
                        </div>

                        {state.message && !state.success && (
                            <div className="p-4 text-sm text-red-700 text-center ">
                                {state.message}
                            </div>
                        )}

                        <button type='submit'
                                disabled={isPending}
                                className='cursor-pointer transition all 300ms w-full p-4 bg-blue-500 text-white rounded-full hover:bg-blue-700 focus:bg-blue-700'
                        >
                            { isPending ? "Loading..." : "Sign up"}                        </button>
                    </form>

                    <p className='text-sm text-gray-600 mt-8 text-center'>
                        Have an account? <Link to='/login' className='cursor-pointer text-blue-500'>Log in instead</Link>
                    </p>
                </div>
            </div>

        </div>

    )
}