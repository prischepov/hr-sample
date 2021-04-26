import { createContext, useContext } from 'react';
import VacanciesStore from './VacanciesStore';

interface Store {
    vacanciesStore: VacanciesStore
}

export const store: Store = {
    vacanciesStore: new VacanciesStore(),
    // TODO: add other stores
} 

export const StoreContext = createContext(store);

// packing stores in custom React hook
export function useStore() {
    return useContext(StoreContext)
}