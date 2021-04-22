export enum Positions {
  Developer = 'developer',
  QA = 'qa',
  Architect = 'architect',
  Manager = 'manager',
  Support = 'support'
}

export enum ScheduleDays {
  TwoDays = '2x2',
  FiveDays = '5x2'
}

export enum ScheduleShifts {
  Day = 'day',
  Night = 'night'
}

export enum ClosureReason {
  Fulfilled = 'fulfilled',
  NoLongerRelevant = 'noLongerRelevant'
}

export interface InputOption {
    key: string, 
    text: string, 
    value: string
}

export const POSITION_OPTIONS: InputOption[] = [
    { key: Positions.Developer, text: 'Software developer', value: Positions.Developer },
    { key: Positions.QA, text: 'QA engineer', value: Positions.QA },
    { key: Positions.Architect, text: 'Architect', value: Positions.Architect },
    { key: Positions.Manager, text: 'Project manager', value: Positions.Manager },
    { key: Positions.Support, text: 'Support specialist', value: Positions.Support }
]

export const SCHEDULE_DAYS_OPTIONS: InputOption[] = [
    { key: ScheduleDays.TwoDays, text: '2x2', value: ScheduleDays.TwoDays },
    { key: ScheduleDays.FiveDays, text: '5x2', value: ScheduleDays.FiveDays }
]

export const SCHEDULE_SHIFT_OPTIONS: InputOption[] = [
  { key: ScheduleShifts.Day, text: 'Day', value: ScheduleShifts.Day},
  { key: ScheduleShifts.Night, text: 'Night', value: ScheduleShifts.Night }
]

export const CLOSURE_REASONS: InputOption[] = [
  { key: ClosureReason.Fulfilled, text: 'Fulfilled', value: ClosureReason.Fulfilled },
  { key: ClosureReason.NoLongerRelevant, text: 'No longer relevant', value: ClosureReason.NoLongerRelevant }
]