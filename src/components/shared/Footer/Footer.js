import browserLogo from "../../assets/browser.png";
import facebookLogo from "../../assets/facebook.png";
import githubLogo from "../../assets/github.png";
import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={`pt-5 pb-3 ${classes.footerBody}`}>
      {/* <Timer initialMinute={1} initialSeconds={1} /> */}
      <ul className={classes.socialLinkContainer}>
        <li className={classes.socialLink}>
          <a
            href="https://www.facebook.com/tusher.das.7355/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={facebookLogo} alt="" />
          </a>
        </li>
        <li className={classes.socialLink}>
          <a
            href="https://github.com/Tusher-ajoy"
            target="_blank"
            rel="noreferrer"
          >
            <img src={githubLogo} alt="" />
          </a>
        </li>
        <li className={classes.socialLink}>
          <a
            href="https://dazzling-otter-bc87e8.netlify.app/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={browserLogo} alt="" />
          </a>
        </li>
      </ul>
      <small>
        {new Date().getFullYear()} Copyright © Quizzical. All rights reserved.
      </small>
    </footer>
  );
};

export default Footer;
