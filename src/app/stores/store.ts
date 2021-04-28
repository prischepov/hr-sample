import { createContext, useContext } from 'react';
import UserStore from './UserStore';
import VacanciesStore from './VacanciesStore';

interface Store {
    vacanciesStore: VacanciesStore,
    userStore: UserStore
}

export const store: Store = {
    vacanciesStore: new VacanciesStore(),
    userStore: new UserStore()
} 

export const StoreContext = createContext(store);

// packing stores in custom React hook
export function useStore() {
    return useContext(StoreContext)
}