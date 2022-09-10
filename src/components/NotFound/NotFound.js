import { Link } from "react-router-dom";
import notFound from "../assets/notFound.jpg";
import classes from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={`py-5 ${classes.notFound}`}>
      <Link
        to="/"
        className="buttons"
        style={{
          textDecoration: "none",
          margin: "3rem auto",
          display: "block",
          width: "10rem",
          overflow: "hidden",
        }}
      >
        ← go back
      </Link>
      <img src={notFound} alt="404" />
    </div>
  );
};

export default NotFound;
