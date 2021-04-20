import { Employee } from '../../models/Employee'
import PersonnelList from './PersonnelList'

interface Props {
    employees: Employee[];
}

export default function PersonnelDashboard({employees} : Props) {
    return (
        <PersonnelList employees={employees}/>
    )
}
