import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { PaperCreateDto, PropertyToClient } from "../../../../Api.ts";
import { http } from "../../../http.ts";
import toast from "react-hot-toast";
import { RoutePath } from "../../../routes/RoutePath.ts";

const PaperCreatePage = () => {
    const [paper, setPaper] = useState<PaperCreateDto>({
        name: "",
        price: 0,
        stock: 0,
        discontinued: false
    });

    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleCreate = async () => {
        try {
            const res = await http.api.paperCreate(paper); // Adjusted API call for creating paper
            if (res.status === 200) {
                toast.success("Paper created successfully!");
                toast.success("Redirecting ...");
                const timer = () => {
                    setTimeout(() => {
                        navigate(RoutePath.papers); // Redirect after 1 second
                    }, 1000);
                };

                timer();
            } else {
                toast.error("Error creating paper.");
            }
        } catch (err) {
            toast.error("Error creating paper.");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setPaper((prev) => {
            const updatedValue = name === "discontinued" ? value === "true" : value;
            return {
                ...prev,
                [name]: updatedValue,
            };
        });
    };

    if (error) return <div>{error}</div>;

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Create New Paper</h1>
            <form>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Paper Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={paper.name}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                        Price
                    </label>
                    <input
                        type="number"
                        name="price"
                        id="price"
                        value={paper.price}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                        Stock
                    </label>
                    <input
                        type="number"
                        name="stock"
                        id="stock"
                        value={paper.stock}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="discontinued" className="block text-sm font-medium text-gray-700">
                        Discontinued
                    </label>
                    <select
                        name="discontinued"
                        id="discontinued"
                        value={paper.discontinued ? "true" : "false"}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    >
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </select>
                </div>

                <button
                    type="button"
                    onClick={handleCreate}
                    className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
                >
                    Create Paper
                </button>
            </form>
        </div>
    );
};

export default PaperCreatePage;
