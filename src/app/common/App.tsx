import { Route } from 'react-router';
import BaseLayout from './layout/BaseLayout';
import { RouteComponentProps, Switch } from 'react-router-dom';
import routes from '../config/routes';
import AuthRoute from './main/AuthRoute';
import { useStore } from '../stores/store';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import LoadingIndicator from './layout/LoadingIndicator';

export default observer(function App() {
  const {userStore} = useStore();

  useEffect(() => {
    userStore.checkLoggedInState();
  }, [userStore])

  if(userStore.isLoading) {
    return <LoadingIndicator />
  }

  return (
    <BaseLayout>
        <Switch>
          {routes.map((route, index) => 
            <Route
                key={index}
                path={route.path} 
                exact={route.exact} 
                render={(routeProps: RouteComponentProps<any>) => {
                    if (route.protected) {
                        return <AuthRoute><route.component  {...routeProps} /></AuthRoute>;
                    }
                    return <route.component  {...routeProps} />;
                }}
            />)}
        </Switch>
      </BaseLayout>
  );
})