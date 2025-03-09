import { useState } from 'react';
import { supabase } from '../../config/supabaseClient'; 
import Cookies from 'js-cookie'; 
import { useNavigate } from "react-router-dom";


function Signin() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');

        try {
            const { data: authUser, error: authError } = await supabase.auth.signInWithPassword({ email, password });
            if (authError) {
                console.error('Authentication failed:', authError.message);
                return;
            }

            if (!authUser) {
                console.error('No user data returned');
                return;
            }

            const { data: existingUser, error: userError } = await supabase
                .from('users')
                .select('*')
                .eq('id', authUser.user.id)
                .single();

            if (userError && userError.code !== 'PGRST116') throw userError;

            console.log(existingUser);
            
            if (!existingUser){
                const { data: newUser, error: insertError } = await supabase
                    .from('users')
                    .insert([
                        {
                            uid: authUser.user.id,
                            name: authUser.user.user_metadata.display_name,
                        },
                    ])
                    .select();

                if (insertError) throw insertError;

                console.log('User data inserted:', newUser);
            }

            Cookies.set('uid', authUser.user.id, { expires: 7 }); 
            navigate('/');

        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-1 justify-center items-center min-h-lvh w-full flex-col bg-[#ebebeb]">
            <div className="flex flex-col border shadow-xl border-[#c5c5c5] rounded-md w-96 h-auto py-5 items-center">
                <h2 className="flex text-4xl font-bold mb-8">Signin</h2>

                <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
                    <div className="mb-4 w-10/12">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full px-3 py-2 border border-gray-300 bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="mb-4 w-10/12">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {error && (
                        <div className="mb-4 w-10/12">
                            <p className="text-red-500 text-sm text-center">{error}</p>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="flex justify-center w-20 bg-green-600 text-white px-4 py-2 rounded-md disabled:bg-green-400"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <span className="animate-pulse">Loading...</span>
                        ) : (
                            'Signin'
                        )}
                    </button>

                    <div className="mt-4 w-10/12 text-center">
                        <p className="text-gray-600 text-sm">
                            Don't have an account?{' '}
                            <a href="/signup" className="text-blue-500 hover:underline">
                                Signup
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signin;