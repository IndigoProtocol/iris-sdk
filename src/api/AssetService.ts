import { BaseApiService } from './BaseApiService';
import { AssetResponse, PaginatedResponse, PaginationParams } from '../types';
import axios from 'axios';
import { Asset } from '../models/Asset';
import { LiquidityPool } from '../models/LiquidityPool';

export class AssetService extends BaseApiService {

    public all(pagination: PaginationParams): Promise<PaginatedResponse> {
        return axios.get(`${this._baseUrl}/api/assets?page=${pagination.page}&limit=${pagination.limit}`)
            .then((response: any) => {
                if (response.data.message) {
                    return Promise.reject(response.data.message);
                }

                return {
                    data: response.data.data.map((asset: AssetResponse) => new Asset(
                        asset.policyId,
                        asset.nameHex,
                        asset.decimals,
                        asset.isVerified,
                        asset.isLpToken,
                        asset.name,
                        asset.ticker,
                        asset.logo,
                        asset.description,
                    )),
                    pagination: response.data.pagination,
                };
            });
    }

    public match(asset: { policyId?: string, nameHex?: string }, pagination: PaginationParams): Promise<PaginatedResponse> {
        return axios.post(`${this._baseUrl}/api/assets?page=${pagination.page}&limit=${pagination.limit}`, {
            policyId: asset.policyId,
            nameHex: asset.nameHex,
        }).then((response: any) => {
            if (response.data.message) {
                return Promise.reject(response.data.message);
            }
            if (response.data.data.length === 0) {
                return Promise.reject('Asset not found');
            }

            return {
                data: response.data.data.map((asset: AssetResponse) => new Asset(
                    asset.policyId,
                    asset.nameHex,
                    asset.decimals,
                    asset.isVerified,
                    asset.isLpToken,
                    asset.name,
                    asset.ticker,
                    asset.logo,
                    asset.description,
                )),
                pagination: response.data.pagination,
            };
        });
    }

    public search(query: string, pagination: PaginationParams): Promise<PaginatedResponse> {
        return axios.get(`${this._baseUrl}/api/assets/search?query=${query}&${pagination.page}&limit=${pagination.limit}`).then((response: any) => {
            if (response.data.message) {
                return Promise.reject(response.data.message);
            }

            return {
                data: response.data.data.map((asset: AssetResponse) => new Asset(
                    asset.policyId,
                    asset.nameHex,
                    asset.decimals,
                    asset.isVerified,
                    asset.isLpToken,
                    asset.name,
                    asset.ticker,
                    asset.logo,
                    asset.description,
                )),
                pagination: response.data.pagination,
            };
        });
    }

    public asset(asset: { policyId: string, nameHex: string }): Promise<Asset | undefined> {
        return axios.get(`${this._baseUrl}/api/assets/${asset.policyId}.${asset.nameHex}`).then((response: any) => {
            if ('success' in response.data && ! response.data.success) {
                return undefined;
            }

            return new Asset(
                response.data.policyId,
                response.data.nameHex,
                response.data.decimals,
                response.data.isVerified,
                response.data.isLpToken,
                response.data.name,
                response.data.ticker,
                response.data.logo,
                response.data.description,
            );
        });
    }

    public price(asset: { policyId: string, nameHex: string }): Promise<number> {
        return axios.get(`${this._baseUrl}/api/assets/${asset.policyId}.${asset.nameHex}/price`).then((response: any) => {
            if ('success' in response.data && ! response.data.success) {
                return 0;
            }

            return response.data.price;
        });
    }

    public lpTokenPool(lpToken: { policyId: string, nameHex: string }): Promise<LiquidityPool | undefined> {
        return axios.get(`${this._baseUrl}/api/assets/${lpToken.policyId}.${lpToken.nameHex}/pool`).then((response: any) => {
            if ('success' in response.data && ! response.data.success) {
                return undefined;
            }

            return this.responseToLiquidityPool(response.data);
        });
    }

}
