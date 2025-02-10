        import { useParams } from "react-router-dom";
        import TemplateProductCategory from "../../TemplateCategory/TemplateCategory.jsx";

        const Women = () => {
            const { id } = useParams();

            return (
                <div>

                    <TemplateProductCategory/>

                </div>
            );
        };

        export default Women;