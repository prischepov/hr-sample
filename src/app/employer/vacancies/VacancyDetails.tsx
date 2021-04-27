import { observer } from 'mobx-react-lite';
import { Fragment, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Card, Container, Image } from 'semantic-ui-react'
import LoadingIndicator from '../../common/layout/LoadingIndicator';
import { Vacancy } from '../../models/Vacancy';
import { useStore } from '../../stores/store'
import EmployerNavBar from '../EmployerNavBar';

export default observer (function VacancyDetails() {

    const {vacanciesStore} = useStore();
    const initialState = {} as Vacancy;
    const [vacancy, setVacancy] = useState(initialState);
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if(id) {
            vacanciesStore.loadVacancy(id).then((vacancy) => {
                setVacancy(vacancy!);
            });
        }
    }, [id, vacanciesStore.loadVacancy]);

    if(vacanciesStore.isLoading || !vacancy) return <LoadingIndicator />;

    return (
        <Fragment>
            <EmployerNavBar/>
            
            <Container>
                <Card>
                    <Card.Content>
                        <Image size="tiny" src={`${window.location.origin}/assets/${vacancy.position}.png`} />
                        <Card.Header>
                            {vacancy.position}
                        </Card.Header>
                        <Card.Meta>
                            { vacancy.isClosed 
                                ? `closed ${vacancy.closedTimestamp}` 
                                : `published ${vacancy.publishedTimestamp}` }
                        </Card.Meta>
                        <Card.Description>{vacancy.comment}</Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <Button 
                            content="Back to list"
                            as={Link} to="/employer/vacancies"
                            basic color='grey' 
                            />
                    </Card.Content>
                </Card>
            </Container>
        </Fragment>
    )
})
