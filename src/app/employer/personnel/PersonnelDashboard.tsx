import { Item } from 'semantic-ui-react'
import { Employee } from '../../models/Employee'

interface Props {
    employees: Employee[];
}

export default function PersonnelDashboard({employees} : Props) {
    return (
        <Item.Group>
            {employees.map((employee: Employee, index: number) => {
                return <Item key={index}>
                    <Item.Image size='small' src={employee.photoURL} />
                    <Item.Content>
                        <Item.Header>{employee.fullName}</Item.Header>
                        <Item.Description>
                            <div>{employee.position}</div>
                            <div>{employee.workSchedule}</div>
                            <div>{employee.status}</div>
                        </Item.Description>
                    </Item.Content>                    
                </Item>
            })}
      </Item.Group>
    )
}
