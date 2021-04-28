import { observer } from "mobx-react-lite"
import { Fragment } from "react"
import { Button, Icon, Item, Label, Segment, SemanticCOLORS } from "semantic-ui-react"
import { Employee } from "../../models/Employee"
import { EmployeeStatus, ScheduleShifts } from "../../models/Enums"
import { useStore } from "../../stores/store"

export default observer(function PersonnelList() {

    const {personnelStore} = useStore();

    function resolveStatusLabelColor(status: EmployeeStatus): SemanticCOLORS {
        switch (status) {
            case EmployeeStatus.Joining:
                return "yellow";
            case EmployeeStatus.Leaving:
                    return "red";
            default:
                return "green";
        }
    }

    return (
        <Fragment>
            {personnelStore.employees.map((employee: Employee) => {
            return <Segment.Group key={employee.id}>
                <Segment>
                    <Item.Group>
                        <Item>
                            <Item.Image size="tiny" circular src={employee.photoURL} />
                            <Item.Content>
                                <Item.Header>{employee.fullName}</Item.Header>
                                <Item.Description>
                                    <Label color={resolveStatusLabelColor(employee.status)}>{employee.status}</Label>
                                </Item.Description>
                                <Item.Description>{employee.position}</Item.Description>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
                <Segment clearing>
                    <div>Working schedule:</div>
                    <span><Icon name="calendar" />{employee.scheduleDays}</span>
                    <span><Icon name={employee.scheduleShifts === ScheduleShifts.Day ? "sun" : "moon"}/>{employee.scheduleShifts}</span>
                    {employee.status === EmployeeStatus.Active && <Button floated="right" icon="close" content="Suspend" color="grey"/>}
                </Segment>
            </Segment.Group>
            })}
        </Fragment>
    )
})
