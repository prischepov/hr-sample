import { ClosureReason } from './../models/Enums';
import { Vacancy } from './../models/Vacancy';
import { makeAutoObservable, runInAction } from "mobx";
import client from '../common/api/client';

export default class VacanciesStore {

    vacancies: Vacancy[] = [];
    isLoading: boolean = true;
    isSubmitting: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    setLoadingState(state: boolean) {
        this.isLoading = state;
    }

    setIsSubmittingState(state: boolean) {
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
                this.setLoadingState(false);
            });
            return vacancy;
        } catch (error) {
            console.log(error);
            this.setLoadingState(false);
        }
    }

    createVacancy = async (vacancy: Vacancy) => {
        this.setIsSubmittingState(true);
        try {
            vacancy.isClosed = false;
            vacancy.publishedTimestamp = new Date();
            await client.Vacancies.create(vacancy);
            runInAction(() => {
                this.vacancies.push(vacancy);
                this.setIsSubmittingState(false);
            });
        } catch (error) {
            console.log(error);
            this.setIsSubmittingState(false);
        }
    }

    editVacancy = async (vacancy: Vacancy) => {
        this.setIsSubmittingState(true);
        try {
            await client.Vacancies.edit(vacancy);
            runInAction(() => {
                this.vacancies = [...this.vacancies.filter(v => v.id !== vacancy.id), vacancy];
                this.setIsSubmittingState(false);
            });
        } catch (error) {
            console.log(error);
            this.setIsSubmittingState(false); 
        }
    }

    closeVacancy = async(id: string, reason: ClosureReason) => {
        this.setIsSubmittingState(true);
        try {
            const vacancyToBeClosed = this.vacancies.find((vacancy) => vacancy.id === id);
            if(!vacancyToBeClosed){
                return undefined;
            }
            let closedVacancy  = 
                {...vacancyToBeClosed, 
                    isClosed: true,
                    closureReason: reason, 
                    closedTimestamp: new Date(),
                } as Vacancy;
            await client.Vacancies.close(closedVacancy);
            runInAction(() => {
                this.vacancies = [...this.vacancies.filter(v => v.id !== id), closedVacancy];
                this.isSubmitting = false;
            });
            return closedVacancy;
        } catch (error) {
            console.log(error);
            this.setIsSubmittingState(false); 
        }
    }

    deleteVacancy = async (id: string) => {
        this.setIsSubmittingState(true);
        try {
            await client.Vacancies.delete(id);
            runInAction(() => {
                this.vacancies = this.vacancies.filter(v => v.id !== id);
                this.setIsSubmittingState(false);
            });
        } catch (error) {
            console.log(error);
            this.setIsSubmittingState(false); 
        }
    }
}