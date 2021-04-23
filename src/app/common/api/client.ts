import { Vacancy } from './../../models/Vacancy';
import axios, { AxiosResponse } from 'axios';

// axios.defaults.baseURL = 'https://hr-sample-b3c2d-default-rtdb.firebaseio.com';

const axiosInstance = axios.create({
    baseURL: 'https://hr-sample-b3c2d-default-rtdb.firebaseio.com'
});

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const verbs = {
    get: <T> (url: string) => axiosInstance.get<T>(url).then(responseBody),
    put: <T> (url: string, body: {}) => axiosInstance.put<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axiosInstance.post<T>(url).then(responseBody),
    delete: <T> (url: string, id: string) => axiosInstance.delete<T>(url).then(responseBody)
}

const Vacancies = {
    list: () => verbs.get<Vacancy[]>('/vacancies.json')
}

const client = {
    Vacancies
}

export default client;