import { BaseApiService } from './BaseApiService';
import axios from 'axios';
import { Sync } from '../api.types';

export class SyncService extends BaseApiService {

    public latest(): Promise<Sync> {
        return axios.get(`${this._baseHost}/api/sync`)
            .then((response: any) => response.data);
    }

}
