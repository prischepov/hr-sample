import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import { Employee } from '../../models/Employee';
import { Header, List } from 'semantic-ui-react';
import EmployerNavBar from '../EmployerNavBar';

const EmployerHomePage = () => {

    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        axios.get('https://hr-sample-b3c2d-default-rtdb.firebaseio.com/employees.json')
            .then(response => {
                console.log(response.data);
                setEmployees(response.data);
            })
    }, []);

    return (
        <Fragment>
            <EmployerNavBar/>
            <List>
                {employees.map((employee: Employee, index: number) => {
                    return <List.Item key={index}>
                        {employee.fullName}
                    </List.Item>
                })}
            </List>
        </Fragment>
)}

export default EmployerHomePage