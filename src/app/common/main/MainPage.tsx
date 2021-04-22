import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './MainPage.css';

const MainPage = () => (
    <Fragment>
        <Link to="/employer/personnel" className="main-page_item">Employer</Link>
        <Link to="/recruiter/home" className="main-page_item">Recruiter</Link>
    </Fragment>
)

export default MainPage