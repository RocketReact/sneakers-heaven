import { useFormContext } from "react-hook-form";

const TextInput = ({ id, name, label, onChange, rules = {}, ...rest }) => {
    const formContext = useFormContext();
    if (!formContext) {
        return null;
    }

    const { register, watch, formState: { errors } } = formContext;
    const value = watch(name);

    return (
        <div className="relative mt-6">
            <input
                id={id}
                type="text"
                {...register(name, rules)}
                className={`peer w-full px-2 pt-5 pb-2 border-2 rounded-md text-base focus:outline-none transition-all 
                    ${errors[name] ? "border-red-500" : "border-gray-300"}`}
                {...rest}

            />
            <label
                htmlFor={id}
                className={`absolute left-2 bg-white px-1 transition-all duration-300
                    ${errors[name] ? "text-red-500" : "text-gray-400"} 
                    ${value ? "-top-2.5 text-sm text-blue-500" : "top-3 text-base"} 
                    peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-500`}
            >
                {label}
            </label>

            {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>}
        </div>
    );
};

export default TextInput;