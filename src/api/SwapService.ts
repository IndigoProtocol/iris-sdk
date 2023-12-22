import { BaseApiService } from './BaseApiService';
import axios from 'axios';
import { Token } from '../models/Asset';
import { LimiterResults, OrderRouteResults } from '../api.types';

export class SwapService extends BaseApiService {

    public routeFromReceive(dexs: string[], swapInToken: Token, swapOutToken: Token, swapInAmount: bigint): Promise<OrderRouteResults> {
        return axios.post(`${this._baseHost}/api/swap/route/receive`, {
            dexs,
            swapInAmount: Number(swapInAmount),
            swapInToken: swapInToken === 'lovelace'
                ? ''
                : swapInToken.identifier('.'),
            swapOutToken: swapOutToken === 'lovelace'
                ? ''
                : swapOutToken.identifier('.'),
        }).then((response: any) => {
            Object.keys(response.data.results).forEach((key: string) => {
                response.data.results[key].liquidityPool = this.responseToLiquidityPool(response.data.results[key].liquidityPool);
            });

            return response.data;
        });
    }

    public routeFromSend(dexs: string[], swapInToken: Token, swapOutToken: Token, swapOutAmount: bigint): Promise<OrderRouteResults> {
        return axios.post(`${this._baseHost}/api/swap/route/send`, {
            dexs,
            swapOutAmount: Number(swapOutAmount),
            swapInToken: swapInToken === 'lovelace'
                ? ''
                : swapInToken.identifier('.'),
            swapOutToken: swapOutToken === 'lovelace'
                ? ''
                : swapOutToken.identifier('.'),
        }).then((response: any) => {
            Object.keys(response.data.results).forEach((key: string) => {
                response.data.results[key].liquidityPool = this.responseToLiquidityPool(response.data.results[key].liquidityPool);
            });

            return response.data;
        });
    }

    public spread(dex: string, swapInToken: Token, swapOutToken: Token, swapInAmount: bigint, stepSize: number, lowestPrice: number): Promise<LimiterResults> {
        return axios.post(`${this._baseHost}/api/swap/spread`, {
            dex,
            swapInAmount: Number(swapInAmount),
            swapInToken: swapInToken === 'lovelace'
                ? ''
                : swapInToken.identifier('.'),
            swapOutToken: swapOutToken === 'lovelace'
                ? ''
                : swapOutToken.identifier('.'),
            stepSize,
            lowestPrice,
        }).then((response: any) => {
            response.data.liquidityPool = this.responseToLiquidityPool(response.data.liquidityPool);

            return response.data;
        });
    }

}
