import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useAtom} from "jotai";
import {PapersAtom} from "../atoms/PapersAtom.tsx";
import {Paper} from "../../Api.ts";
import {http} from "../http.ts";
import NotFound from "./NotFound.tsx";
import LoadingPage from "./LoadingPage.tsx";
import NumberInput from "../components/NumberInput.tsx";
import Button from "../components/Button.tsx";
import toast from "react-hot-toast";
import {CardItemsAtom} from "../atoms/CardItemsAtom.tsx";
import {CardItem} from "../models/CardItem.ts";
import {setItemToLocalStorage} from "../utilities/LocalStorageUtils.ts";
import useCardUtils from "../utilities/CardUtils.ts";

const PaperDetails = () => {
    const {id} = useParams<{id: string}>();
    const [papers ] = useAtom(PapersAtom);
    const [paper, setPaper] = useState<Paper | undefined>(undefined)
    const [loading, setLoading] = useState<boolean>(true);
    const [counter, setCounter] = useState(1);
    const [cardItems, setCardItems] = useAtom(CardItemsAtom);
    const cardUtils = useCardUtils();

    useEffect(() => {
        if (id) {
            const paperFromAtom = papers.find((p: Paper) => p.id === parseInt(id, 10));

            if (paperFromAtom) {
                // Paper found in atom, no need to fetch from API
                setPaper(paperFromAtom);

                setLoading(false);
            } else {
                // Paper not found in atom, fetch from API
                getPaper(parseInt(id, 10));
            }

        }
    }, [id, papers]);

    async function getPaper(paperId: number) {
        try {
            const response = http.api.paperGetPaperById(paperId);
            setPaper(await response.then(r => r.data))
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <LoadingPage/>
    }

    if (!paper) {
        return <NotFound/>;
    }

    if (paper) {
        return (
            <>
                <div className="grid grid-cols-2 place-items-center justify-between tracking-tight bg-base-100">
                    <div>
                        <img
                            src="https://astroship.web3templates.com/_astro/hero.DlKDY3ml_Z1VhsC8.webp"
                            alt="Astroid Picture"
                            className="max-w-sm rounded-lg shadow-2xl"/>
                    </div>

                    <div className="flex flex-col p-10 m-10  gap-4">
                        <h1 className="text-5xl font-bold">
                            {paper.name}
                        </h1>

                        <p className="text-lg mt-4 text-slate-600 max-w-xl">
                            Astroship is a starter template for startups, marketing websites & landing
                            pages.
                            <wbr/>
                            Built with Astro.build and TailwindCSS. You can quickly
                            create any website with this starter.
                        </p>
                        <div className="card-actions flex-row flex-wrap">
                            {paper.properties?.map ((property) => (
                                <div key={property.id} className="badge badge-outline">{property.propertyName}</div>
                            ))}
                        </div>


                        <NumberInput value={counter} onChange={setCounter}/>

                        <Button onClick={() => {
                            cardUtils.addItemToCard({paper: paper, quantity: counter})


                            toast.success("Item added to the cart successfully.");
                        }}/>
                    </div>
                </div>
            </>
        )
    }



}

export default PaperDetails;