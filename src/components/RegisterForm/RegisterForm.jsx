import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(6, "Too short").required("Required"),
});

export default function RegisterForm() {
    return (
        <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) => console.log("User Data", values)}
        >
            {({ handleSubmit }) => (
                <Form className="justify-self-center mt-5 space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <Field className='border-gray-100'  name="email" type="email" placeholder="Email" />
                        <ErrorMessage name="email" component="div" className="text-red-500" />
                    </div>

                    <div>
                        <Field name="password" type="password" placeholder="Password" />
                        <ErrorMessage name="password" component="div" className="text-red-500" />
                    </div>

                    <button
                        className='bg-black text-white
                        rounded-full p-2 pr-3 pl-3 hover:bg-gray-400
                        hover:cursor-pointer active:scale-90 duration-200'
                         type="submit">Sign Up</button>
                </Form>
            )}
        </Formik>
    );
}