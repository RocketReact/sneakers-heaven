import { LuCreditCard } from "react-icons/lu";

export default function Checkbox({ iconCheckbox: IconCheckBox,
                                     textLabel: NewText,
                                     checked, onChange,
                                     iconSize= 25
                                 }) {


    const IconToShow = IconCheckBox === undefined ? LuCreditCard : IconCheckBox;
    const LabelText = NewText===null? null: ( NewText|| 'Credit or Debit Card');

    return (
        <>
            <label className="inline-flex items-center cursor-pointer ">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                    className="hidden"
                />
                <span
                    className={`flex justify-center items-center size-5 rounded-full border-1 ${
                        checked ? "bg-emerald-400 border-emerald-400" : "bg-white border-emerald-300"
                    }`}
                >
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
                <span className="flex flex-row ml-2 text-gray-700 select-none font-normal text-base gap-2">
          {IconToShow && <IconToShow size={iconSize} className="font-extralight" />}
                    {LabelText}
        </span>
            </label>
        </>
    );
}