import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import { Button, Container, Segment } from 'semantic-ui-react';
import EmployerNavBar from '../EmployerNavBar';
import PersonnelDashboard from './PersonnelDashboard';
import VacancyForm from '../vacancies/VacancyForm';

export default function PersonnelPage() {

    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        axios.get('https://hr-sample-b3c2d-default-rtdb.firebaseio.com/employees.json')
            .then(response => {
                console.log(response.data);
                setEmployees(response.data);
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
            <PersonnelDashboard employees={employees}/>
            <VacancyForm/>
        </Fragment>
)}