  
import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { firebaseAuth } from '../../config/firebase';

export interface IAuthRouteProps { }

const AuthRoute: React.FunctionComponent<IAuthRouteProps> = props => {
    const { children } = props;

    if (!firebaseAuth.currentUser)
    {
        return <Redirect to="/" />;
    }
    return (
        <Fragment>{children}</Fragment>
    );
}

export default AuthRoute;