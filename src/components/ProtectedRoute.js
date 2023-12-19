import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute ({ element: Element, isLoggedIn, ...props }) {
    return isLoggedIn
        ? <Element {...props} />
        : <Navigate to="/sign-in" replace/>;
};

export default ProtectedRoute;
