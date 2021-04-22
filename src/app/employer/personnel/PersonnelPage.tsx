import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import EmployerNavBar from '../EmployerNavBar';
import PersonnelDashboard from './PersonnelDashboard';

export default function PersonnelPage() {

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
            <PersonnelDashboard employees={employees}/>
        </Fragment>
)}