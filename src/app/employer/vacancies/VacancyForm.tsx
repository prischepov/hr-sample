import { ChangeEvent, SyntheticEvent, useState } from "react";
import { Button, Form, FormInput, FormSelect, Header, Segment } from "semantic-ui-react";
import { POSITION_OPTIONS, SCHEDULE_DAYS_OPTIONS, SCHEDULE_SHIFT_OPTIONS as SCHEDULE_WORK_SHIFTS} from '../../models/Enums'
import { Vacancy } from "../../models/Vacancy";

interface Props {
    selectedVacancy: Vacancy | undefined;
    isSubmitting: boolean;
    handleTurnEditModeOff: () => void;
    handleVacancyFormSubmission: (Vacancy: Vacancy) => void;
}

export default function VacancyForm({selectedVacancy, isSubmitting, 
        handleTurnEditModeOff, handleVacancyFormSubmission}: Props) {

    const initialState = selectedVacancy ?? {} as Vacancy;
    const [vacancy, setVacancy] = useState(initialState);

    function handleSubmit() {
        handleVacancyFormSubmission(vacancy);
    }

    function handleSelectionChange(_event: SyntheticEvent<HTMLElement>, data: any) {
        setVacancy({...vacancy, [data.name]:data.value});
    }

    function handleInputChange(_event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, data: any) {
        setVacancy({...vacancy, [data.name]:data.value});
    }
    
    return (
        <Segment>
            <Form onSubmit={handleSubmit} autoComplete="off">
                <Header>Add vacancy</Header>
                <FormSelect inline placeholder="Position" selection options={POSITION_OPTIONS} 
                    value={vacancy.position} name="position" onChange={handleSelectionChange}/>
                <Form.Group inline>
                    <FormSelect inline placeholder="Schedule" selection options={SCHEDULE_DAYS_OPTIONS}  
                        value={vacancy.scheduleDays} name="scheduleDays" onChange={handleSelectionChange}/>
                    <FormSelect inline placeholder="Working shift" selection options={SCHEDULE_WORK_SHIFTS}  
                        value={vacancy.scheduleShifts} name="scheduleShifts" onChange={handleSelectionChange}/>
                </Form.Group>
                <FormInput inline placeholder="Quantity" type="number"
                    value={vacancy.quantity} name="quantity" onChange={handleInputChange}/>
                <Form.TextArea placeholder='Comment' value={vacancy.comment} name="comment" onChange={handleInputChange}/>
                <Button positive loading={isSubmitting} floated="right" type="submit">{vacancy.id ? "Save" : "Publish"}</Button> 
                <Button floated="right" type="button" onClick={handleTurnEditModeOff}>Cancel</Button> 
            </Form>
        </Segment>
    )
}
