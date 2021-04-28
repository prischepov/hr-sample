import { firebaseAuth, firebaseConfig } from './../../config/firebase';
import { Vacancy } from './../../models/Vacancy';
import axios from 'axios';


axios.defaults.baseURL = firebaseConfig.databaseURL;

const Auth = {
    signIn: (email: string, password: string) => firebaseAuth.signInWithEmailAndPassword(email, password),
    signOut: () => firebaseAuth.signOut()
}

const Vacancies = {
    list: async () => {
        const response = await axios.get('/vacancies.json');
        const vacancies = [] as Vacancy[];
        for(let key in response.data){
            vacancies.push({...response.data[key], id: key});
        }
        return vacancies;
    },
    details: async (id: string) => {
        const response = await axios.get<Vacancy>(`/vacancies/${id}/.json`);
        return {...response.data, id: id} as Vacancy;
    },
    create: (vacancy: Vacancy) => axios.post('/vacancies.json', vacancy),
    edit: (vacancy: Vacancy) => axios.put(`/vacancies/${vacancy.id}/.json`, vacancy),
    // update: (vacancy: Vacancy) => axios.patch(`/vacancies/${vacancy.id}/.json`, vacancy),
    delete: (id: string) => axios.delete(`/vacancies/${id}/.json`)
}

const client = {
    Auth,
    Vacancies
}

export default client;