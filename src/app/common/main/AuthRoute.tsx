  
import { Fragment, ReactNode } from 'react';
import { Redirect } from 'react-router-dom';
import { firebaseAuth } from '../../config/firebase';

export interface IAuthRouteProps { }

interface Props {
    children: ReactNode
}

export default function AuthRoute({children} : Props) {

    if (!firebaseAuth.currentUser)
    {
        return <Redirect to="/" />;
    }
    return (
        <Fragment>{children}</Fragment>
    );
}