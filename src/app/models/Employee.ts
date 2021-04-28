import { EmployeeStatus, ScheduleDays, ScheduleShifts } from "./Enums";

export interface Employee {
    id: string,
    fullName: string,
    photoURL: string,
    position: string,
    scheduleDays: ScheduleDays,
    scheduleShifts: ScheduleShifts,
    status: EmployeeStatus
}