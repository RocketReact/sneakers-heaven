import TextInput from "./TextInput.jsx";
import {useFormContext} from "react-hook-form";
import {useEffect} from "react";

/**
 * Email input field with validation
 */
export function Email() {
    return <TextInput
        id="email"
        name="email"
        label="Email*"
        rules={{
            required: "Email is required",
            pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Invalid email address",
            },
        }}
    />
}

/**
 * Password input with security requirements
 */
export function Password() {
    return (
        <TextInput
            id="password"
            name="password"
            label="Password*"
            type="password"
            rules={{
                required: "Password is required",
                minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                },
                pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/,
                    message: "Password must contain letters and numbers",
                },
            }}
        />
    );
}

/**
 * First and last name input fields
 */
export function Name() {
    return <div className="flex-col">
        <div className="flex flex-row space-x-3">
            <div className="w-full">
                <TextInput
                    id="firstName"
                    name="firstName"
                    label="First Name*"
                    rules={{
                        required: "First name is required",
                    }}
                />
            </div>
            <div className="w-full">
                <TextInput
                    id="lastName"
                    name="lastName"
                    label="Last Name*"
                    rules={{
                        required: "Last name is required",
                    }}
                />
            </div>
        </div>
    </div>
}

/**
 * Complete address and contact form
 *
 * @param {boolean} HiddenEmail - Whether to hide email field
 * @param {Object} values - Form values to pre-populate fields
 */
export default function TextInputHtml({HiddenEmail, values}) {
    // Form context for reset functionality
    const {reset} = useFormContext();

    // Pre-populate form when values change
    useEffect(() => {
        if (values) {
            reset(values);
        }
    }, [values, reset]);

    return (
        <div>
            {/* Email field (optional) */}
            <div className={`${HiddenEmail ? 'hidden' : ''}`}>
                <TextInput
                    id="email"
                    name="email"
                    label="Email*"
                    rules={{
                        required: "Email is required",
                        pattern: {
                            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                            message: "Invalid email address",
                        },
                    }}
                />
            </div>

            {/* Name fields */}
            <div className="flex-col">
                <div className="flex flex-row space-x-3">
                    <div className="w-full">
                        <TextInput
                            id="firstName"
                            name="firstName"
                            label="First Name*"
                            rules={{
                                required: "First name is required",
                            }}
                        />
                    </div>
                    <div className="w-full">
                        <TextInput
                            id="lastName"
                            name="lastName"
                            label="Last Name*"
                            rules={{
                                required: "Last name is required",
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Address fields */}
            <div className="flex-col">
                <div className="flex flex-row space-x-3">
                    <div className="w-full">
                        <TextInput
                            id="country"
                            name="country"
                            label="Country*"
                            rules={{
                                required: "Country is required",
                            }}
                        />
                    </div>
                    <div className="w-full">
                        <TextInput
                            id="city"
                            name="city"
                            label="City*"
                            rules={{
                                required: "City is required",
                            }}
                        />
                    </div>
                    <div className="w-full font-stretch-50%">
                        <TextInput
                            id="postalCode"
                            name="postalCode"
                            label="Postal Code*"
                            rules={{
                                required: "Postal code is required",
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Contact information */}
            <div className="flex-col">
                <div className="flex flex-row space-x-3 ">
                    <div className="w-full">
                        <TextInput
                            id="phoneNumber"
                            name="phoneNumber"
                            label="Phone Number*"
                            rules={{
                                required: "Phone number is required",
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: "Invalid phone number",
                                },
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
};