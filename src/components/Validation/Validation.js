import loginImg from "../assets/login.jpg";
import Forms from "../Forms/Forms";
import Nav from "../shared/Nav/Nav";
import classes from "./Validation.module.css";

export default function Validation() {
  return (
    <div className={`container ${classes.validation}`}>
      {/* Navbar */}
      <Nav />

      {/* main part start */}
      <main className={`py-3`}>
        <div className="row d-flex align-items-center">
          <div className={`col-md-6 ${classes.mobileHidden}`}>
            <img src={loginImg} style={{ width: "30rem" }} alt="" />
          </div>
          <div className={`col-md-6 ${classes.formContainer}`}>
            {/* Sign up and login component */}
            <Forms />
          </div>
        </div>
      </main>
      {/* main part end */}
    </div>
  );
}
