import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import userProfile from "../../assets/profile-user.png";
import UserModal from "../../UserModal/UserModal";

const Nav = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <nav className="navbar">
      <div className="container-fluid">
        <Link className="navbar-brand logo" to="/">
          Quizzical
        </Link>
        {currentUser ? (
          <>
            <img
              style={{ width: "50px", borderRadius: "40px", cursor: "pointer" }}
              src={
                currentUser.photoURL ? `${currentUser.photoURL}` : userProfile
              }
              referrerPolicy="no-referrer"
              alt="user profile"
              onClick={openModal}
            />
          </>
        ) : (
          <button className="buttons" onClick={() => navigate("/validation")}>
            sign up
          </button>
        )}
      </div>
      {modalIsOpen && (
        <UserModal
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          name={currentUser.displayName}
          email={currentUser.email}
        />
      )}
    </nav>
  );
};

export default Nav;
