import React, { Fragment } from 'react'
import { Container, Button } from 'semantic-ui-react'
import { Vacancy } from '../../models/Vacancy'
import VacanciesList from './VacanciesList'

interface Props {
    vacancies: Vacancy[];
    selectedVacancy: Vacancy | undefined;
    handleSelectVacancy: (id: string) => void;
}

export default function VacanciesDashboard({vacancies, selectedVacancy, handleSelectVacancy} : Props) {
    return (
        <Fragment>
            <Container>
                <Button positive floated="right">
                    Add vacancy
                </Button>
            </Container>
            { !selectedVacancy 
                && <VacanciesList 
                vacancies={vacancies}
                handleSelectVacancy={handleSelectVacancy}/> }
        </Fragment>

    )
}
