import React, { Fragment } from 'react'
import { Container, Button } from 'semantic-ui-react'
import { useStore } from '../../stores/store';
import VacanciesList from './VacanciesList'

export default function VacanciesDashboard() {

    const {vacanciesStore} = useStore();

    return (
        <Fragment>
            { !vacanciesStore.selectedVacancy && !vacanciesStore.isEditMode && 
                <Fragment>
                    <Container>
                        <Button positive floated="right" onClick={() => { vacanciesStore.openForm() }}>
                            Add vacancy
                        </Button>
                    </Container>

                    <VacanciesList />
                </Fragment>
            }
        </Fragment>
    )
}
