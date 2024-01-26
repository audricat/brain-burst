import { Outlet, useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { UserAUth } from "../context/UserContext";
import { useEffect } from "react";
import Swal from 'sweetalert2'
const PrivateRoute = () => {
  const { user } = UserAUth();
  const location = useLocation();
  useEffect(() => {
 
   
    window.addEventListener('beforeunload', alertWarning)
    window.addEventListener('unload', handleTabClosing)
    return () => {
        window.removeEventListener('beforeunload', alertWarning)
        window.removeEventListener('unload', handleTabClosing)
    }
})

const handleTabClosing = () => {
  const storageName = [ "users_answers","bbqa_user" , "instructions"];
      for (let store of storageName) {
        localStorage.removeItem(store);
      }
}

const alertWarning = (event) => {
  event.preventDefault()
  event.returnValue =""
}

  return user.isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
