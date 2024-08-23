"use client";

import React, { useState } from "react";
import "./index.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import { toastError, toastSuccess } from "@/utils/toast";
import Image from "next/image";

interface ErrorType {
  name?: string;
  password?: string;
}

const LoginPage = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<ErrorType>({ name: "", password: "" });
  const router = useRouter();

  const notifySuccess = () => {
    toastSuccess("Login Successfully");
  };
  const notifyError = (msg: string) => {
    toastError(msg || "Something went wrong");
  };

  const validateAndSubmitForm = () => {
    const Error: ErrorType = {};
    let isValid = true;
    if (name.trim() === "") {
      Error["name"] = "Please enter your name";
      isValid = false;
    } else if (name.length < 2) {
      Error["name"] = "Name is too short";
      isValid = false;
    }

    if (password.trim() === "") {
      Error["password"] = "Please enter your password";
      isValid = false;
    } else if (password.length < 5) {
      Error["password"] = "Password is too short";
      isValid = false;
    } else if (password.length < 5) {
      Error["password"] = "password is too short";
      isValid = false;
    }

    setErrors(Error);
    return isValid;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (validateAndSubmitForm()) {
      try {
        const response = await axios.post("/api/login", {
          id: name,
          password,
        });

        router.replace("/dashboard");
        localStorage.setItem("token", response.data.token);
        notifySuccess();
        setName("");
        setPassword("");
      } catch (error: any) {
        console.error(error.response.data, "ee");
        notifyError(error.response.data.message);
      }

      setErrors({});
    }
  };

  return (
    <div className="container-fluid">
      <section className="loginPage">
        <div className="flex justify-center">
          <Image
            style={{ marginBottom: "50px" }}
            src={
              "https://res.cloudinary.com/dtanynxqy/image/upload/v1724233321/home_logos/defeesphcvzxkq0ttzey.png"
            }
            alt="logo"
            width={100}
            height={200}
            className="mainlogo"
          />
        </div>
        <div>
          <h1 className="loginInfoCont mb-4">Login</h1>
        </div>
        <form className="formOuterWrapper" onSubmit={handleSubmit}>
          <div className="formWrapper mb-4">
            <label htmlFor="username" className="labelControl">
              UserName
            </label>
            <input
              type="text"
              value={name}
              name="name"
              id="username"
              className="formControl"
              onChange={(e) => setName(e.target.value)}
            />
            <span style={{ color: "red" }}>{errors["name"]}</span>
          </div>
          <div className="formWrapper mb-4">
            <label htmlFor="password" className="labelControl">
              Password
            </label>
            <input
              type="password"
              value={password}
              name="password"
              maxLength={10}
              id="password"
              className="formControl"
              onChange={(e) => setPassword(e.target.value)}
            />
            <span style={{ color: "red" }}>{errors["password"]}</span>
          </div>
          <div>
            <button type="submit" className="btnSubmit">
              Submit
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};
export default LoginPage;
