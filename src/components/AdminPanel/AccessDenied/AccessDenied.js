import { Link } from "react-router-dom";
import classes from "./AccessDenied.module.css";
const AccessDenied = () => {
  return (
    <div className={classes.accessDenied}>
      <Link
        to="/"
        className="buttons"
        style={{ position: "absolute", top: "10rem", textDecoration: "none" }}
      >
        ← go back
      </Link>
    </div>
  );
};
export default AccessDenied;
