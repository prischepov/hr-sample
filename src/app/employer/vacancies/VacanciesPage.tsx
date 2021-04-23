import { Fragment, useEffect, useState } from 'react';
import EmployerNavBar from '../EmployerNavBar';
import VacanciesDashboard from './VacanciesDashboard';
import VacancyForm from './VacancyForm';
import { Vacancy } from '../../models/Vacancy'
import VacancyDetails from './VacancyDetails';
import {v4 as uuid} from 'uuid';
import client from '../../common/api/client';

export default function VacanciesPage() {

    const [vacancies, setVacancies] = useState<Vacancy[]>([]);
    const [selectedVacancy, setSelectedVacancy] = useState<Vacancy | undefined>(undefined);
    const [editMode, setEditMode] = useState<boolean>(false);

    useEffect(() => {
        client.Vacancies.list().then(response => {
                setVacancies(response);
            })
    }, []);

    function handleSelectVacancy(vacancyId: string) {
        setSelectedVacancy(vacancies.find(item => item.id === vacancyId));
    }

    function handleCancelVacancySelection() {
        setSelectedVacancy(undefined);
    }

    function handleTurnEditModeOn(vacancyId: string | undefined) {
        vacancyId ? handleSelectVacancy(vacancyId) : handleCancelVacancySelection();
        setEditMode(true);
    }

    function handleTurnEditModeOff() {
        handleCancelVacancySelection()
        setEditMode(false);
    }

    function handleVacancyFormSubmission(vacancy: Vacancy) {
        vacancy.id 
            ? setVacancies([...vacancies.filter(item => item.id !== vacancy.id), vacancy])
            : setVacancies([...vacancies, {...vacancy, id: uuid()}]);
        setEditMode(false);
        setSelectedVacancy(vacancy);
    }

    function handleVacancyRemoval(vacancyId: string) {
        setVacancies(vacancies.filter(item => item.id !== vacancyId));
    }

    return (
        <Fragment>
            <EmployerNavBar/>

            <VacanciesDashboard 
                vacancies={vacancies}
                selectedVacancy={selectedVacancy}
                editMode={editMode}
                handleSelectVacancy={handleSelectVacancy}
                handleTurnEditModeOn={handleTurnEditModeOn}
                handleVacancyRemoval={handleVacancyRemoval}/>

            { selectedVacancy && !editMode
                && <VacancyDetails 
                        vacancy = {selectedVacancy}
                        handleCancelVacancySelection={handleCancelVacancySelection}/>
            }

            { editMode 
                && <VacancyForm selectedVacancy={selectedVacancy} 
                        handleTurnEditModeOff={handleTurnEditModeOff} 
                        handleVacancyFormSubmission={handleVacancyFormSubmission}/> 
            }
        </Fragment>
    )
}