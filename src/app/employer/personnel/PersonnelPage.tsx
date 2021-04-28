import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import { Employee } from '../../models/Employee';
import EmployerNavBar from '../EmployerNavBar';
import PersonnelDashboard from './PersonnelDashboard';

export default function PersonnelPage() {

    const initialState = [] as Employee[];
    const [employees, setEmployees] = useState(initialState);

    useEffect(() => {
        axios.get('https://hr-sample-b3c2d-default-rtdb.firebaseio.com/employees.json')
            .then(response => {
                const employees = [] as Employee[];
                for(let key in response.data){
                    employees.push({...response.data[key], id: key});
                }
                console.log(response.data);
                setEmployees(employees);
            })
    }, []);

    return (
        <Fragment>
            <EmployerNavBar/>
            <PersonnelDashboard employees={employees}/>
        </Fragment>
)}