import { useState } from "react";
import { CgMenuLeft } from "react-icons/cg";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import userProfile from "../../assets/profile-user.png";
import UserModal from "../../UserModal/UserModal";

const Header = () => {
  const { currentUser } = useAuth();
  const [modalIsOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const addresses = location.pathname.split("/");

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  const toggleClass = () => {
    document.getElementById("wrapper").classList.toggle("toggled");
  };
  return (
    <nav className="navbar py-4 px-4">
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          <CgMenuLeft
            id="menu-toggle"
            onClick={toggleClass}
            style={{ color: "#15d381", fontSize: "2rem", marginRight: "1rem" }}
          />
          <h2 className="fs-2 m-0">
            {addresses[addresses.length - 1].toUpperCase()}
          </h2>
        </div>
        <img
          style={{ width: "50px", borderRadius: "40px", cursor: "pointer" }}
          src={currentUser.photoURL ? `${currentUser.photoURL}` : userProfile}
          referrerPolicy="no-referrer"
          alt="user profile"
          onClick={openModal}
        />
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

export default Header;
