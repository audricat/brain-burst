import LandingForm from "../components/LandingForm";

import LogoWithTitle from "../assets/LogoWithTitle.png";
const LandingPage = () => {
  return (
    <div className="landing-card">
      <ul className="landing-card-wrapper">
        <li id="landing-greetings">
          <h1>WELCOME TO</h1>
        </li>
        <li id="banner">
          <img src={LogoWithTitle} alt="logo-with-name" id="banner-image" />
        </li>
        <li>
          <LandingForm />
        </li>
      </ul>
    </div>
  );
};

export default LandingPage;
