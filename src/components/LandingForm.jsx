import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { UserAUth } from "../context/UserContext";
import SoundContext from "../context/SoundContext";

const LandingForm = () => {
  const { setUser } = UserAUth();
  const {isPlaying, playMusic} = useContext(SoundContext)
  const [fullName, setFullName] = useState({
    fName: "",
    lName: "",
  });

  const validation = yup.object().shape({
    fName: yup
      .string()
      .typeError("Please enter your First Name.")
      .required("THIS INPUT FIELD IS REQUIRED")
      .min(1, "First Name must be atleast 1 character.")
      .max(50, "First Name must be no longer than 50 characters."),
    lName: yup
      .string()
      .typeError("Please enter your Last Name.")
      .required("THIS INPUT FIELD IS REQUIRED")
      .min(1, "Last Name must be atleast 1 character.")
      .max(50, "Last Name must be no longer than 50 characters."),
  });

  const {
    register,
    handleSubmit,

    formState: { errors, isDirty, isValid },
  } = useForm({
    resolver: yupResolver(validation),
    mode: "onChange",
  });

  const onChangeName = (e) => {
    var targetName = e.target.name;
    var targetValue = e.target.value;
    const textRegex = /[^a-z, ]/gi;

    if (targetValue.startsWith(" ")) {
      return null;
    } else {
      targetValue = targetValue.replace(textRegex, "").toUpperCase();
    }

    setFullName((prevState) => ({
      ...prevState,
      [targetName]: targetValue,
    }));
  };

  const onSubmitForm = () => {
    setUser((prev) => ({
      ...prev,
      firstName: fullName.fName,
      lastName: fullName.lName,
      isLoggedIn: true,
    }));
     if(!isPlaying){
      playMusic()
     }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="landing-form">
      <ul className="landing-form-wrapper">
        <li id="form-li-a">
          <span className="input-label">FIRST NAME</span>
          <input
            type="text"
            inputMode="text"
            name="fName"
            className="form-inputs"
            value={fullName.fName}
            placeholder="ENTER YOUR FIRST NAME"
            autoComplete="off"
            minLength={1}
            maxLength={50}
            {...register("fName", {
              onChange: onChangeName,
            })}
          />
          <small className="input-error-message">
          {errors.fName?.message ? errors.fName?.message : <span className="hidden-error-message">THIS INPUT FIELD IS REQUIRED</span> }
          </small>
        </li>


        <li id="form-li-b">
          <span className="input-label">LAST NAME</span>
          <input
            type="text"
            inputMode="text"
            name="lName"
            className="form-inputs"
            value={fullName.lName}
            placeholder="ENTER YOUR LAST NAME"
            autoComplete="off"
            minLength={1}
            maxLength={50}
            {...register("lName", {
              onChange: onChangeName,
            })}
          />
          <small className="input-error-message">
          {errors.lName?.message ? errors.lName?.message :<span className="hidden-error-message">THIS INPUT FIELD IS REQUIRED</span> }
          </small>
        </li>

        <li id="form-li-c">
          <button
            type="submit"
            className="global-button"
            disabled={!isDirty || !isValid}
            id={!isDirty || !isValid ? "enabled" : "disabled" }
          >
            <span className="global-button-span">START QUIZ</span>
          </button>
        </li>
      </ul>
    </form>
  );
};

export default LandingForm;
