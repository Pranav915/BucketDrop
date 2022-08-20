import React, { useState, useEffect } from "react";
import { validateLoginForm } from "../../shared/utils/validators";
import { getActions } from "../../app/actions/authActions";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ login }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(validateLoginForm({ email, password }));
  }, [email, password, setIsFormValid]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    const userDetails = {
      email,
      password,
    };

    login(userDetails, navigate);
  };

  return (
    <div className="h-screen bg-gradient-to-r from-cyan-500 to-purple-500 pt-28 px-1">
      <div className="flex">
        <div className="flex-col flex ml-auto mr-auto items-center w-full lg:w-2/3 md:w-3/5 sm:w-2/3">
          <h1 className="font-bold my-10 text-white lg:text-3xl md:text-3xl sm:text-2xl">
            {" "}
            Please Login to Continue{" "}
          </h1>
          <div className="mt-2 flex flex-col lg:w-1/2 w-8/12">
            <div className="flex flex-wrap w-full relative h-15 bg-white items-center rounded mb-6 pr-10">
              <div className="flex -mr-px justify-center w-15 p-4">
                <span className="flex items-center leading-normal bg-white px-3 border-0 rounded rounded-r-none text-2xl text-gray-600">
                  <i className="fas fa-envelope"></i>
                </span>
              </div>
              <input
                type="email"
                className="flex-shrink flex-grow flex-auto leading-normal w-px border-0 h-10 border-grey-light rounded rounded-l-none px-3 self-center relative  font-roboto lg:text-2xl md:text-2xl sm:text-xl outline-none"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="flex flex-wrap w-full relative h-15 bg-white items-center rounded mb-6 pr-10">
              <div className="flex -mr-px justify-center w-15 p-4">
                <span className="flex items-center leading-normal bg-white px-3 border-0 rounded rounded-r-none text-2xl text-gray-600">
                  <i className="fas fa-lock"></i>
                </span>
              </div>
              <input
                type="password"
                className="flex-shrink flex-grow flex-auto leading-normal w-px border-0 h-10 border-grey-light rounded rounded-l-none px-3 self-center relative  font-roboto lg:text-2xl md:text-2xl sm:text-xl outline-none"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <a
              href="/register"
              className="text-base text-white text-right font-roboto leading-normal hover:underline mb-6"
            >
              Create new account
            </a>
            <button
              disabled={!isFormValid}
              className="bg-blue-600 py-4 text-center px-17 md:px-12 md:py-4 text-white rounded leading-tight text-xl md:text-base sm:text-l font-sans mt-4 mb-20 hover:bg-blue-400"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};
export default connect(null, mapActionsToProps)(LoginPage);
