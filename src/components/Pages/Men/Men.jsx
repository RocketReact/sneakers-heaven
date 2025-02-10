import { useParams } from "react-router-dom";
import TemplateProductCategory from "../../TemplateProductCategory/TemplateProductCategory.jsx";

const Men = () => {
    const { id } = useParams();

    return (
        <div>

            <TemplateProductCategory/>

        </div>
    );
};

export default Men;