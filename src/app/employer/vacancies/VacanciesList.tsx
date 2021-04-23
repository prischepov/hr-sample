import { Button, Item, Segment } from "semantic-ui-react"
import { Vacancy } from "../../models/Vacancy"

interface Props {
    vacancies: Vacancy[];
    handleSelectVacancy: (vacancyId: string) => void;
    handleTurnEditModeOn: (vacancyId: string | undefined) => void;
    handleVacancyRemoval: (vacancyId: string) => void;
}

export default function VacanciesList({vacancies, handleSelectVacancy, handleTurnEditModeOn, handleVacancyRemoval}: Props) {
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
                                <Button floated="right" color="red" onClick={()=>{handleVacancyRemoval(vacancy.id)}}>Delete</Button>
                                <Button floated="right" color="grey" onClick={()=>{handleTurnEditModeOn(vacancy.id)}}>Edit</Button>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                })}
        </Item.Group>
      </Segment>
    )
}
