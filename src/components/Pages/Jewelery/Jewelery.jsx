import TemplateProductCategory from "../../TemplateProductCategory/TemplateProductCategory.jsx";
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