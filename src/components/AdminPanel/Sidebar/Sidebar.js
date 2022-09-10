import { AiFillHome, AiFillSetting } from "react-icons/ai";
import { FaUserPlus } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import { IoIosCreate } from "react-icons/io";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const iconStyle = {
    fontSize: "1.2rem",
    marginBottom: "6px",
    marginRight: "4px",
  };
  return (
    <div className="bg-white" id="sidebar-wrapper">
      <div className="sidebar-heading text-center py-4 fs-2 border-bottom">
        <Link to="/" className="logo">
          Quizzical
        </Link>
      </div>
      <div className="list-group list-group-flush my-3">
        <Link
          to=""
          className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
        >
          <AiFillHome style={iconStyle} />
          Dashboard
        </Link>
        <Link
          to="create-quiz"
          className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
        >
          <IoIosCreate style={iconStyle} />
          Create Quiz
        </Link>
        <Link
          to="upload-quiz"
          className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
        >
          <FiUpload style={iconStyle} />
          Upload Quiz
        </Link>
        <Link
          to="manage-quizzes"
          className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
        >
          <AiFillSetting style={iconStyle} />
          Manage Quizzes
        </Link>
        <Link
          to="make-admin"
          className="list-group-item list-group-item-action bg-transparent second-text fw-bold"
        >
          <FaUserPlus style={iconStyle} />
          Make admin
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
