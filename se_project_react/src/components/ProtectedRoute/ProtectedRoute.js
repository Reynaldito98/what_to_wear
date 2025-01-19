import React from 'react';
import './ProtectedRoute.css';
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ children, loggedIn, ...props }) {
    return (
      <Route {...props}>
        {loggedIn ? children : <Redirect to={"/"} />}
      </Route>
    );
  }
  
  export default ProtectedRoute;