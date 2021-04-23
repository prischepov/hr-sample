import React, { Fragment } from 'react'
import { Container, Button } from 'semantic-ui-react'
import { Vacancy } from '../../models/Vacancy'
import VacanciesList from './VacanciesList'

interface Props {
    vacancies: Vacancy[];
    selectedVacancy: Vacancy | undefined;
    editMode: boolean;
    handleSelectVacancy: (vacancyId: string) => void;
    handleTurnEditModeOn: (vacancyId: string | undefined) => void;
    handleVacancyRemoval: (vacancyId: string) => void;
}

export default function VacanciesDashboard({ vacancies, selectedVacancy, editMode, 
    handleSelectVacancy, handleTurnEditModeOn, handleVacancyRemoval }: Props) {
    return (
        <Fragment>
            { !selectedVacancy && !editMode && 
                <Fragment>
                    <Container>
                        <Button positive floated="right" onClick={() => { handleTurnEditModeOn(undefined); }}>
                            Add vacancy
                        </Button>
                    </Container>

                    <VacanciesList
                        vacancies={vacancies}
                        handleSelectVacancy={handleSelectVacancy} 
                        handleTurnEditModeOn={handleTurnEditModeOn} 
                        handleVacancyRemoval={handleVacancyRemoval}/>
                </Fragment>
            }
        </Fragment>
    )
}
