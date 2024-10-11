import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Api, PaperCreateDto, AddPropertiesToPaperDto } from "client/Api.ts";

const api = new Api();

const AdminPage: React.FC = () => {
    const [papers, setPapers] = useState<any[]>([]);
    const [newPaper, setNewPaper] = useState<PaperCreateDto>({
        name: "",
        discontinued: false,
        stock: 0,
        price: 0,
    });
    const [properties, setProperties] = useState<any[]>([]);
    const [selectedProperties, setSelectedProperties] = useState<number[]>([]);
    const [restockId, setRestockId] = useState<number | null>(null);
    const [restockCount, setRestockCount] = useState<number>(0);

    useEffect(() => {
        const fetchPapers = async () => {
            try {
                const response = await api.api.paperGetAll();
                setPapers(response.data);
            } catch (error) {
                console.error("Failed to fetch papers:", error);
                toast.error("Failed to fetch papers");
            }
        };

        const fetchProperties = async () => {
            try {
                const response = await api.api.propertyGetAll();
                setProperties(response.data);
            } catch (error) {
                console.error("Failed to fetch properties:", error);
                toast.error("Failed to fetch properties");
            }
        };

        fetchPapers();
        fetchProperties();
    }, []);

    const handleCreatePaper = async () => {
        try {
            const response = await api.api.paperCreate(newPaper);
            toast.success("Paper created successfully!");
            setNewPaper({ name: "", discontinued: false, stock: 0, price: 0 });
            const allPapers = await api.api.paperGetAll();
            setPapers(allPapers.data);
        } catch (error) {
            console.error("Failed to create paper:", error);
            toast.error("Failed to create paper");
        }
    };

    const handleRestockPaper = async () => {
        if (restockId !== null) {
            try {
                await api.api.paperRestockPaper({ paperId: restockId, restockCount });
                toast.success("Paper restocked successfully!");
                const allPapers = await api.api.paperGetAll();
                setPapers(allPapers.data);
            } catch (error) {
                console.error("Failed to restock paper:", error);
                toast.error("Failed to restock paper");
            }
        }
    };

    const handleDiscontinuePaper = async (paperId: number) => {
        try {
            await api.api.paperDiscontinuePaper({ paperId, status: true });
            toast.success("Paper discontinued successfully!");
            const allPapers = await api.api.paperGetAll();
            setPapers(allPapers.data);
        } catch (error) {
            console.error("Failed to discontinue paper:", error);
            toast.error("Failed to discontinue paper");
        }
    };

    const handleAddProperties = async (paperId: number) => {
        try {
            const data: AddPropertiesToPaperDto = {
                paperId,
                properties: selectedProperties,
            };
            await api.api.paperAddProperties(data);
            toast.success("Properties added successfully!");
            const allPapers = await api.api.paperGetAll();
            setPapers(allPapers.data);
        } catch (error) {
            console.error("Failed to add properties:", error);
            toast.error("Failed to add properties");
        }
    };

    const handleSelectProperty = (propertyId: number) => {
        setSelectedProperties((prev) =>
            prev.includes(propertyId) ? prev.filter((id) => id !== propertyId) : [...prev, propertyId]
        );
    };

    return (
        <div>
            <h1>Admin Panel</h1>

            {/* Create Paper Form */}
            <div>
                <h2>Create New Paper</h2>
                <input
                    type="text"
                    placeholder="Name"
                    value={newPaper.name}
                    onChange={(e) => setNewPaper({ ...newPaper, name: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Stock"
                    value={newPaper.stock}
                    onChange={(e) => setNewPaper({ ...newPaper, stock: Number(e.target.value) })}
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={newPaper.price}
                    onChange={(e) => setNewPaper({ ...newPaper, price: Number(e.target.value) })}
                />
                <button onClick={handleCreatePaper}>Create Paper</button>
            </div>

            {/* List of Papers */}
            <h2>Papers</h2>
            <ul>
                {papers.map((paper) => (
                    <li key={paper.id}>
                        {paper.name} - Stock: {paper.stock}
                        <button onClick={() => {
                            setRestockId(paper.id);
                            setRestockCount(1); // Set a default restock count
                        }}>Restock</button>
                        <button onClick={() => handleDiscontinuePaper(paper.id)}>Discontinue</button>

                        {/* Display paper properties */}
                        <div>
                            <h3>Properties</h3>
                            <ul>
                                {properties.map((property) => (
                                    <li key={property.propertyId}>
                                        <input
                                            type="checkbox"
                                            checked={selectedProperties.includes(property.propertyId)}
                                            onChange={() => handleSelectProperty(property.propertyId)}
                                        />
                                        {property.propertyName}
                                    </li>
                                ))}
                            </ul>
                            <button onClick={() => handleAddProperties(paper.id)}>Add Properties</button>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Restock Paper */}
            {restockId !== null && (
                <div>
                    <h2>Restock Paper</h2>
                    <input
                        type="number"
                        placeholder="Restock Count"
                        value={restockCount}
                        onChange={(e) => setRestockCount(Number(e.target.value))}
                    />
                    <button onClick={handleRestockPaper}>Confirm Restock</button>
                </div>
            )}
        </div>
    );
};

export default AdminPage;
