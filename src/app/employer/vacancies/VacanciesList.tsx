import { observer } from "mobx-react-lite";
import { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react"
import { ScheduleShifts } from "../../models/Enums";
import { Vacancy } from "../../models/Vacancy"
import { useStore } from "../../stores/store";
import VacancyTimestamp from "./VacancyTimestamp";

export default observer(function VacanciesList() {

    const {vacanciesStore} = useStore();
    const [vacancyIdToBeDeleted, setVacancyIdToBeDeleted] = useState<string>("");

    function handleDeleteButtonClick(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setVacancyIdToBeDeleted(e.currentTarget.name);
        vacanciesStore.deleteVacancy(id);
    }

    if(!vacanciesStore.vacancies.length) {
        return (
            <Segment>
                No vacancies found
            </Segment>
        )
    }
    
    return (
        <Segment clearing>
            <Item.Group divided>
                {vacanciesStore.vacancies.map((vacancy: Vacancy, index: number) => {
                    return <Item key={index}>
                        <Item.Image size="tiny" src={`${window.location.origin}/assets/${vacancy.position}.png`} />
                         <Item.Content>
                            <Item.Header as={Link} to={`/employer/vacancies/view/${vacancy.id}`} content={vacancy.position} />
                            <Item.Description>
                                <VacancyTimestamp vacancy={vacancy}/>
                                <div><Icon name="calendar" />{vacancy.scheduleDays}</div>
                                <div>
                                    <Icon name={vacancy.scheduleShifts === ScheduleShifts.Day ? "sun" : "moon"}/>
                                    {vacancy.scheduleShifts}
                                </div>
                                <div>{vacancy.quantity}</div>
                                <div>{vacancy.comment}</div>
                            </Item.Description>
                            {!vacancy.isClosed && <Item.Extra>
                                <Button floated="right" color="red" 
                                    content="Delete"
                                    name={vacancy.id}
                                    loading={vacanciesStore.isSubmitting && vacancyIdToBeDeleted === vacancy.id}
                                    onClick={ (e) => {handleDeleteButtonClick(e, vacancy.id)} }/>
                                <Button content="Edit"
                                    as={Link} to={`/employer/vacancies/edit/${vacancy.id}`}
                                    floated="right" color="grey" />
                            </Item.Extra>
                            }
                        </Item.Content>
                    </Item>
                })}
        </Item.Group>
      </Segment>
    )
})
