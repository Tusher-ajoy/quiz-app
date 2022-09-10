import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import classes from "./CreateQuiz.module.css";

const CreateQuiz = () => {
  const [loading, setLoading] = useState();
  const navigate = useNavigate();

  //From validation for create quiz
  const formSchema = Yup.object().shape({
    title: Yup.string().required("title is mandatory"),
    description: Yup.string().required("description is mandatory"),
    price: Yup.number().required("price is mandatory"),
    img: Yup.mixed().test(
      "required",
      "you need to provide a image",
      (value) => {
        return value && value.length;
      }
    ),
  });
  const formOption = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOption);
  const { errors } = formState;
  const onSubmit = ({ price, description, title, img }) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("file", img[0]);
    fetch("https://quizzzical.herokuapp.com/createQuiz", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        reset();
        navigate("/dashboard/upload-quiz");
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };
  return (
    <div class="container-fluid px-4">
      <form onSubmit={handleSubmit(onSubmit)} className={classes.quizForm}>
        <input
          name="title"
          type="text"
          {...register("title")}
          placeholder="enter quiz title"
          className={errors.title ? classes.isInvalid : ""}
        />
        {/* error handler for quiz title */}
        {errors.title && <span style={{ color: "red" }}>*</span>}

        <input
          name="description"
          type="text"
          {...register("description")}
          placeholder="enter a short description"
          className={errors.description ? classes.isInvalid : ""}
        />
        {/* error handler for quiz description */}
        {errors.description && <span style={{ color: "red" }}>*</span>}

        <input
          name="price"
          type="number"
          placeholder="enter quiz price"
          defaultValue={0}
          {...register("price")}
          className={errors.price ? classes.isInvalid : ""}
        />
        {/* error handler for quiz price */}
        {errors.price && <span style={{ color: "red" }}>*</span>}

        <input
          name="img"
          type="file"
          {...register("img")}
          className={`${classes.fileInput} ${
            errors.name ? classes.isInvalid : ""
          }`}
        />
        {/* error handler for quiz image */}
        {errors.img && <span style={{ color: "red" }}>*</span>}

        <input
          className="buttons"
          style={{ width: "10rem", marginLeft: "27rem" }}
          disabled={loading}
          type="submit"
        ></input>
      </form>
    </div>
  );
};

export default CreateQuiz;
