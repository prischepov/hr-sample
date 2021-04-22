import { ClosureReason, Positions, ScheduleDays, ScheduleShifts } from "./Enums";

export interface Vacancy {
    id: string,
    position: Positions,
    scheduleDays: ScheduleDays,
    scheduleShifts: ScheduleShifts,
    quantity: number,
    comment: string,
    publishedTimestamp: Date,
    isClosed: boolean,
    closureReason: ClosureReason | undefined,
    closedTimestamp: Date | undefined,
}