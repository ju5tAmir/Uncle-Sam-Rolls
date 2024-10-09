import {CheckoutItemProps} from "../models/CheckouteItemProps.ts";
import NumberInput from "./NumberInput.tsx";
import {ThemeProvider} from "@material-tailwind/react";
import value = ThemeProvider.propTypes.value;
import useCardUtils from "../utilities/CardUtils.ts";
import {useState} from "react";
import RemoveButton from "./RemoveButton.tsx";

const CheckoutItem  = (CheckoutItemProps: CheckoutItemProps) => {


    const cardUtils = useCardUtils();
    const [counter, setCounter] = useState(CheckoutItemProps.size);

    return (
        <>

            <div
                className="flex flex-row max-w-xl"
            >
                <div className="card bg-base-100 w-96 shadow-xl ">
                    <figure>
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                            alt="Paper Picture"/>
                    </figure>
                    <div className="card-body overflow-y-auto">
                        <h2 className="card-title">
                            {CheckoutItemProps.item.paper.name}
                        </h2>
                        <p></p>

                        {/* Paper properties as badge */}
                        <div className="card-actions flex-row flex-wrap">

                        </div>

                        <div className="flex flex-row gap-5 justify-between items-center">
                            <NumberInput value={counter} onChange={setCounter}/>
                            <RemoveButton className="mt-7" onClick={() => {
                                cardUtils.removeItemFromCard(CheckoutItemProps.item)
                            }}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CheckoutItem;