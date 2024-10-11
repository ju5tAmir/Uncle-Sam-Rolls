import {http} from "../../http.ts";
import {useEffect, useState} from "react";
import {PropertyToClient} from "../../../Api.ts";
import PropertiesTable from "../../components/admin/properties/PropertiesTable.tsx";
import CreatePropertyModal from "../../components/admin/properties/CreatePropertyModal.tsx";
import toast from "react-hot-toast";

const PropertiesPage = () => {
    const [properties, setProperties] = useState<PropertyToClient[]>([])

    const fetchProperties = async () => {
        const res = await http.api.propertyGetAll();

        if (res) {
            const fetchedProps: PropertyToClient[] = res.data.map(p => {
                    return {propertyId: p.id, propertyName: p.propertyName}
                })
            setProperties(fetchedProps);
            }
        }

    const handleDeleteProperty = async (property: PropertyToClient) => {
        try {
            if (property.propertyId){
            const res = await http.api.propertyDelete(property.propertyId);
            if (res.status === 204) {
                // Remove the deleted property from state
                setProperties(prevProperties => prevProperties.filter(p => p.propertyId !== property.propertyId));
                toast.success("Property deleted successfully.");
                }
            }
        } catch (err) {
            toast.error("Failed to delete the property.");
        }
    };

    // Update button implementation

    useEffect(() => {
        fetchProperties();
    }, []);



    return (
        <>
            <CreatePropertyModal onPropertyCreated={fetchProperties}  />
            <div className="flex flex-col items-center justify-center bg-gray-50">
                <div className="w-full p-4 bg-white shadow-md rounded-lg relative">
                    {/* Create Button positioned above the table */}
                    <div className={"flex justify-end mr-6"}>
                    <button
                        className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition mb-4"
                        onClick={() => {
                            document.getElementById('my_modal_2').showModal()
                        }}
                    >
                        Create
                    </button>
                    </div>
                    {/* Properties Table */}
                    <PropertiesTable properties={properties} onDelete={handleDeleteProperty} />
                </div>
            </div>
        </>
    );

}


export default PropertiesPage;