import {PaperCardProps} from "../../models/PaperCardProps.ts";
import {useNavigate} from "react-router-dom";
import {RoutePath} from "../../routes/RoutePath.ts";

const PaperCard = (paperCardProps: PaperCardProps) => {

    const { papers } = paperCardProps;
    const navigate = useNavigate();

    const navigateToItem = (itemId?: number) => {
        if (itemId) {
            navigate(RoutePath.paperById(itemId));
        } else {
            navigate('/404');
        }
    }

    return (
        <>
            {
                papers.map((paper) => (
                    <div className="card bg-base-100 w-64 shadow-xl "
                    onClick={() => {
                        navigateToItem(paper.id)
                    }}>
                        <figure>
                            <img
                                src="https://spaldingeducationstore.org/cdn/shop/products/paper-spalding-vertical-paper-5-8-inch-pa1_530x@2x.jpg"
                                alt="Paper Picture"/>
                        </figure>
                        <div className="card-body overflow-y-auto ">
                            <h2 className="card-title">
                                {paper.name}
                                {/*<div className="badge badge-secondary">NEW</div>*/}
                            </h2>
                            <div className="card-actions flex-row flex-wrap">
                                {paper.properties?.map ((property) => (
                                    <div key={property.id} className="badge badge-outline">{property.propertyName}</div>
                                ))}
                            </div>

                            <div className="flex flex-row mt-5 justify-between">
                            <p className={`flex ${paper.stock?? 0 > 0 ? 'text-green-800' : 'text-red-700'}`}>{paper.stock ?? 0} in stock</p>

                            <p className={"flex font-bold"}>${paper.price}</p>
                            </div>
                            {/* Paper properties as badge */}

                        </div>

                    </div>
                ))
            }

        </>
    )
}

export default PaperCard;