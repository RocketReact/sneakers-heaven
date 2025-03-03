import TemplateProductCategory from "../../TemplateCategory/TemplateCategory.jsx";
import { useParams } from "react-router-dom";

const Jewelery = () => {
    const { id } = useParams();

    return (

        <div>

            <TemplateProductCategory/>

        </div>


    );
};


export default Jewelery;