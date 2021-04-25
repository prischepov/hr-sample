import { observer } from "mobx-react-lite";
import { SyntheticEvent, useState } from "react";
import { Button, Item, Segment } from "semantic-ui-react"
import { Vacancy } from "../../models/Vacancy"
import { useStore } from "../../stores/store";

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
        <Segment>
            <Item.Group divided>
                {vacanciesStore.vacancies.map((vacancy: Vacancy, index: number) => {
                    return <Item key={index}>
                        <Item.Image size="tiny" src={`../../assets/${vacancy.position}.png`} />
                         <Item.Content>
                            <Item.Header as="a" onClick={() => vacanciesStore.setSelectedVacancy(vacancy.id)}>
                                {vacancy.position}
                            </Item.Header>
                            <Item.Description>
                                <div>{vacancy.scheduleDays}</div>
                                <div>{vacancy.scheduleShifts}</div>
                                <div>{vacancy.quantity}</div>
                                <div>{vacancy.comment}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button floated="right" color="red" 
                                    content="Delete"
                                    name={vacancy.id}
                                    loading={vacanciesStore.isSubmitting && vacancyIdToBeDeleted === vacancy.id}
                                    onClick={ (e) => {handleDeleteButtonClick(e, vacancy.id)} }/>
                                <Button floated="right" color="grey" onClick={()=>{vacanciesStore.openForm(vacancy.id)}}>Edit</Button>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                })}
        </Item.Group>
      </Segment>
    )
})