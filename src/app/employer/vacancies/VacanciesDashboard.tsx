import React, { Fragment } from 'react'
import { Container, Button } from 'semantic-ui-react'
import { Vacancy } from '../../models/Vacancy'
import VacanciesList from './VacanciesList'

interface Props {
    vacancies: Vacancy[];
    selectedVacancy: Vacancy | undefined;
    isEditMode: boolean;
    isSubmitting: boolean;
    handleSelectVacancy: (vacancyId: string) => void;
    handleTurnEditModeOn: (vacancyId: string | undefined) => void;
    handleVacancyRemoval: (vacancyId: string) => void;
}

export default function VacanciesDashboard({ vacancies, selectedVacancy, isEditMode, isSubmitting,
    handleSelectVacancy, handleTurnEditModeOn, handleVacancyRemoval }: Props) {
    return (
        <Fragment>
            { !selectedVacancy && !isEditMode && 
                <Fragment>
                    <Container>
                        <Button positive floated="right" onClick={() => { handleTurnEditModeOn(undefined); }}>
                            Add vacancy
                        </Button>
                    </Container>

                    <VacanciesList
                        vacancies={vacancies}
                        isSubmitting={isSubmitting}
                        handleSelectVacancy={handleSelectVacancy} 
                        handleTurnEditModeOn={handleTurnEditModeOn} 
                        handleVacancyRemoval={handleVacancyRemoval}/>
                </Fragment>
            }
        </Fragment>
    )
}
