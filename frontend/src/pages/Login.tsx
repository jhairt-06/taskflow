import SignupScreen from '../assets/signup screenshot.png'
import {useActionState} from "react";

interface ActionState {
    success: boolean,
    message: string | null,
    error?: unknown
}

export default function Login(){

    const logInUser = async (_prevState: unknown, formData:FormData): Promise<ActionState> => {
        const email = formData.get('email') as string
        const password = formData.get('password') as string
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email, password})
            })



            const data = await response.json()
            if (!response.ok) {
                // Read the message we generated in our Express controller!
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
    const [state, submitAction, isPending] = useActionState( logInUser,
        {
            success: false,
            message: null,
} )



    return (
        <div className='m-8 h-screen flex justify-center flex-col md:grid md:grid-cols-2 md:gap-4 md:items-center'>
            <div className='flex h-[66%] justify-center p-8 flex-col rounded-xl shadow-2xl md:shadow-lg md:border md:border-gray-200'>
                <h1 className='text-3xl font-bold'>
                    It's great to see you again!
                </h1>
                <p className='mb-8 mt-2 text-sm text-gray-600'>
                    Enter your credentials and let's get started
                </p>
                <div>
                    <form className='flex flex-col gap-4' action={submitAction}>
                        <label htmlFor="email"
                               className='text-xl '

                        >Email</label>
                        <input
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
                            type='password'
                            placeholder='Min 6. characters'
                            className='p-4 rounded-full border border-gray-200 '
                        />
                        {/* TODO: Change this to link to another page to recover password */}
                        <span className='cursor-pointer text-sm text-blue-500 self-end'>
                            Forgot password?
                        </span>

                        {state.message && !state.success && (
                            <div className="p-4 text-sm text-red-700 text-center ">
                                {state.message}
                            </div>
                        )}

                        <button type='submit'
                                disabled={isPending}
                        className='cursor-pointer transition all 300ms w-full p-4 bg-blue-500 text-white rounded-full hover:bg-blue-700 focus:bg-blue-700'
                        >
                            { isPending ? "Loading..." : "Login"}                        </button>
                    </form>
                    {/* TODO: Change this to link to sign up page */}

                    <p className='text-sm text-gray-600 mt-4 text-center'>
                        Don't have an account? <span className='cursor-pointer text-blue-500'>Sign up instead</span>
                    </p>



                </div>
            </div>
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
        </div>

    )
}