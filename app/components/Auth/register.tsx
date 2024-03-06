"use client";

import registerUser from "@/app/utils/registerUser";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import * as Yup from "yup";

//form validation using yup
const formSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .max(20, "Name must be less than 20 characters")
    .required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Register = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: async (value) => {
      setIsLoading(true);

      try {
        const data = await registerUser(value);
        if (data?.existingUser) {
          toast.error("User already exists");
        } else if (data?.data?.email) {
          router.refresh();
          router.push("/login");
          toast.success("Registration successfully");
          formik.resetForm();
        }
      } catch (error: any) {
        toast.error(error.message);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    },
    validationSchema: formSchema,
  });
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form className="flex flex-col space-y-4" onSubmit={formik.handleSubmit}>
        {/* Name */}
        <input
          type="text"
          placeholder="Name"
          className="p-2 border rounded"
          value={formik.values.name}
          onChange={formik.handleChange("name")}
          onBlur={formik.handleBlur("name")}
        />
        {/* Name Error message */}
        <div className="text-red-400 mb-2 ">
          {formik.touched.name && formik.errors.name}
        </div>
        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="p-2 border rounded"
          value={formik.values.email}
          onChange={formik.handleChange("email")}
          onBlur={formik.handleBlur("email")}
        />
        {/* Email error message */}
        <div className="text-red-400 mb-2 ">
          {formik.touched.email && formik.errors.email}
        </div>

        <input
          type="password"
          placeholder="Password"
          className="p-2 border rounded"
          value={formik.values.password}
          onChange={formik.handleChange("password")}
          onBlur={formik.handleBlur("password")}
        />
        {/*Password Error message */}
        <div className="text-red-400 mb-2 ">
          {formik.touched.password && formik.errors.password}
        </div>
        <button
          disabled={isLoading}
          type="submit"
          className="bg-blue-500 text-white px-4 rounded py-2"
        >
          {isLoading ? "Loading..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
