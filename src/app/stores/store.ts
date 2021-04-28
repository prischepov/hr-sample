import { createContext, useContext } from 'react';
import PersonnelStore from './PersonnelStore';
import UserStore from './UserStore';
import VacanciesStore from './VacanciesStore';

interface Store {
    userStore: UserStore,
    personnelStore: PersonnelStore,
    vacanciesStore: VacanciesStore
}

export const store: Store = {
    userStore: new UserStore(),
    personnelStore: new PersonnelStore(),
    vacanciesStore: new VacanciesStore(),
} 

export const StoreContext = createContext(store);

// packing stores in custom React hook
export function useStore() {
    return useContext(StoreContext)
}