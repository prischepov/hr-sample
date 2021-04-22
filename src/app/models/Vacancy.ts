import { Positions, ScheduleDays, ScheduleShifts } from "./Enums";

export interface Vacancy {
    position: Positions,
    scheduleDays: ScheduleDays,
    scheduleShifts: ScheduleShifts,
    quantity: number,
    comment: string
}