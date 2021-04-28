  
import { observer } from 'mobx-react-lite';
import { Fragment, ReactNode } from 'react';
import { Redirect } from 'react-router-dom';
import { useStore } from '../../stores/store';

export interface IAuthRouteProps { }

interface Props {
    children: ReactNode
}

export default observer(function AuthRoute({children} : Props) {

    const {userStore} = useStore();

    if (!userStore.loggedInUser)
    {
        return <Redirect to="/" />;
    }
    return (
        <Fragment>{children}</Fragment>
    );
})