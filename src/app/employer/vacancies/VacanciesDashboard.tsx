import { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { Container, Button } from 'semantic-ui-react'
import VacanciesList from './VacanciesList'

export default function VacanciesDashboard() {

    return (
        <Fragment>
                <Fragment>
                    <Container>
                        <Button content="Add vacancy"
                            as={Link} to="/employer/vacancies/create"
                            positive floated="right" />
                    </Container>
                    <VacanciesList />
                </Fragment>
        </Fragment>
    )
}
