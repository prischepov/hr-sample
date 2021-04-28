import { Route } from 'react-router';
import BaseLayout from './layout/BaseLayout';
import { RouteComponentProps, Switch } from 'react-router-dom';
import routes from '../config/routes';
import AuthRoute from './main/AuthRoute';

export default function App() {
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
}