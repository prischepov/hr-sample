import MainPage from "../common/main/MainPage";
import PersonnelPage from "../employer/personnel/PersonnelPage";
import VacanciesPage from "../employer/vacancies/VacanciesPage";
import VacancyDetails from "../employer/vacancies/VacancyDetails";
import VacancyForm from "../employer/vacancies/VacancyForm";
import RecruiterHomePage from "../recruiter/home/RecruiterHomePage";

export interface IRoute {
    path: string | string[];
    exact: boolean;
    component: any;
    name: string;
    protected: boolean;
}

// TODO: use this single routes collection all over the app
const routes: IRoute[] = [
    {
        path: '/',
        exact: true,
        component: MainPage,
        name: 'Main Page',
        protected: false
    },
    {
        path: "/employer/personnel",
        exact: true,
        component: PersonnelPage,
        name: 'Personnel',
        protected: true
    },
    {
        path: '/employer/vacancies',
        exact: true,
        component: VacanciesPage,
        name: 'Vacancies',
        protected: true
    },
    {
        path: '/employer/vacancies/view/:id',
        exact: true,
        component: VacancyDetails,
        name: 'Vacancy details',
        protected: true
    },
    {
        path: ['/employer/vacancies/create', '/employer/vacancies/edit/:id'],
        exact: true,
        component: VacancyForm,
        name: 'Vacancy form',
        protected: true
    },
    {
        path: '/recruiter/home',
        exact: true,
        component: RecruiterHomePage,
        name: 'Recruiter HomePage',
        protected: true
    }
];

export default routes;