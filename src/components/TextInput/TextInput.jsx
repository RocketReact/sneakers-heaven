import { useFormContext } from "react-hook-form";

/**
 * Floating label text input component with form validation
 * Integrates with React Hook Form context
 *
 * @param {string} id - Input element id
 * @param {string} name - Form field name
 * @param {string} label - Input label text
 * @param {Function} onChange - Optional change handler
 * @param {Object} rules - React Hook Form validation rules
 * @param {Object} rest - Additional props passed to the input element
 */

export default function TextInput ({ id, name, label, onChange, rules = {}, ...rest }) {
    // Get form context from parent FormProvider
    const formContext = useFormContext();
    if (!formContext) {
        return null;
    }

    // Extract form methods and state
    const { register, watch, formState: { errors } } = formContext;
    const value = watch(name); // Track field value for floating label

    return (
        <div className="relative mt-6">
            {/* Input field with validation */}
            <input
                id={id}
                type="text"
                {...register(name, rules)}
                className={`peer w-full px-2 pt-5 pb-2 border-2 rounded-md text-base focus:outline-none transition-all 
                    ${errors[name] ? "border-red-500" : "border-gray-300"}`}
                {...rest}
            />

            {/* Floating label - moves up when input has value or focus */}
            <label
                htmlFor={id}
                className={`absolute left-2 bg-white px-1 transition-all duration-300
                    ${errors[name] ? "text-red-500" : "text-gray-400"} 
                    ${value ? "-top-2.5 text-sm text-blue-500" : "top-3 text-base"} 
                    peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-500`}
            >
                {label}
            </label>

            {/* Error message */}
            {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>}
        </div>
    );
};
