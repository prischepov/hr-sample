import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import { Employee } from '../../models/Employee';

const EmployerHomePage = () => {

    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        axios.get('https://hr-sample-3673a-default-rtdb.europe-west1.firebasedatabase.app/employees').
            then(response => {
                console.log(response);
                setEmployees(response.data);
            })
    }, []);

    return (
        <Fragment>
            <div>
                Employer Home Page goes here
            </div>
            <div>
                <ul>
                    {employees.map((employee: Employee)=> {
                        <li key={employee.id}>
                            {employee.fullName}
                        </li>
                    })}
                </ul>
            </div>
        </Fragment>
)}

export default EmployerHomePage