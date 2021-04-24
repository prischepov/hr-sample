import { SyntheticEvent, useState } from "react";
import { Button, Item, Segment } from "semantic-ui-react"
import { Vacancy } from "../../models/Vacancy"

interface Props {
    vacancies: Vacancy[];
    isSubmitting: boolean;
    handleSelectVacancy: (vacancyId: string) => void;
    handleTurnEditModeOn: (vacancyId: string | undefined) => void;
    handleVacancyRemoval: (vacancyId: string) => void;
}

export default function VacanciesList({vacancies, isSubmitting,
        handleSelectVacancy, handleTurnEditModeOn, handleVacancyRemoval}: Props) {

    const [vacancyIdToBeDeleted, setVacancyIdToBeDeleted] = useState<string>("");

    function handleDeleteButtonClick(e: SyntheticEvent<HTMLButtonElement>, vacancyId: string) {
        setVacancyIdToBeDeleted(e.currentTarget.name);
        handleVacancyRemoval(vacancyId);
    }

    if(!vacancies.length) {
        return (
            <Segment>
                No vacancies found
            </Segment>
        )
    }
    
    return (
        <Segment>
            <Item.Group divided>
                {vacancies.map((vacancy: Vacancy, index: number) => {
                    return <Item key={index}>
                        <Item.Image size="tiny" src={`../../assets/${vacancy.position}.png`} />
                         <Item.Content>
                            <Item.Header as="a" onClick={() => handleSelectVacancy(vacancy.id)}>
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
                                    loading={isSubmitting && vacancyIdToBeDeleted === vacancy.id}
                                    onClick={ (e)=>{handleDeleteButtonClick(e, vacancy.id)} }/>
                                <Button floated="right" color="grey" onClick={()=>{handleTurnEditModeOn(vacancy.id)}}>Edit</Button>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                })}
        </Item.Group>
      </Segment>
    )
}
