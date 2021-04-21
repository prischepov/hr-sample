export interface InputOption {
    key: string, 
    text: string, 
    value: string
}

export const POSITIONS: InputOption[] = [
    { key:'developer', text: 'Software developer', value: 'developer' },
    { key:'qa', text: 'QA engineer', value: 'qa' },
    { key:'architect', text: 'Architect', value: 'architect' },
    { key:'manager', text: 'Project manager', value: 'manager' },
    { key:'support', text: 'Support specialist', value: 'support' },
]

export const SCHEDULE_DAYS: InputOption[] = [
    { key:'2x2', text: '2x2', value: '2x2' },
    { key:'5x2', text: '5x2', value: '5x2' },
]

export const SCHEDULE_PART_OF_DAY: InputOption[] = [
  { key:'day', text: 'Day', value: 'day' },
  { key:'night', text: 'Night', value: 'night' },
]