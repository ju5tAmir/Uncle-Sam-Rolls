import { useState, useRef } from "react";
import { http } from "../../../http.ts";
import toast from "react-hot-toast";

interface CreatePropertyModalProps {
    onPropertyCreated: () => void; // Callback prop
}

const CreatePropertyModal = ({ onPropertyCreated }: CreatePropertyModalProps) => {
    const [propertyName, setPropertyName] = useState<string>("");
    const dialogRef = useRef<HTMLDialogElement>(null);

    const handleCreateProperty = async () => {
        try {
            const res = await http.api.propertyCreate({ propertyName });

            if (res.status) {
                toast.success("Property created successfully.");
                onPropertyCreated(); // Call the callback to refetch properties
                if (dialogRef.current) {
                    setPropertyName("");
                    dialogRef.current.close(); // Close the modal
                }
            }
        } catch (err) {
            toast.error("Failed to create the property.");
        }
    };

    return (
        <>
            <dialog ref={dialogRef} id="my_modal_2" className="modal">
                <div className="flex flex-col modal-box p-6 rounded-lg shadow-lg bg-white">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Property Name</h2>
                    <div className="flex flex-col gap-4">
                        <input
                            type="text"
                            value={propertyName}
                            placeholder="Enter property name"
                            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={e => setPropertyName(e.target.value)}
                        />
                        <button
                            className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                            onClick={handleCreateProperty}
                        >
                            Submit
                        </button>
                    </div>
                    <form method="dialog" className="modal-backdrop mt-4">
                        <button className="text-blue-500 hover:underline" type="button" onClick={() => dialogRef.current?.close()}>
                            Close
                        </button>
                    </form>
                </div>
            </dialog>
        </>
    );
};

export default CreatePropertyModal;
