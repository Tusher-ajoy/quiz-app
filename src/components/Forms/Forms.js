import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useAuth } from "../../context/AuthContext";
import googleLogo from "../assets/search.png";
import classes from "./Forms.module.css";

const Forms = () => {
  // Hook for toggle between sign up and login
  const [haveAccount, setHaveAccount] = useState(false);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  //sing up function from auth
  const { signup, login, googleSignIn } = useAuth();
  const navigate = useNavigate();

  //From validation for sing up and login
  const formSchema = !haveAccount
    ? Yup.object().shape({
        name: Yup.string().required("name is mandatory"),
        email: Yup.string().required("email is mandatory"),
        password: Yup.string()
          .required("Password is mandatory")
          .min(8, "Password must be at 8 char long"),
        confirmPwd: Yup.string()
          .required("Password confirm is mandatory")
          .oneOf([Yup.ref("password")], "Passwords does not match"),
      })
    : Yup.object().shape({
        email: Yup.string().required("email is mandatory"),
        password: Yup.string()
          .required("Password is mandatory")
          .min(8, "Password must be at 8 char long"),
      });

  const formOption = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOption);
  const { errors } = formState;

  const onSubmit = ({ name, email, password, confirmPwd }) => {
    if (name !== "") {
      //sign up using email and password
      try {
        setError("");
        setLoading(true);
        signup(email, password, name);
        reset();
        navigate("/");
      } catch (err) {
        console.log(err);
        setLoading(false);
        setError("Failed to create account");
      }
    } else {
      //login using email and password
      try {
        setError("");
        setLoading(true);
        login(email, password);
        reset();
        navigate("/");
      } catch (err) {
        console.log(err);
        setLoading(false);
        setError("Failed to login");
      }
    }
  };

  return (
    <>
      {/* google login button */}
      <div className={`mb-2 ${classes.googleSign}`} onClick={googleSignIn}>
        <img src={googleLogo} style={{ width: "1.5rem" }} alt="" />
        <span> {haveAccount ? "Login" : "Sign Up"} with Google</span>
      </div>

      <p className={classes.centerOr}>
        <span>Or</span>
      </p>

      {/* main form start */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* name input */}
        {!haveAccount && (
          <input
            name="name"
            type="text"
            {...register("name")}
            placeholder="enter name"
            className={errors.name ? classes.isInvalid : ""}
          />
        )}
        {/* error handler for name input */}
        {!haveAccount && errors.name && (
          <span style={{ color: "red" }}>*{errors.name?.message}</span>
        )}

        {/* email input */}
        <input
          type="email"
          placeholder="enter email"
          {...register("email")}
          className={errors.email ? classes.isInvalid : ""}
        />
        {/* error handler for email input */}
        {errors.email && (
          <span style={{ color: "red" }}>*{errors.email?.message}</span>
        )}

        {/* password input */}
        <input
          type="password"
          placeholder="enter password"
          {...register("password")}
          className={errors.password ? classes.isInvalid : ""}
        />
        {/* error handler for password input */}
        {errors.password && (
          <span style={{ color: "red" }}>*{errors.password?.message}</span>
        )}

        {/* confirm password input */}
        {!haveAccount && (
          <input
            type="password"
            placeholder="confirm password"
            {...register("confirmPwd")}
            className={errors.confirmPwd ? classes.isInvalid : ""}
          />
        )}
        {/* error handler for confirm password input */}
        {errors.confirmPwd && (
          <span style={{ color: "red" }}>
            *{errors.confirmPwd?.message} <br />
          </span>
        )}

        {/* term & Conditions part */}
        {!haveAccount && (
          <small>
            By signing up, you agree to our{" "}
            <a className="textHighlight" href="#c">
              Terms and Conditions
            </a>
            .
          </small>
        )}
        <br />
        <br />

        {/* submit button */}
        <input className="buttons" disabled={loading} type="submit"></input>
      </form>
      {/* main form end */}

      {/* if any error occurs */}
      {error && <p className="error">{error}</p>}

      {/* toggler between sign up and login form */}
      <p
        style={{ marginBottom: "0", marginTop: "10px" }}
        className="text-center"
      >
        {haveAccount ? "Don't" : "Already"} have an account?{" "}
        <span
          className="textHighlight"
          onClick={() => setHaveAccount(!haveAccount)}
        >
          {haveAccount ? "Sign up" : "Login"}
        </span>{" "}
        instead.
      </p>
    </>
  );
};

export default Forms;
