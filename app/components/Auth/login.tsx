"use client";

import loginUser from "@/app/utils/loginUser";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import { useFormik } from "formik";
import * as Yup from "yup";

//form validation using formik
const formSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (value) => {
      setIsLoading(true);

      try {
        const res = await loginUser(value);
        if (!res?.data?.email) {
          toast.error(res.message);
        }
        if (res?.data?.email) {
          console.log(res?.data);

          router.push("/private");
          toast.success("Login successfully");
          router.refresh();
          formik.resetForm();
        }
      } catch (error: any) {
        toast.error("Login failed");
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
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form className="flex flex-col space-y-4" onSubmit={formik.handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          className="p-2 border rounded"
          value={formik.values.email}
          onChange={formik.handleChange("email")}
          onBlur={formik.handleBlur("email")}
        />
        {/* Error message */}
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
        {/* Error msg */}
        <div className="text-red-400 mb-2">
          {formik.touched.password && formik.errors.password}
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 text-white px-4 rounded py-2"
        >
          {isLoading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
