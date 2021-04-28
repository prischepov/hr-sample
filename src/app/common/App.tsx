import { Route } from 'react-router';
import BaseLayout from './layout/BaseLayout';
import { RouteComponentProps, Switch } from 'react-router-dom';
import routes from '../config/routes';
import AuthRoute from './main/AuthRoute';

function App() {
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

    // <Fragment>
    //   <BaseLayout>
    //     <Route exact path="/" component={MainPage} />
    //     <Route exact path="/employer/personnel" component={PersonnelPage} />
    //     <Route exact path="/employer/vacancies" component={VacanciesPage} />
    //     <Route exact path="/employer/vacancies/view/:id" component={VacancyDetails} />
    //     <Route exact path={["/employer/vacancies/create", "/employer/vacancies/edit/:id"]} component={VacancyForm} />
    //     <Route exact path="/recruiter/home" component={RecruiterHomePage} />
    //   </BaseLayout>
    // </Fragment>
  );
}

export default App;
