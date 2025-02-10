        import { useParams } from "react-router-dom";
        import TemplateProductCategory from "../../TemplateProductCategory/TemplateProductCategory.jsx";

        const Women = () => {
            const { id } = useParams();

            return (
                <div>

                    <TemplateProductCategory/>

                </div>
            );
        };

        export default Women;