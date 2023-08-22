import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Label from "../components/Label";
import Button from "../components/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signinSchema } from "../schemas/signInSchema";
import ErrorInput from "../components/errorInput";
import { signin } from "../../services/user";
import Cookies from "js-cookie";

const LoginPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signinSchema) });

  async function handleSubmitForm(data) {
    try {
      const token = await signin(data);
      Cookies.set("token", token.data, { expires: 1 });
      navigate("/");
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
            <Label value={"Email"} htmlFor="email" />
            <Input
              type="email"
              name="email"
              id="email"
              placeholder={"Email"}
              register={register}
            />
            {errors && <ErrorInput value={errors.email?.message} />}
          </div>
          <div className="flex flex-col mb-4">
            <Label value={"Password"} htmlFor="password" />
            <Input
              placeholder={"Password"}
              type="password"
              name="password"
              id="password"
              register={register}
            />
            {errors && <ErrorInput value={errors.password?.message} />}
          </div>
          <Button value={"Sign In"} type={"submit"} />
        </form>
        <Link
          className="block w-full text-center no-underline mt-4 text-sm text-gray-700 hover:text-gray-900"
          to="/signup"
        >
          Dont have an account?
          <span className="py-2 px-3 text-blue-800 font-bold">Register</span>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
