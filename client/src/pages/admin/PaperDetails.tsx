import {useNavigate, useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import { PaperToClient, PropertyToClient } from "../../../Api.ts";
import { http } from "../../http.ts";
import toast from "react-hot-toast";
import {RoutePath} from "../../routes/RoutePath.ts";

const PaperDetails = () => {
    const { id } = useParams();
    const [paper, setPaper] = useState<PaperToClient | null>(null);
    const [properties, setProperties] = useState<PropertyToClient[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();


    const fetchPaper = async (paperId: number) => {
        try {
            const res = await http.api.paperGetPaperById(paperId);
            if (res.status === 200) {
                setPaper(res.data);
            } else {
                setError("Error fetching paper details.");
            }
        } catch (err) {
            setError("Error fetching paper details.");
        } finally {
            setLoading(false);
        }
    };

    const fetchProperties = async () => {
        try {
            const res = await http.api.propertyGetAll();
            if (res.status === 200) {
                setProperties(res.data);
            } else {
                setError("Error fetching properties.");
            }
        } catch (err) {
            setError("Error fetching properties.");
        }
    };

    useEffect(() => {
        if (id) {
            fetchPaper(Number(id));
            fetchProperties();
        }
    }, [id]);

    const handleUpdate = async () => {
        console.log (paper)
        if (!paper) return;
        try {
            const res = await http.api.paperUpdatePaper(paper.id, paper); // Adjusted API call
            if (res.status === 200) {
                toast.success("Paper updated successfully!");
                toast.success("Redirecting ...");
                const timer = () => {
                    setTimeout(() => {
                        navigate(RoutePath.papers); // Ensure 'navigate' and 'RoutePath.papers' are defined
                    }, 1000); // 1-second delay
                };

                timer();
            } else {
                toast.error("Error updating paper.");
            }
        } catch (err) {
            toast.error("Error updating paper.");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setPaper((prev) => {
            if (!prev) return prev;

            const updatedValue = name === "discontinued" ? value === "true" : value;

            return {
                ...prev,
                [name]: updatedValue,
            };
        });
    };

    const handlePropertyChange = (prop: PropertyToClient) => {
        if (paper) {
            const updatedProperties = paper.properties?.some(p => p.propertyId === prop.propertyId)
                ? paper.properties.filter(p => p.propertyId !== prop.propertyId) // Remove the property if it was checked
                : [...(paper.properties || []), prop];

            setPaper({ ...paper, properties: updatedProperties });
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!paper) return <div>Paper not found.</div>;

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Edit Paper Details</h1>
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

                <fieldset className="mb-4">
                    <legend className="block text-sm font-medium text-gray-700">Properties</legend>
                    {properties.map((p) => (
                        <div key={p.propertyId} className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                id={`property-${p.propertyId}`}
                                checked={paper?.properties?.some(prop => prop.propertyId === p.propertyId) || false}
                                onChange={() => handlePropertyChange(p)}
                                className="mr-2"
                            />
                            <label htmlFor={`property-${p}`} className="text-sm text-gray-600">
                                {p.propertyName}
                            </label>
                        </div>
                    ))}
                </fieldset>

                <button
                    type="button"
                    onClick={handleUpdate}
                    className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
                >
                    Update Paper
                </button>
            </form>
        </div>
    );
};

export default PaperDetails;
