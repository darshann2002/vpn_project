import axios, { AxiosRequestConfig } from 'axios';
import { API_URL } from './config';
export class CommonAxiosServicePms {
    async axiosPostCall(urlEndPoint: string | {urlEndPoint: string, serviceUrl: string}, data?: any, config?: AxiosRequestConfig) {
        let hostIp = '';
        let queryString = '';
        // if only query string(urlEndPoint) is specified, then the default connection host is assigned
        if (typeof urlEndPoint == 'string') {
            hostIp = API_URL ;
            queryString = urlEndPoint;
        } else {
            // if a specific sub-service is specified then the connection host is dynamic based on the service name
            hostIp = urlEndPoint.serviceUrl;
            queryString = urlEndPoint.urlEndPoint;
        }
        return await axios.post(hostIp + '' + queryString, data, config)
        .then(res => {
            return res.data;
        }).catch(err => {
            throw new Error(err.message);
        })
    }

    async axiosGetCall(urlEndPoint: string | {urlEndPoint: string, serviceUrl: string}, data?: any, config?: AxiosRequestConfig) {
        let hostIp = '';
        let queryString = '';
        // if only query string(urlEndPoint) is specified, then the default connection host is assigned
        if (typeof urlEndPoint == 'string') {
            hostIp = API_URL;
            queryString = urlEndPoint;
        } else {
            // if a specific sub-service is specified then the connection host is dynamic based on the service name
            hostIp = urlEndPoint.serviceUrl;
            queryString = urlEndPoint.urlEndPoint;
        }
        return await axios.get(hostIp + '' + queryString, data)
        .then(res => {
            return res.data;
        }).catch(err => {
            throw new Error(err.message);
        })
    }

}

    


