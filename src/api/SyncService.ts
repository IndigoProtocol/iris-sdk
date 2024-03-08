import { BaseApiService } from './BaseApiService';
import axios from 'axios';
import { Sync } from '../models/Sync';

export class SyncService extends BaseApiService {

    public latest(): Promise<Sync> {
        return axios.get(`${this._baseHost}/api/sync`)
            .then((response: any) => new Sync(response.data.slot, response.data.blockHash));
    }

}
