import { BaseApiService } from './BaseApiService';
import { DexMetadata } from '../types';
import axios from 'axios';

export class DexService extends BaseApiService {

    public metadata(): Promise<DexMetadata[]> {
        return axios.get(`${this._baseUrl}/api/dex/metadata`)
            .then((response: any) => response.data);
    }

}
