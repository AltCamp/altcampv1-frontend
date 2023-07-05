import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithubAlt,
  faGoogle,
  faFacebook,
  faTwitter,
  faLinkedin,
  faFacebookF,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { Facebook, Instagram, Twitch, Youtube } from "iconsax-react";
import altcamplogo from "../assets/general/AuthWhiteLogo.svg";
import mainFooterStyles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer>
      <div className={mainFooterStyles.mainFooter}>
        <div className={mainFooterStyles.footerHeader}>
          <img src={altcamplogo} alt="logo" />
          <div className={mainFooterStyles.smContainer}>
            <div className={mainFooterStyles.smLinkContainer}>
              <Youtube size="12" variant="Bold" />
            </div>
            <div className={mainFooterStyles.smLinkContainer}>
              <FontAwesomeIcon icon={faLinkedin} />
            </div>
            <div className={mainFooterStyles.smLinkContainer}>
              <FontAwesomeIcon icon={faFacebookF} />
            </div>
            <div className={mainFooterStyles.smLinkContainer}>
              <FontAwesomeIcon icon={faInstagram} />
            </div>
            <div className={mainFooterStyles.smLinkContainer}>
              <FontAwesomeIcon icon={faTwitter} />
            </div>
          </div>
          <p>© 2022 - 2023</p>
        </div>
        <div className={mainFooterStyles.mainFooterList}>
          <div className={mainFooterStyles.footerList}>
            {" "}
            <h3>Product</h3>
            <p>For AltSchoolers</p>
            <p>For Instructors</p>
            <p>For Mentors</p>
          </div>

          <div className={mainFooterStyles.footerList}>
            {" "}
            <h3>Features</h3>
            <p>Feature</p>
            <p>Feature</p>
            <p>Feature</p>
          </div>
          <div className={mainFooterStyles.footerList}>
            {" "}
            <h3>Company</h3>
            <p>Company</p>
            <p>Company</p>
            <p>Company</p>
          </div>
        </div>
      </div>
      <div className={mainFooterStyles.mobileContainer}>
        <div className={mainFooterStyles.mobile}>
          <div className={mainFooterStyles.smLinkContainer}>
            <Youtube size="12" variant="Bold" />
          </div>
          <div className={mainFooterStyles.smLinkContainer}>
            <FontAwesomeIcon icon={faLinkedin} />
          </div>
          <div className={mainFooterStyles.smLinkContainer}>
            <FontAwesomeIcon icon={faFacebookF} />
          </div>
          <div className={mainFooterStyles.smLinkContainer}>
            <FontAwesomeIcon icon={faInstagram} />
          </div>
          <div className={mainFooterStyles.smLinkContainer}>
            <FontAwesomeIcon icon={faTwitter} />
          </div>
        </div>
        <p>© 2022 - 2023</p>
      </div>
    </footer>
  );
};

export default Footer;
