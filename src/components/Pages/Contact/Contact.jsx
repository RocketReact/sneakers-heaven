import { useFormik } from 'formik';
import * as Yup from 'yup';

const Contact = () => {
     const formik = useFormik({
          initialValues: {
               country: '',
               state: '',
               city: '',
               street: '',
               zip: '',
               email: '',
          },
          validationSchema: Yup.object({
               country: Yup.string().required('Country is required'),
               state: Yup.string().required('State is required'),
               city: Yup.string().required('City is required'),
               street: Yup.string().required('Street is required'),
               zip: Yup.string()
                   .matches(/^[0-9]{5}$/, 'Zip code must be 5 digits')
                   .required('Zip is required'),
               email: Yup.string()
                   .email('Invalid email format')
                   .required('Email is required'),
          }),
          onSubmit: (values) => {
               alert(`Form submitted with data: ${JSON.stringify(values, null, 2)}`);
          },
     });

     return (
         <form onSubmit={formik.handleSubmit} className="
         flex flex-col justify-center items-center space-y-3
         mt-5
         ">
              <label>
                   Country:
                   <input
                       type="text"
                       name="country"
                       className="border-2 border-gray-500 rounded-md p-2"
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}
                       value={formik.values.country}
                   />
                   {formik.touched.country && formik.errors.country && (
                       <div className="text-red-500">{formik.errors.country}</div>
                   )}
              </label>

              <label>
                   State:
                   <input
                       type="text"
                       name="state"
                       className="border-2 border-gray-500 rounded-md p-2"
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}
                       value={formik.values.state}
                   />
                   {formik.touched.state && formik.errors.state && (
                       <div className="text-red-500">{formik.errors.state}</div>
                   )}
              </label>

              <label>
                   City:
                   <input
                       type="text"
                       name="city"
                       className="border-2 border-gray-500 rounded-md p-2"
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}
                       value={formik.values.city}
                   />
                   {formik.touched.city && formik.errors.city && (
                       <div className="text-red-500">{formik.errors.city}</div>
                   )}
              </label>

              <label>
                   Street:
                   <input
                       type="text"
                       name="street"
                       className="border-2 border-gray-500 rounded-md p-2"
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}
                       value={formik.values.street}
                   />
                   {formik.touched.street && formik.errors.street && (
                       <div className="text-red-500">{formik.errors.street}</div>
                   )}
              </label>

              <label>
                   Zip:
                   <input
                       type="text"
                       name="zip"
                       className="border-2 border-gray-500 rounded-md p-2"
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}
                       value={formik.values.zip}
                   />
                   {formik.touched.zip && formik.errors.zip && (
                       <div className="text-red-500">{formik.errors.zip}</div>
                   )}
              </label>

              <label>
                   Email:
                   <input
                       type="email"
                       name="email"
                       className="border-2 border-gray-500 rounded-md p-2"
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}
                       value={formik.values.email}
                   />
                   {formik.touched.email && formik.errors.email && (
                       <div className="text-red-500">{formik.errors.email}</div>
                   )}
              </label>

              <button
                  type="submit"
                  className="
                  mt-4 bg-blue-500 text-white px-4
                  py-2 rounded-full hover:bg-blue-700
                  hover:cursor-pointer
                  "
              >
                   Submit
              </button>
         </form>
     );
};

export default Contact;