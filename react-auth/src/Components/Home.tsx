import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";



const Home: FC<{}> = (): JSX.Element => {

  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  
  return (
    <>
      <div className="d-flex justify-content-between">
        <div>
          <h3 className="m-3">Home</h3>
        </div>
        <div>
          <button type="submit" className="butn" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
      <div className="container">
        <div
          className="row d-flex justify-content-center align-items-center text-center"
          style={{ height: "100vh" }}
        >
          <p className="muted display-6">Hello</p>
        </div>
      </div>
    </>
  );
};

export default Home;
