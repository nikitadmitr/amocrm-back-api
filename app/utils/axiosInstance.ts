import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
    baseURL: `https://${process.env.SUBDOMAIN}.amocrm.ru/`,
});

export default axiosInstance;
