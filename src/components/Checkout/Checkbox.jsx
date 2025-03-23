import { LuCreditCard } from "react-icons/lu";

/**
 * Custom checkbox with icon and label
 * @param {React.ComponentType} [iconCheckbox] - Icon component (default: LuCreditCard)
 * {@param {string} [textLabel] - Label text (default: 'Credit or Debit Card', null for no label)
 * @param {boolean} checked - Checkbox state
 * @param {Function} onChange - Change handler
 * @param {number} [iconSize=25] - Icon size in pixels
 */
export default function Checkbox({
                                     iconCheckbox: IconCheckBox,
                                     textLabel: NewText,
                                     checked,
                                     onChange,
                                     iconSize = 25
                                 }) {
    // Default icon: LuCreditCard, or custom if provided
    const IconToShow = IconCheckBox === undefined ? LuCreditCard : IconCheckBox;

    // Label text handling
    const LabelText = NewText === null ? null : (NewText || 'Credit or Debit Card');

    return (
        <>
            <label className="inline-flex items-center cursor-pointer ">
                {/* Hidden checkbox for a11y */}
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                    className="hidden"
                />

                {/* Custom checkbox circle */}
                <span
                    className={`flex justify-center items-center size-5 rounded-full border-1 ${
                        checked ? "bg-emerald-400 border-emerald-400" : "bg-white border-emerald-300"
                    }`}
                >
                    {/* Indicator when checked */}
                    {checked && (
                        <svg
                            className="size-3.5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <circle cx="10" cy="10" r="5" />
                        </svg>
                    )}
                </span>

                {/* Icon and text label */}
                <span className="flex flex-row ml-2 text-gray-700 select-none font-normal text-base gap-2">
                    {IconToShow && <IconToShow size={iconSize} className="font-extralight" />}
                    {LabelText}
                </span>
            </label>
        </>
    );
}