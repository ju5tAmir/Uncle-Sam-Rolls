import React from "react";
import {useNavigate} from "react-router-dom";
import {RoutePath} from "../../routes/RoutePath.ts";

const LandingPage = () => {

    const navigate = useNavigate();

    return (
    <div className="flex flex-col min-h-screen bg-gray-100">
        <div className="flex-grow flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Our Paper Store</h1>
            <p className="text-lg text-gray-600 mb-6">
                Discover high-quality paper products for all your needs. From art paper to printing paper, we have
                it all!
            </p>
            <button
                onClick={() => {
                    navigate(RoutePath.papers)
                }}
                className="bg-blue-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-700 transition duration-200">
                Shop Now
            </button>

            <div className="mt-12">

            </div>
        </div>
    </div>
);

}

export default LandingPage;