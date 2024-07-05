import React from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import ConnectWalletPopup from "./popup/ConnectWalletPopup";

const Private = ({ component: Component, ...rest }) => {
  const { connected } = useSelector((state) => state.wallet);

  return (
    <Route
      {...rest}
      render={(props) =>
        connected ? <Component {...props} /> : <ConnectWalletPopup />
      }
    />
  );
};

export default Private;
