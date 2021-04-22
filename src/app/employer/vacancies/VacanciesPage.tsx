import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import { Button, Container } from 'semantic-ui-react';
import EmployerNavBar from '../EmployerNavBar';
import VacanciesDashboard from './VacanciesDashboard';
import VacancyForm from './VacancyForm';
import { Vacancy } from '../../models/Vacancy'
import VacancyDetails from './VacancyDetails';

export default function VacanciesPage() {

    const [vacancies, setVacancies] = useState<Vacancy[]>([]);
    const [selectedVacancy, setSelectedVacancy] = useState<Vacancy | undefined>(undefined);
    const [editMode, setEditMode] = useState<boolean>(false);

    useEffect(() => {
        axios.get('https://hr-sample-b3c2d-default-rtdb.firebaseio.com/vacancies.json')
            .then(response => {
                console.log(response.data);
                setVacancies(response.data);
            })
    }, []);

    function handleSelectVacancy(id: string) {
        setSelectedVacancy(vacancies.find(item => item.id === id));
    }

    function handleCancelSelection() {
        setSelectedVacancy(undefined);
    }

    return (
        <Fragment>
            <EmployerNavBar/>

            <VacanciesDashboard 
                vacancies={vacancies}
                selectedVacancy={selectedVacancy}
                handleSelectVacancy={handleSelectVacancy}/>

            {selectedVacancy 
                && <VacancyDetails 
                    vacancy = {selectedVacancy}
                    handleCancelSelection={handleCancelSelection}/>}

            <VacancyForm/>
        </Fragment>
    )
}