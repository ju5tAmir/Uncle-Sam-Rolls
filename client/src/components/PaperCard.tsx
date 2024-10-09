import {PaperCardProps} from "../models/PaperCardProps.ts";
import {useNavigate} from "react-router-dom";
import {RoutePath} from "../routes/RoutePath.ts";

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
                                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                                alt="Paper Picture"/>
                        </figure>
                        <div className="card-body overflow-y-auto max-h-32">
                            <h2 className="card-title">
                                {paper.name}
                                {/*<div className="badge badge-secondary">NEW</div>*/}
                            </h2>
                            <p>${paper.id}</p>

                            {/* Paper properties as badge */}
                            <div className="card-actions flex-row flex-wrap">
                                {paper.properties?.map((property) => (
                                    <div key={property.id} className="badge badge-outline">{property.propertyName}</div>
                                ))}
                            </div>

                        </div>

                    </div>
                ))
            }

        </>
    )
}

export default PaperCard;