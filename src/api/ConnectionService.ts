import { BaseApiService } from './BaseApiService';
import axios from 'axios';

export class ConnectionService extends BaseApiService {

    public ping(): Promise<boolean> {
        return axios.get(`${this._baseHost}/api/ping`)
            .then((response: any) => {
                return Promise.resolve(response.data.success);
            }).catch(() => {
                return Promise.resolve(false);
            });
    }

}
