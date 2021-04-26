import { Fragment, useEffect } from 'react';
import EmployerNavBar from '../EmployerNavBar';
import VacanciesDashboard from './VacanciesDashboard';
import LoadingIndicator from '../../common/layout/LoadingIndicator';
import { useStore } from '../../stores/store';
import { observer } from 'mobx-react-lite';

function VacanciesPage() {

    const {vacanciesStore} = useStore();

    useEffect(() => {
        vacanciesStore.loadVacanciesList();
    }, [vacanciesStore]);

    if(vacanciesStore.isLoading) {
        return <LoadingIndicator />
    }

    return (
        <Fragment>
            <EmployerNavBar/>

            <VacanciesDashboard />
        </Fragment>
    )
}

export default observer(VacanciesPage);