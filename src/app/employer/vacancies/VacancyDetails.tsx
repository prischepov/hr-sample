import { observer } from 'mobx-react-lite';
import { Fragment, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Card, Container, Dropdown, Icon, Image, Label } from 'semantic-ui-react'
import LoadingIndicator from '../../common/layout/LoadingIndicator';
import { ClosureReason, CLOSURE_REASON_OPTIONS, ScheduleShifts } from '../../models/Enums';
import { Vacancy } from '../../models/Vacancy';
import { useStore } from '../../stores/store'
import EmployerNavBar from '../EmployerNavBar';

export default observer (function VacancyDetails() {

    const {vacanciesStore} = useStore();
    const initialState = {} as Vacancy;
    const [vacancy, setVacancy] = useState<Vacancy>(initialState);
    const {id} = useParams<{id: string}>();

    function handleVacancyClosure(reason: ClosureReason): void {
        vacanciesStore.closeVacancy(vacancy.id, reason).then((closedVacancy) => {
            if(closedVacancy){
                setVacancy(closedVacancy);
            }
        });
    }

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
                <Card fluid>
                    <Card.Content>
                        <Image size="tiny" src={`${window.location.origin}/assets/${vacancy.position}.png`} />
                        <Card.Header>
                            {vacancy.position}
                        </Card.Header>
                        <Card.Description>
                            <Label color={vacancy.isClosed ? 'red' : 'green'}>
                                <Icon name="clock" />
                                { vacancy.isClosed 
                                    ? `closed ${vacancy.closedTimestamp}` 
                                    : `published ${vacancy.publishedTimestamp}` }
                            </Label>
                            <div><Icon name="calendar" />{vacancy.scheduleDays}</div>
                            <div>
                                <Icon name={vacancy.scheduleShifts === ScheduleShifts.Day ? "sun" : "moon"}/>
                                {vacancy.scheduleShifts}
                            </div>
                            <div>{vacancy.quantity}</div>
                            <div>{vacancy.comment}</div>
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        {!vacancy.isClosed 
                            && <Dropdown text="Close"
                                className="button red"
                                style={{marginLeft: '10px', float: 'right'}}
                                loading={vacanciesStore.isSubmitting}>
                                     <Dropdown.Menu>
                                        {CLOSURE_REASON_OPTIONS.map((option) => {
                                            return <Dropdown.Item 
                                                        key={option.key}
                                                        text={option.text}
                                                        value={option.value}
                                                        onClick={() => handleVacancyClosure(option.value)}/>
                                        })}
                                     </Dropdown.Menu>
                                </Dropdown>
                        }
                        <Button 
                            content="Back to list"
                            as={Link} to="/employer/vacancies"
                            basic color="grey"
                            floated="right" 
                            />
                    </Card.Content>
                </Card>
            </Container>
        </Fragment>
    )
})

