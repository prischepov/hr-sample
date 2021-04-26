import { Fragment } from 'react';
import { Route } from 'react-router';
import BaseLayout from './layout/BaseLayout';
import MainPage from './main/MainPage';
import PersonnelPage from '../employer/personnel/PersonnelPage';
import RecruiterHomePage from '../recruiter/home/RecruiterHomePage';
import VacanciesPage from '../employer/vacancies/VacanciesPage';
import VacancyForm from '../employer/vacancies/VacancyForm';
import VacancyDetails from '../employer/vacancies/VacancyDetails';

function App() {
  return (
    <Fragment>
      <BaseLayout>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/employer/personnel" component={PersonnelPage} />
        <Route exact path="/employer/vacancies" component={VacanciesPage} />
        <Route exact path="/employer/vacancies/view/:id" component={VacancyDetails} />
        <Route exact path={["/employer/vacancies/create", "/employer/vacancies/edit/:id"]} component={VacancyForm} />
        <Route exact path="/recruiter/home" component={RecruiterHomePage} />
      </BaseLayout>
    </Fragment>
  );
}

export default App;
