import { createContext, useEffect, useState, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const UserContext = createContext({});

export function UserProvider({ children }) {
  const initState = {
    firstName: "",
    lastName: "",
    isLoggedIn: false,
  };
  const [user, setUser] = useState(initState);

  const navigate = useNavigate();

  useEffect(() => {
    if (user.isLoggedIn) {
      localStorage.setItem("bbqa_user", JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("bbqa_user"));
    if (currentUser) {
      setUser(currentUser);
    }
  }, [setUser]);

  useEffect(() => {
    if (user.isLoggedIn) {
      navigate("/quiz", { replace: true });
    }
  }, [user, navigate]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
      <Outlet />
    </UserContext.Provider>
  );
}

export function UserAUth() {
  return useContext(UserContext);
}

UserProvider.propTypes = {
  children: PropTypes.node,
};
