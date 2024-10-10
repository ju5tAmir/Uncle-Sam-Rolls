import { PaperToClient } from "../../../../Api.ts";
import { RoutePath } from "../../../routes/RoutePath.ts";
import { useNavigate } from "react-router-dom";

interface PapersTableProps {
    papers: PaperToClient[]
}

const PapersTable = ({ papers }: PapersTableProps) => {
    const navigate = useNavigate();

    return (
        <>
            <div className="overflow-x-auto p-6">
                <div className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <table className="min-w-full table-auto">
                        {/* Table Headers */}
                        <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                        <tr>
                            <th className="py-3 px-6 text-left">ID</th>
                            <th className="py-3 px-6 text-left">Paper Name</th>
                            <th className="py-3 px-6 text-left">Discontinued</th>
                            <th className="py-3 px-6 text-left">Stock</th>
                            <th className="py-3 px-6 text-left">Price</th>
                            <th className="py-3 px-6 text-left">Properties</th>
                        </tr>
                        </thead>
                        {/* Table Body */}
                        <tbody className="text-gray-700 text-sm font-light">
                        {papers.map((paper, index) => (
                            <tr
                                key={index}
                                className="border-b border-gray-200 hover:bg-gray-50 transition"
                                onClick={() => {
                                    // Uncomment to navigate to the paper details page
                                    navigate(`${RoutePath.papers}/${paper.id}`);
                                }}
                            >
                                <td className="py-3 px-6">{paper.id}</td>
                                <td className="py-3 px-6">{paper.name}</td>
                                <td className="py-3 px-6">{paper.discontinued ? "Yes" : "No"}</td>
                                <td className="py-3 px-6">{paper.stock}</td>
                                <td className="py-3 px-6">${paper.price.toFixed(2)}</td>
                                <td className="py-3 px-6">
                                    <ul className="list-disc list-inside">
                                        {paper.properties?.map((property, idx) => (
                                            <li key={idx}>{property.propertyName}</li>
                                        )) || <li>No properties</li>}
                                    </ul>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default PapersTable;
