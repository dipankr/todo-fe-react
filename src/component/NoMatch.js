import {useNavigate} from "react-router-dom";

const NoMatch = () => {
  const navigate = useNavigate();
  return (
      <div className="not-found-div">
        <h1>Page not found</h1>
        <h1>Go <span onClick={() => navigate('/', {replace: true})}
                     style={{
                       cursor: "pointer",
                       textDecoration: "underline"
                     }}>Home</span>
        </h1>
      </div>
  );
}

export default NoMatch;