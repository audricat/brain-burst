import { useNavigate } from "react-router-dom";
const PageNotFound = () => {
  const navigate = useNavigate()
  const handleGoBack = ()=>{
    navigate(-1)
  }


  return (
    <div className="not-found-page-container">
      <span>Page Not Found</span>
      <button onClick={handleGoBack} >Go back </button>
     
    </div>
  );
};

export default PageNotFound;
