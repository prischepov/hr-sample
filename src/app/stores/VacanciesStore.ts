import { Vacancy } from './../models/Vacancy';
import { makeAutoObservable, runInAction } from "mobx";
import client from '../common/api/client';

export default class VacanciesStore {

    vacancies: Vacancy[] = [];
    selectedVacancy: Vacancy | undefined = undefined;
    isEditMode: boolean = false;
    isLoading: boolean = true;
    isSubmitting: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    setLoadingState(state: boolean) {
        this.isLoading = state;
    }

    setisSubmittingState(state: boolean) {
        this.isSubmitting = state;
    }

    getVacanciesList = async () => {
        try {
            const vacancies = await client.Vacancies.list();
            runInAction(() => {
                this.vacancies = vacancies;
                this.setLoadingState(false);
            });
        } catch (error) {
            console.log(error);
            this.setLoadingState(false);
        }
    }

    setSelectedVacancy = (id: string) => {
        this.selectedVacancy = this.vacancies.find(vacancy => vacancy.id === id);
    }

    cancelVacancySelection = () => {
        this.selectedVacancy = undefined;
    }

    openForm = (id?: string) => {
        id ? this.setSelectedVacancy(id) : this.cancelVacancySelection();
        this.isEditMode = true;
    }

    closeForm = () => {
        this.isEditMode = false;
    }

    createVacancy = async (vacancy: Vacancy) => {
        this.setisSubmittingState(true);
        try {
            vacancy.isClosed = false;
            vacancy.publishedTimestamp = new Date();
            await client.Vacancies.create(vacancy);
            runInAction(() => {
                this.vacancies.push(vacancy);
                this.selectedVacancy = vacancy;
                this.isEditMode = false;
                this.setisSubmittingState(false);
            });
        } catch (error) {
            console.log(error);
            this.setisSubmittingState(false);
        }
    }

    editVacancy = async (vacancy: Vacancy) => {
        this.setisSubmittingState(true);
        try {
            await client.Vacancies.edit(vacancy);
            runInAction(() => {
                this.vacancies = [...this.vacancies.filter(v => v.id !== vacancy.id), vacancy];
                this.selectedVacancy = vacancy;
                this.isEditMode = false;
                this.setisSubmittingState(false);
            });
        } catch (error) {
            console.log(error);
            this.setisSubmittingState(false); 
        }
    }

    deleteVacancy = async (id: string) => {
        this.setisSubmittingState(true);
        try {
            await client.Vacancies.delete(id);
            runInAction(() => {
                this.vacancies = this.vacancies.filter(v => v.id !== id);
                this.setisSubmittingState(false);
            });
        } catch (error) {
            console.log(error);
            this.setisSubmittingState(false); 
        }
    }
}