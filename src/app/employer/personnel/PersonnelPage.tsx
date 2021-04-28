import { observer } from 'mobx-react-lite';
import { Fragment, useEffect} from 'react';
import LoadingIndicator from '../../common/layout/LoadingIndicator';
import { useStore } from '../../stores/store';
import EmployerNavBar from '../EmployerNavBar';
import PersonnelList from './PersonnelList';

export default observer(function PersonnelPage() {

    const {personnelStore} = useStore();
    
    useEffect(() => {
        personnelStore.loadPersonnelList();
    }, [personnelStore]);

    if(personnelStore.isLoading) {
        return <LoadingIndicator />
    }

    return (
        <Fragment>
            <EmployerNavBar/>
            <PersonnelList />
        </Fragment>
)})