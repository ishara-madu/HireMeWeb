import { useState, useEffect } from "react";
import { supabase } from '../../config/supabaseClient';
import { CiLocationArrow1, CiLocationOn } from "react-icons/ci";
import { getCoordinatesFromLocation, getSuggestions } from "../../util/getLocation";


function Signup() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [suggessions, setSuggessions] = useState([]);
    const [errorMassage, seterrorMassage] = useState('')
    const [showEditLocationPopup, setShowEditLocationPopup] = useState(false);
    const [LocationName, setLocationName] = useState("")
    const [Latitude, setLatitude] = useState("")
    const [Longitude, setLongitude] = useState("")
    const [input, setInput] = useState("")


    useEffect(() => {
        const fetchLocation = async () => {
            const values = await getSuggestions(input);
            setSuggessions(values.map(value => value.formatted));
        };
        fetchLocation();
    }, [input]);

    const handleSubmitLocation = (e) => {
        if (e.key === 'Enter' || e.type === 'click') {
            const fetchLocation = async () => {
                const values = await getCoordinatesFromLocation(input);
                if (values?.error) {
                    seterrorMassage('Please enter a valid location')
                } else {
                    setLocationName(values?.location)
                    setLatitude(values?.coordinates?.lat)
                    setLongitude(values?.coordinates?.lng)
                }
            }
            fetchLocation();
        };
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const formData = new FormData(e.target);
        const username = formData.get('username');
        const email = formData.get('email');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setIsLoading(false);
            return;
        }

        try {
            const { data: authUser, error: authError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        display_name: username,
                        locationName: LocationName,
                        latitude: Latitude,
                        longitude: Longitude,
                    }
                },
            });

            if (authError) throw authError;

            console.log('Signed up:', authUser);
            alert('Check your email for the confirmation link!');
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-1 justify-center items-center min-h-lvh w-full flex-col bg-[#ebebeb]">
            <div className="flex flex-col border shadow-xl border-[#c5c5c5] rounded-md w-96 h-auto py-5 items-center">
                <h2 className="flex text-4xl font-bold mb-8">Signup</h2>

                <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
                    <div className="mb-4 w-10/12">
                        <label htmlFor="username" className="block text-gray-700 text-sm font-medium mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="w-full px-3 py-2 border border-gray-300 bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

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
                        <label htmlFor="location" className="block text-gray-700 text-sm font-medium mb-2">
                            Location
                        </label>
                        <div className="flex w-full items-center justify-center relative">

                            <div className="absolute left-3">
                                <CiLocationOn size={20} color="#aeadad" />
                            </div>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                onKeyDown={(e) => { handleSubmitLocation(e); setShowEditLocationPopup(false) }} onChange={(e) => { setInput(e.target.value); setShowEditLocationPopup(true) }} placeholder="Enter your location" value={input}
                                className="w-full py-2 pl-10 pr-5 text-sm border border-gray-300 rounded-md focus:outline-none bg-transparent focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        {
                            errorMassage &&
                            <div className="flex w-full justify-start items-center h-auto text-xs text-red-500">*{errorMassage}</div>
                        }
                        <div className="flex-1 px-2 overflow-y-auto w-full flex-col items-center">
                            {
                                showEditLocationPopup &&
                                suggessions.map((val, id) => (
                                    <div key={id} onClick={(e) => { setInput(`${val}`); handleSubmitLocation(e); setShowEditLocationPopup(false) }} className="flex items-center gap-x-3 h-12 w-full border-b border-[#c5c5c5]">
                                        <div className="flex">
                                            <CiLocationArrow1 size={20} color="#aeadad" />
                                        </div>
                                        <div className="flex text-sm opacity-60 cursor-pointer">
                                            {val != undefined ? `${val}` : "default"}
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
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

                    <div className="mb-4 w-10/12">
                        <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-medium mb-2">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none bg-transparent focus:ring-2 focus:ring-blue-500"
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
                            'Signup'
                        )}
                    </button>

                    <div className="mt-4 w-10/12 text-center">
                        <p className="text-gray-600 text-sm">
                            Already have an account?{' '}
                            <a href="/signin" className="text-blue-500 hover:underline">
                                Login
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;