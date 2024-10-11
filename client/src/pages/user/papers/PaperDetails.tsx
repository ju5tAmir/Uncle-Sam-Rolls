import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useAtom} from "jotai";
import {PapersAtom} from "../../../atoms/PapersAtom.tsx";
import {Paper} from "../../../../Api.ts";
import {http} from "../../../http.ts";
import NotFound from "../general/NotFound.tsx";
import LoadingPage from "../general/LoadingPage.tsx";
import NumberInput from "../../../components/user/NumberInput.tsx";
import Button from "../../../components/user/Button.tsx";
import toast from "react-hot-toast";
import {CardItemsAtom} from "../../../atoms/CardItemsAtom.tsx";
import {CardItem} from "../../../models/CardItem.ts";
import {setItemToLocalStorage} from "../../../utilities/LocalStorageUtils.ts";
import useCardUtils from "../../../utilities/CardUtils.ts";

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
                <div className="grid grid-cols-1 md:grid-cols-2 place-items-center justify-between p-8 bg-white rounded-lg shadow-lg">
                    <div className="flex justify-center mb-6 md:mb-0">
                        <img
                            src="https://spaldingeducationstore.org/cdn/shop/products/paper-spalding-vertical-paper-5-8-inch-pa1_530x@2x.jpg"
                            alt="Paper Picture"
                            className="max-w-sm rounded-lg shadow-2xl transition-transform transform hover:scale-105"
                        />
                    </div>

                    <div className="flex flex-col p-6 gap-6">
                        <h1 className="text-4xl font-extrabold text-gray-800 hover:text-gray-600 transition-colors">
                            {paper.name}
                        </h1>

                        <div className="flex flex-col">
                            <span className="text-2xl font-semibold text-gray-800">${paper.price.toFixed(2)}</span>
                            <span className={`text-lg ${paper.stock ? 'text-green-600' : 'text-red-600'} font-medium`}>
                            {paper.stock ? 'In Stock' : 'Out of Stock'}
                        </span>
                            {paper.discontinued && (
                                <span className="text-sm text-red-500 font-medium">Discontinued</span>
                            )}
                        </div>

                        <NumberInput value={counter} onChange={setCounter} />

                        <Button
                            onClick={() => {
                                cardUtils.addItemToCard({ paper, quantity: counter });
                                toast.success("Item added to the cart successfully.");
                            }}
                        />
                    </div>
                </div>
            </>
        );
    }



}

export default PaperDetails;