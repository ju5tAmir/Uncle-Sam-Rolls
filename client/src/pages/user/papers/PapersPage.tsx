import PaperCard from "../../../components/user/PaperCard.tsx";
import {useEffect} from "react";
import {http} from "../../../http.ts";
import {useAtom} from 'jotai';
import {PapersAtom} from "../../../atoms/PapersAtom.tsx";


const PapersPage = () => {

   const [papers, setPapers] = useAtom(PapersAtom);


    useEffect(() => {
        const fetchPapers = async () => {
            try {
                const res = await http.api.paperGetAll();
                setPapers(res.data);
            } catch (error) {
                console.error('Error fetching papers:', error);
            }
        };

        fetchPapers();
    }, []);


    return (
        <>
            {/* Search Box Here */}

            {/* Items as cards here */}
            <div className="grid grid-cols-5 my-10 justify-between place-items-center mx-20 gap-10">
                <PaperCard papers={papers}/>
            </div>
        </>
    )
}

export default PapersPage;