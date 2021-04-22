import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import { Button, Container } from 'semantic-ui-react';
import EmployerNavBar from '../EmployerNavBar';
import VacanciesDashboard from './VacanciesDashboard';
import VacancyForm from './VacancyForm';

export default function VacanciesPage() {

    const [vacancies, setVacancies] = useState([]);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        axios.get('https://hr-sample-b3c2d-default-rtdb.firebaseio.com/vacancies.json')
            .then(response => {
                console.log(response.data);
                setVacancies(response.data);
            })
    }, []);

    return (
        <Fragment>
            <EmployerNavBar/>
            <Container>
                <Button positive floated="right">
                    Add vacancy
                </Button>
            </Container>
            <VacanciesDashboard vacancies={vacancies}/>
            <VacancyForm/>
        </Fragment>
)}