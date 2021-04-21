import React from "react";
import { Button, Form, FormInput, FormSelect, Header, Radio, Segment, TextArea } from "semantic-ui-react";
import { POSITIONS, SCHEDULE_DAYS, SCHEDULE_PART_OF_DAY as SCHEDULE_WORK_SHIFTS} from '../../models/Enums'

export default function VacancyForm() {
    
    return (
        <Segment>
            <Form>
                <Header>Add vacancy</Header>
                <FormSelect inline placeholder='Position' selection options={POSITIONS} />
                <Form.Group inline>
                    <FormSelect inline placeholder='Schedule' selection options={SCHEDULE_DAYS} />
                    <FormSelect inline placeholder='Working shift' selection options={SCHEDULE_WORK_SHIFTS} />
                </Form.Group>
                <FormInput inline placeholder="Quantity"/>
                <Form.TextArea placeholder='Comment' />
                <Button positive floated="right" type="submit">Publish</Button> 
                <Button floated="right" type="button">Cancel</Button> 
            </Form>
        </Segment>
    )
}
