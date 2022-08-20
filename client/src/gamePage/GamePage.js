import React, { useEffect } from "react";
import { logout } from "../shared/utils/auth";
import { connect } from "react-redux";
import { getActions } from "../app/actions/authActions";
import NavbarGamePage from "./AppBarGamePage";

const GamePage = ({ setUserDetails }) => {
  useEffect(() => {
    const userDetails = localStorage.getItem("user");
    if (!userDetails) {
      logout();
    } else {
      setUserDetails(JSON.parse(userDetails));
    }
  });

  return (
    <div>
      <NavbarGamePage />
    </div>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(null, mapActionsToProps)(GamePage);
