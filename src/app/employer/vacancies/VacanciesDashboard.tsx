import { Vacancy } from '../../models/Vacancy'
import VacanciesList from './VacanciesList'

interface Props {
    vacancies: Vacancy[];
}

export default function VacanciesDashboard({vacancies} : Props) {
    return (
        <VacanciesList vacancies={vacancies}/>
    )
}
