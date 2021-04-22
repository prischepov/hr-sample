import { Button, Form, FormInput, FormSelect, Header, Segment } from "semantic-ui-react";
import { POSITION_OPTIONS, SCHEDULE_DAYS_OPTIONS, SCHEDULE_SHIFT_OPTIONS as SCHEDULE_WORK_SHIFTS} from '../../models/Enums'
import { Vacancy } from "../../models/Vacancy";

interface Props {
    selectedVacancy: Vacancy | undefined;
    handleTurnEditModeOff: () => void;
}

export default function VacancyForm({selectedVacancy, handleTurnEditModeOff}: Props) {
    
    return (
        <Segment>
            <Form>
                <Header>Add vacancy</Header>
                <FormSelect inline placeholder='Position' selection options={POSITION_OPTIONS} />
                <Form.Group inline>
                    <FormSelect inline placeholder='Schedule' selection options={SCHEDULE_DAYS_OPTIONS} />
                    <FormSelect inline placeholder='Working shift' selection options={SCHEDULE_WORK_SHIFTS} />
                </Form.Group>
                <FormInput inline placeholder="Quantity"/>
                <Form.TextArea placeholder='Comment' />
                <Button positive floated="right" type="submit">Publish</Button> 
                <Button floated="right" type="button" onClick={handleTurnEditModeOff}>Cancel</Button> 
            </Form>
        </Segment>
    )
}
