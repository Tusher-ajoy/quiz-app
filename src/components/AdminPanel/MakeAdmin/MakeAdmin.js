import { useForm } from "react-hook-form";
import classes from "./MakeAdmin.module.css";

const MakeAdmin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    fetch(`https://quizzzical.herokuapp.com/addAdmin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          alert("Admin added successfully");
          window.location.reload(false);
        }
      });
  };
  return (
    <div className="container-fluid px-4">
      <form onSubmit={handleSubmit(onSubmit)} className={classes.adminForm}>
        {/* error handler for quiz title */}
        {errors.email && <span style={{ color: "red" }}>*enter an email</span>}
        <input
          name="email"
          type="email"
          {...register("email", { required: true })}
          placeholder="enter a email address"
          className={errors.email ? classes.isInvalid : ""}
        />

        <input
          className="buttons"
          style={{ width: "10rem" }}
          //   disabled={loading}
          type="submit"
        ></input>
      </form>
    </div>
  );
};

export default MakeAdmin;
