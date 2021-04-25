import { Vacancy } from './../../models/Vacancy';
import axios from 'axios';

axios.defaults.baseURL = 'https://hr-sample-b3c2d-default-rtdb.firebaseio.com';

const Vacancies = {
    list: async () => {
        const response = await axios.get('/vacancies.json');
        const vacancies = [] as Vacancy[];
        for(let key in response.data){
            vacancies.push({...response.data[key], id: key});
        }
        return vacancies;
    },
    details: (id: string) => axios.get(`/vacancies/${id}/.json`),
    create: (vacancy: Vacancy) => axios.post('/vacancies.json', vacancy),
    edit: (vacancy: Vacancy) => axios.put(`/vacancies/${vacancy.id}/.json`, vacancy),
    // update: (vacancy: Vacancy) => axios.patch(`/vacancies/${vacancy.id}/.json`, vacancy),
    delete: (id: string) => axios.delete(`/vacancies/${id}/.json`)
}

const client = {
    Vacancies
}

export default client;