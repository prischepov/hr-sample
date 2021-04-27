import { observer } from "mobx-react-lite";
import { ChangeEvent, Fragment, SyntheticEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Form, FormInput, FormSelect, Header, Segment } from "semantic-ui-react";
import LoadingIndicator from "../../common/layout/LoadingIndicator";
import { POSITION_OPTIONS, SCHEDULE_DAYS_OPTIONS, SCHEDULE_SHIFT_OPTIONS as SCHEDULE_WORK_SHIFTS} from '../../models/Enums'
import { Vacancy } from "../../models/Vacancy";
import { useStore } from "../../stores/store";
import EmployerNavBar from "../EmployerNavBar";

export default observer(function VacancyForm() {

    const history = useHistory();
    const {vacanciesStore} =  useStore();
    const {id} = useParams<{id: string}>();
    const {createVacancy, editVacancy, loadVacancy} = vacanciesStore;

    const initialState = {...{}, quantity: 0} as Vacancy;
    const [vacancy, setVacancy] = useState(initialState);

    useEffect(() => {
        if(id) {
            loadVacancy(id).then((vacancy) => {
                setVacancy(vacancy!);
            });
        }
    }, [id, loadVacancy])

    function handleSubmit() {
        if(vacancy.id) {
            editVacancy(vacancy).then(() => {
                history.push(`/employer/vacancies/view/${vacancy.id}`);
            });
        } else {
            createVacancy(vacancy).then(() => {
                history.push("/employer/vacancies");
            });
        }   
    }

    function handleSelectionChange(_event: SyntheticEvent<HTMLElement>, data: any) {
        setVacancy({...vacancy, [data.name]:data.value});
    }

    function handleInputChange(_event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, data: any) {
        setVacancy({...vacancy, [data.name]:data.value});
    }

    if(vacanciesStore.isLoading) {
        return <LoadingIndicator text="Loading vacancy..."/>
    }
    
    return (
        <Fragment>
            <EmployerNavBar/>

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
                    <Button positive loading={vacanciesStore.isSubmitting} floated="right" type="submit">{vacancy.id ? "Save" : "Publish"}</Button> 
                    <Button content="Cancel"
                        as={Link} to="/employer/vacancies" 
                        floated="right" type="button" />
                </Form>
            </Segment>
        </Fragment>
    )
})