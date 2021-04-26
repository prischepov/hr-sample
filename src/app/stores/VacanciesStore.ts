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

    loadVacanciesList = async () => {
        this.setLoadingState(true);
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

    loadVacancy = async (id: string) => {
        this.setLoadingState(true);
        try {
            const vacancy = await client.Vacancies.details(id);
            runInAction(() => {
                this.selectedVacancy = vacancy;
                this.setLoadingState(false);
            });
            return vacancy;
        } catch (error) {
            console.log(error);
            this.setLoadingState(false);
        }
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