import { BaseApiService } from './BaseApiService';
import { AssetResponse, PaginatedResponse, PaginationParams } from '../api.types';
import axios from 'axios';
import { Asset } from '../models/Asset';
import { LiquidityPool } from '../models/LiquidityPool';
import { TickInterval } from '../enums';
import { Tick } from '../models/Tick';

export class AssetService extends BaseApiService {

    public all(pagination: PaginationParams = { page: 1, limit: 100 }): Promise<PaginatedResponse<Asset>> {
        return axios.get(`${this._baseHost}/api/assets?page=${pagination.page}&limit=${pagination.limit}`)
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
                        asset.meta,
                    )),
                    pagination: response.data.pagination,
                };
            });
    }

    public match(asset: { policyId?: string, nameHex?: string },  pagination: PaginationParams = { page: 1, limit: 100 }): Promise<PaginatedResponse<Asset>> {
        return axios.post(`${this._baseHost}/api/assets?page=${pagination.page}&limit=${pagination.limit}`, {
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
                    asset.meta,
                )),
                pagination: response.data.pagination,
            };
        });
    }

    public search(query: string,  pagination: PaginationParams = { page: 1, limit: 100 }): Promise<PaginatedResponse<Asset>> {
        return axios.get(`${this._baseHost}/api/assets/search?query=${query}&page=${pagination.page}&limit=${pagination.limit}`).then((response: any) => {
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
                    asset.meta,
                )),
                pagination: response.data.pagination,
            };
        });
    }

    public asset(asset: { policyId: string, nameHex: string }): Promise<Asset | undefined> {
        return axios.get(`${this._baseHost}/api/assets/${asset.policyId}.${asset.nameHex}`).then((response: any) => {
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
                response.data.meta,
            );
        });
    }

    public price(asset: { policyId: string, nameHex: string }): Promise<number> {
        return axios.get(`${this._baseHost}/api/assets/${asset.policyId}.${asset.nameHex}/price`).then((response: any) => {
            if ('success' in response.data && ! response.data.success) {
                return 0;
            }

            return response.data.price;
        });
    }

    public lpTokenPool(lpToken: { policyId: string, nameHex: string }): Promise<LiquidityPool | undefined> {
        return axios.get(`${this._baseHost}/api/assets/${lpToken.policyId}.${lpToken.nameHex}/pool`).then((response: any) => {
            if ('success' in response.data && ! response.data.success) {
                return undefined;
            }

            return this.responseToLiquidityPool(response.data);
        });
    }

    public ticks(forAssets: Asset[], resolution: TickInterval, orderBy: 'ASC' | 'DESC' = 'ASC', fromTime?: number, toTime?: number): Promise<Tick[]> {
        let url: string = `${this._baseHost}/api/assets/ticks?resolution=${resolution}&orderBy=${orderBy}`;

        if (fromTime) {
            url += `&fromTime=${fromTime}`;
        }
        if (toTime) {
            url += `&toTime=${toTime}`;
        }

        return axios.post(url, {
            forAssets: forAssets.map((asset: Asset) => asset.identifier())
        }).then((response: any) => {
            return response.data.map((tickInfo: any) => {
                return new Tick(
                    tickInfo.liquidityPool ? this.responseToLiquidityPool(tickInfo.liquidityPool) : null,
                    tickInfo.resolution,
                    tickInfo.time * 1000,
                    tickInfo.open,
                    tickInfo.high,
                    tickInfo.low,
                    tickInfo.close,
                    tickInfo.volume,
                );
            });
        });
    }

}
