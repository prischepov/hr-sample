import { Fragment, useEffect } from 'react';
import EmployerNavBar from '../EmployerNavBar';
import VacanciesDashboard from './VacanciesDashboard';
import VacancyForm from './VacancyForm';
import VacancyDetails from './VacancyDetails';
import LoadingIndicator from '../../common/layout/LoadingIndicator';
import { useStore } from '../../stores/store';
import { observer } from 'mobx-react-lite';

function VacanciesPage() {

    const {vacanciesStore} = useStore();

    useEffect(() => {
        vacanciesStore.getVacanciesList();
    }, [vacanciesStore]);

    if(vacanciesStore.isLoading) {
        return <LoadingIndicator />
    }

    return (
        <Fragment>
            <EmployerNavBar/>

            <VacanciesDashboard />

            { vacanciesStore.selectedVacancy && !vacanciesStore.isEditMode && <VacancyDetails /> }

            { vacanciesStore.isEditMode && <VacancyForm /> }

        </Fragment>
    )
}

export default observer(VacanciesPage);