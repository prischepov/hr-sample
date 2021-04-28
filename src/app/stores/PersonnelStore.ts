import { EmployeeStatus } from './../models/Enums';
import { Employee } from './../models/Employee';
import { makeAutoObservable, runInAction } from 'mobx';
import client from '../common/api/client';

export default class PersonnelStore {

    employees: Employee[] = [];
    isLoading: boolean = true;
    isSubmitting: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    loadPersonnelList = async () => {
        this.isLoading = true;
        try {
            const employees = await client.Personnel.list();
            runInAction(() => {
                this.employees = employees;
                this.isLoading = false;
            });
        } catch (error) {
            console.log(error);
            this.isLoading = false;
        }
    }

    suspendEmployee = async (id: string) => {
        this.isSubmitting = true;
        try {
            await client.Personnel.patchEmployeeStatus(id);
            const suspendedEmployee = this.employees.find((employee) => employee.id === id);
            let updatedEmployee  = {...suspendedEmployee, status: EmployeeStatus.Leaving } as Employee;
            this.employees = [...this.employees.filter(e => e.id !== id), updatedEmployee];
            this.isSubmitting = false;
        } catch (error) {
            console.log(error);
            this.isSubmitting = false;
        }
    }
}