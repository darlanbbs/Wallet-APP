import React from "react";
import Input from "../components/Input";
import Label from "../components/Label";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../schemas/signUpSchema";
import ErrorInput from "../components/errorInput";
import { signup } from "../../services/user";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signupSchema) });

  async function handleSubmitForm(data) {
    try {
      await signup(data);
      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex justify-center items-center h-screen w-full bg-blue-400">
      <div className="w-1/2 bg-white rounded shadow-2xl p-8 m-4">
        <h1 className="block w-full text-center text-gray-800 text-2xl font-bold mb-6">
          Digital Wallet
        </h1>
        <form
          action="/"
          method="post"
          onSubmit={handleSubmit(handleSubmitForm)}
        >
          <div className="flex flex-col mb-4">
            <Label value={"First Name"} htmlFor="name" />
            <Input type="text" name="name" id="name" register={register} />
            {errors.name && <ErrorInput value={errors.name.message} />}
          </div>
          <div className="flex flex-col mb-4">
            <Label htmlFor="email" value={"Email"} />
            <Input type="email" name="email" id="email" register={register} />
            {errors.email && <ErrorInput value={errors.email?.message} />}
          </div>
          <div className="flex flex-col mb-4">
            <Label htmlFor="password" value={"Password"} />
            <Input
              type="password"
              name="password"
              id="password"
              register={register}
            />
            {errors.password && <ErrorInput value={errors.password.message} />}
          </div>
          <div className="flex flex-col mb-4">
            <Label htmlFor="confirmPassword" value={"Confirm password"} />
            <Input
              type="Password"
              name="confirmPassword"
              id="confirmPassword"
              register={register}
            />
            {errors.confirmPassword && (
              <ErrorInput value={errors.confirmPassword.message} />
            )}
          </div>
          <Button value={"Create Account"} type={"submit"} />
        </form>
        <Link
          className="block w-full text-center no-underline mt-4 text-sm text-gray-700 hover:text-gray-900"
          to="/signin"
        >
          Already have an account?
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
