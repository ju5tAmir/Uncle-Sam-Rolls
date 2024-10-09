import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AccessCheck = () => {
    const [token, setToken] = useState<string>(); // Default token

    useEffect(() => {
        // Load the token from local storage when the component mounts
        const storedToken = localStorage.getItem('accessToken');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    useEffect(() => {
        // Store the token in local storage whenever it changes
        if (token){
            localStorage.setItem('accessToken', token);
        }
    }, [token]);

    return (
        <>
            <div className="flex flex-col gap-5 items-center justify-center h-screen">
                {/* Current role */}
                <div className="flex text-3xl">You're viewing this website as:</div>
                <select
                    className="flex select select-bordered w-full max-w-xs"
                    value={token}
                    onChange={e => {
                        setToken(e.target.value);
                        toast.success(`Your access has been updated to ${e.target.value}`);
                    }}
                >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
            </div>
        </>
    );
}

export default AccessCheck;
