import { createContext, useContext } from 'react';
import VacanciesStore from './VacanciesStore';

interface Store {
    vacanciesStore: VacanciesStore
}

export const store: Store = {
    vacanciesStore: new VacanciesStore()
} 

export const StoreContext = createContext(store);

// pack stores in custom React hook
export function useStore() {
    return useContext(StoreContext)
}