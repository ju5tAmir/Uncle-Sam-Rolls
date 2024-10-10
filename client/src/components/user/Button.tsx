// @ts-ignore
import {Toaster} from "react-hot-toast";

// @ts-ignore
const Button = ({onClick}) => {
    return (
        <>
            <button
                onClick={onClick}
                    className="flex items-center justify-center bg-blue-500 text-white font-semibold py-2 px-4 rounded shadow-md hover:bg-blue-600 transition duration-200 ease-in-out"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 mr-2"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 3h18M3 3l2 18h12l2-18H3z"
                    />
                </svg>
                Add to Cart
            </button>

        </>

    );
};

export default Button;
