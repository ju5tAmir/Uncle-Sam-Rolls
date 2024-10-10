import {useEffect, useState} from "react";
import {PaperToClient} from "../../../Api.ts";
import {http} from "../../http.ts";
import PapersTable from "../../components/admin/papers/PapersTable.tsx";
import {useNavigate} from "react-router-dom";
import {RoutePath} from "../../routes/RoutePath.ts";

const PapersPage = () => {
    const [papers, setPapers] = useState<PaperToClient[]>([]);
    const navigate = useNavigate();

    const fetchPapers = async () => {
        const res = await http.api.paperGetAll();

        if (res.status === 200) {
            setPapers(res.data);
        }
    }

    useEffect (() => {
        fetchPapers();
    }, []);

    return (
        <>
            <div className="flex justify-end items-center mb-4 pr-4">
                <button
                    className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600 transition mb-4 mr-5"
                    onClick={() => {
                        navigate(`${RoutePath.papers}/create`)
                    }}
                >
                    Create Paper
                </button>
            </div>
            <PapersTable papers={papers} />
        </>


    )
}

export default PapersPage;