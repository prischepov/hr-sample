import { Fragment, useEffect, useState } from 'react';
import EmployerNavBar from '../EmployerNavBar';
import VacanciesDashboard from './VacanciesDashboard';
import VacancyForm from './VacancyForm';
import { Vacancy } from '../../models/Vacancy'
import VacancyDetails from './VacancyDetails';
import client from '../../common/api/client';
import LoadingIndicator from '../../common/layout/LoadingIndicator';

export default function VacanciesPage() {

    const [vacancies, setVacancies] = useState<Vacancy[]>([]);
    const [selectedVacancy, setSelectedVacancy] = useState<Vacancy | undefined>(undefined);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    useEffect(() => {
        client.Vacancies.list().then(response => {
                setVacancies(response);
                setIsLoading(false);
            });
    }, []);

    function handleSelectVacancy(vacancyId: string) {
        setSelectedVacancy(vacancies.find(item => item.id === vacancyId));
    }

    function handleCancelVacancySelection() {
        setSelectedVacancy(undefined);
    }

    function handleTurnEditModeOn(vacancyId: string | undefined) {
        vacancyId ? handleSelectVacancy(vacancyId) : handleCancelVacancySelection();
        setIsEditMode(true);
    }

    function handleTurnEditModeOff() {
        handleCancelVacancySelection()
        setIsEditMode(false);
    }

    async function handleVacancyFormSubmission(vacancy: Vacancy) {
        setIsSubmitting(true);
        if(vacancy.id) {    
            await client.Vacancies.update(vacancy);
            setVacancies([...vacancies.filter(item => item.id !== vacancy.id), vacancy]);
        } else {
            vacancy.isClosed = false;
            vacancy.publishedTimestamp = new Date();
            await client.Vacancies.create(vacancy);
            setVacancies([...vacancies, vacancy]);
        }
        setIsSubmitting(false);
        setIsEditMode(false);
        setSelectedVacancy(vacancy);
    }

    async function handleVacancyRemoval(vacancyId: string) {
        setIsSubmitting(true);
        await client.Vacancies.delete(vacancyId);
        setVacancies(vacancies.filter(item => item.id !== vacancyId));
        setIsSubmitting(false);
    }

    if(isLoading) {
        return <LoadingIndicator text="Loading..."/>
    }

    return (
        <Fragment>
            <EmployerNavBar/>

            <VacanciesDashboard 
                vacancies={vacancies}
                selectedVacancy={selectedVacancy}
                isEditMode={isEditMode}
                isSubmitting={isSubmitting}
                handleSelectVacancy={handleSelectVacancy}
                handleTurnEditModeOn={handleTurnEditModeOn}
                handleVacancyRemoval={handleVacancyRemoval}/>

            { selectedVacancy && !isEditMode
                && <VacancyDetails 
                        vacancy = {selectedVacancy}
                        handleCancelVacancySelection={handleCancelVacancySelection}/>
            }

            { isEditMode 
                && <VacancyForm selectedVacancy={selectedVacancy} 
                        isSubmitting={isSubmitting}
                        handleTurnEditModeOff={handleTurnEditModeOff} 
                        handleVacancyFormSubmission={handleVacancyFormSubmission}/> 
            }
        </Fragment>
    )
}