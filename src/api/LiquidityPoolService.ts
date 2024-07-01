import { BaseApiService } from './BaseApiService';
import axios from 'axios';
import { LiquidityPool } from '../models/LiquidityPool';
import {
    DepositOrderResponse,
    LiquidityPoolResponse,
    LiquidityPoolStateResponse,
    OperationStatusResponse,
    PaginatedResponse,
    PaginationParams,
    PriceInfo,
    SwapOrderResponse,
    WithdrawOrderResponse
} from '../api.types';
import { Asset, Token } from '../models/Asset';
import { SwapOrder } from '../models/SwapOrder';
import { OperationStatus } from '../models/OperationStatus';
import { WithdrawOrder } from '../models/WithdrawOrder';
import { DepositOrder } from '../models/DepositOrder';
import { TickInterval } from '../enums';
import { Tick } from '../models/Tick';
import { LiquidityPoolState } from '../models/LiquidityPoolState';
import { LiquidityPoolResource } from '../resources/LiquidityPoolResource';

export class LiquidityPoolService extends BaseApiService {

    public all( pagination: PaginationParams = { page: 1, limit: 100 }): Promise<LiquidityPool[]> {
        return axios.get(`${this._baseHost}/api/liquidity-pools?page=${pagination.page}&limit=${pagination.limit}`)
            .then((response: any) => {
                return response.data.map((pool: LiquidityPoolResponse) => this.responseToLiquidityPool(pool));
            });
    }

    public match(pool: { identifier?: string, dex?: string, tokenA?: Token, tokenB?: Asset },  pagination: PaginationParams = { page: 1, limit: 100 }, fromTimestamp?: number, toTimestamp?: number): Promise<PaginatedResponse> {
        let path: string = `${this._baseHost}/api/liquidity-pools?page=${pagination.page}&limit=${pagination.limit}`;

        if (fromTimestamp) {
            path += `&fromTimestamp=${fromTimestamp}`;
        }
        if (toTimestamp) {
            path += `&toTimestamp=${toTimestamp}`;
        }

        return axios.post(path, {
            identifier: pool.identifier,
            dex: pool.dex,
            tokenA: pool.tokenA === 'lovelace' ? 'lovelace' : pool.tokenA?.identifier('.'),
            tokenB: pool.tokenB?.identifier('.'),
        }).then((response: any) => {
            return {
                data: response.data.data.map((pool: LiquidityPoolResponse) => this.responseToLiquidityPool(pool)),
                pagination: response.data.pagination,
            };
        });
    }

    public search(query: string,  pagination: PaginationParams = { page: 1, limit: 100 }): Promise<PaginatedResponse> {
        return axios.get(`${this._baseHost}/api/liquidity-pools/search?query=${query}&page=${pagination.page}&limit=${pagination.limit}`)
            .then((response: any) => {
                return {
                    data: response.data.data.map((pool: LiquidityPoolResponse) => this.responseToLiquidityPool(pool)),
                    pagination: response.data.pagination,
                };
            });
    }

    public swapOrders(liquidityPool: LiquidityPool, typeFilter: string, senderFilter: string = '',  pagination: PaginationParams = { page: 1, limit: 100 }): Promise<PaginatedResponse> {
        return axios.get(`${this._baseHost}/api/liquidity-pools/${liquidityPool.identifier}/swaps?page=${pagination.page}&limit=${pagination.limit}&type=${typeFilter}&sender=${senderFilter}`)
            .then((response: any) => {
                return {
                    data: response.data.data.map((order: SwapOrderResponse) => {
                        const operationStatuses: OperationStatus[] = order.statuses?.map((status: OperationStatusResponse) => {
                            return new OperationStatus(
                                null,
                                status.status,
                                status.slot,
                                status.txHash,
                                status.outputIndex,
                                status.operationTxHash,
                                status.operationOutputIndex,
                            );
                        }) ?? [];

                        const liquidityPool: LiquidityPool | null = order.liquidityPool
                            ? this.responseToLiquidityPool(order.liquidityPool)
                            : null;

                        return new SwapOrder(
                            order.swapInToken === null
                                ? 'lovelace'
                                : new Asset(order.swapInToken.policyId, order.swapInToken.nameHex, order.swapInToken.decimals, order.swapInToken.isVerified, order.swapInToken.isLpToken, order.swapInToken.name, order.swapInToken.ticker, order.swapInToken.logo, order.swapInToken.description),
                            order.swapOutToken === null
                                ? 'lovelace'
                                : new Asset(order.swapOutToken.policyId, order.swapOutToken.nameHex, order.swapOutToken.decimals, order.swapOutToken.isVerified, order.swapOutToken.isLpToken, order.swapOutToken.name, order.swapOutToken.ticker, order.swapOutToken.logo, order.swapOutToken.description),
                            order.orderType,
                            BigInt(order.swapInAmount),
                            BigInt(order.minReceive),
                            order.actualReceive ? BigInt(order.actualReceive) : null,
                            BigInt(order.dexFeesPaid),
                            order.senderPubKeyHash,
                            order.senderStakeKeyHash,
                            operationStatuses,
                            order.txHash,
                            Number(order.outputIndex),
                            Number(order.slot),
                            liquidityPool,
                            order.meta,
                        );
                    }),
                    pagination: response.data.pagination,
                };
        });
    }

    public swapsHistoric(fromTimestamp: number, toTimestamp: number, forAssets: Asset[] = []): Promise<SwapOrder[]> {
        return axios.post(`${this._baseHost}/api/liquidity-pools/swaps/historic`, {
            fromTimestamp,
            toTimestamp,
            forAssets: forAssets.map((asset: Asset) => asset.identifier())
        }).then((response: any) => {
            return response.data.map((order: SwapOrderResponse) => {
                const operationStatuses: OperationStatus[] = order.statuses?.map((status: OperationStatusResponse) => {
                    return new OperationStatus(
                        null,
                        status.status,
                        status.slot,
                        status.txHash,
                        status.outputIndex,
                        status.operationTxHash,
                        status.operationOutputIndex,
                    );
                }) ?? [];

                const liquidityPool: LiquidityPool | null = order.liquidityPool
                    ? this.responseToLiquidityPool(order.liquidityPool)
                    : null;

                return new SwapOrder(
                    order.swapInToken === null
                        ? 'lovelace'
                        : new Asset(order.swapInToken.policyId, order.swapInToken.nameHex, order.swapInToken.decimals, order.swapInToken.isVerified, order.swapInToken.isLpToken, order.swapInToken.name, order.swapInToken.ticker, order.swapInToken.logo, order.swapInToken.description),
                    order.swapOutToken === null
                        ? 'lovelace'
                        : new Asset(order.swapOutToken.policyId, order.swapOutToken.nameHex, order.swapOutToken.decimals, order.swapOutToken.isVerified, order.swapOutToken.isLpToken, order.swapOutToken.name, order.swapOutToken.ticker, order.swapOutToken.logo, order.swapOutToken.description),
                    order.orderType,
                    BigInt(order.swapInAmount),
                    BigInt(order.minReceive),
                    order.actualReceive ? BigInt(order.actualReceive) : null,
                    BigInt(order.dexFeesPaid),
                    order.senderPubKeyHash,
                    order.senderStakeKeyHash,
                    operationStatuses,
                    order.txHash,
                    Number(order.outputIndex),
                    Number(order.slot),
                    liquidityPool,
                    order.meta,
                );
            });
        });
    }

    public depositOrders(liquidityPool: LiquidityPool, senderFilter: string = '',  pagination: PaginationParams = { page: 1, limit: 100 }): Promise<PaginatedResponse> {
        return axios.get(`${this._baseHost}/api/liquidity-pools/${liquidityPool.identifier}/deposits?page=${pagination.page}&limit=${pagination.limit}&sender=${senderFilter}`)
            .then((response: any) => {
                return {
                    data: response.data.data.map((order: DepositOrderResponse) => {
                        const operationStatuses: OperationStatus[] = order.statuses?.map((status: OperationStatusResponse) => {
                            return new OperationStatus(
                                null,
                                status.status,
                                status.slot,
                                status.txHash,
                                status.outputIndex,
                                status.operationTxHash,
                                status.operationOutputIndex,
                            );
                        }) ?? [];

                        const liquidityPool: LiquidityPool | null = order.liquidityPool
                            ? this.responseToLiquidityPool(order.liquidityPool)
                            : null;

                        return new DepositOrder(
                            order.depositAToken === null
                                ? 'lovelace'
                                : new Asset(order.depositAToken.policyId, order.depositAToken.nameHex, order.depositAToken.decimals, order.depositAToken.isVerified, order.depositAToken.isLpToken, order.depositAToken.name, order.depositAToken.ticker, order.depositAToken.logo, order.depositAToken.description),
                            order.depositBToken === null
                                ? 'lovelace'
                                : new Asset(order.depositBToken.policyId, order.depositBToken.nameHex, order.depositBToken.decimals, order.depositBToken.isVerified, order.depositBToken.isLpToken, order.depositBToken.name, order.depositBToken.ticker, order.depositBToken.logo, order.depositBToken.description),
                            BigInt(order.depositAAmount),
                            BigInt(order.depositBAmount),
                            BigInt(order.dexFeesPaid),
                            order.senderPubKeyHash,
                            order.senderStakeKeyHash,
                            operationStatuses,
                            order.txHash,
                            Number(order.outputIndex),
                            Number(order.slot),
                            liquidityPool,
                            order.meta,
                        );
                    }),
                    pagination: response.data.pagination,
                };
        });
    }

    public depositsHistoric(fromTimestamp: number, toTimestamp: number, forAssets: Asset[] = []): Promise<DepositOrder[]> {
        return axios.post(`${this._baseHost}/api/liquidity-pools/deposits/historic`, {
            fromTimestamp,
            toTimestamp,
            forAssets: forAssets.map((asset: Asset) => asset.identifier())
        }).then((response: any) => {
            return response.data.map((order: DepositOrderResponse) => {
                const operationStatuses: OperationStatus[] = order.statuses?.map((status: OperationStatusResponse) => {
                    return new OperationStatus(
                        null,
                        status.status,
                        status.slot,
                        status.txHash,
                        status.outputIndex,
                        status.operationTxHash,
                        status.operationOutputIndex,
                    );
                }) ?? [];

                const liquidityPool: LiquidityPool | null = order.liquidityPool
                    ? this.responseToLiquidityPool(order.liquidityPool)
                    : null;

                return new DepositOrder(
                    order.depositAToken === null
                        ? 'lovelace'
                        : new Asset(order.depositAToken.policyId, order.depositAToken.nameHex, order.depositAToken.decimals, order.depositAToken.isVerified, order.depositAToken.isLpToken, order.depositAToken.name, order.depositAToken.ticker, order.depositAToken.logo, order.depositAToken.description),
                    order.depositBToken === null
                        ? 'lovelace'
                        : new Asset(order.depositBToken.policyId, order.depositBToken.nameHex, order.depositBToken.decimals, order.depositBToken.isVerified, order.depositBToken.isLpToken, order.depositBToken.name, order.depositBToken.ticker, order.depositBToken.logo, order.depositBToken.description),
                    BigInt(order.depositAAmount),
                    BigInt(order.depositBAmount),
                    BigInt(order.dexFeesPaid),
                    order.senderPubKeyHash,
                    order.senderStakeKeyHash,
                    operationStatuses,
                    order.txHash,
                    Number(order.outputIndex),
                    Number(order.slot),
                    liquidityPool,
                    order.meta,
                );
            });
        });
    }

    public withdrawOrders(liquidityPool: LiquidityPool, senderFilter: string = '',  pagination: PaginationParams = { page: 1, limit: 100 }): Promise<PaginatedResponse> {
        return axios.get(`${this._baseHost}/api/liquidity-pools/${liquidityPool.identifier}/withdraws?page=${pagination.page}&limit=${pagination.limit}&sender=${senderFilter}`)
            .then((response: any) => {
                return {
                    data: response.data.data.map((order: WithdrawOrderResponse) => {
                        const operationStatuses: OperationStatus[] = order.statuses?.map((status: OperationStatusResponse) => {
                            return new OperationStatus(
                                null,
                                status.status,
                                status.slot,
                                status.txHash,
                                status.outputIndex,
                                status.operationTxHash,
                                status.operationOutputIndex,
                            );
                        }) ?? [];

                        const liquidityPool: LiquidityPool | null = order.liquidityPool
                            ? this.responseToLiquidityPool(order.liquidityPool)
                            : null;

                        return new WithdrawOrder(
                            new Asset(order.lpToken.policyId, order.lpToken.nameHex, order.lpToken.decimals),
                            BigInt(order.lpTokenAmount),
                            BigInt(order.minReceiveA),
                            BigInt(order.minReceiveB),
                            BigInt(order.dexFeesPaid),
                            order.senderPubKeyHash,
                            order.senderStakeKeyHash,
                            operationStatuses,
                            order.txHash,
                            Number(order.outputIndex),
                            Number(order.slot),
                            liquidityPool,
                            order.meta,
                        );
                    }),
                    pagination: response.data.pagination,
                };
        });
    }

    public withdrawsHistoric(fromTimestamp: number, toTimestamp: number, forAssets: Asset[] = []): Promise<WithdrawOrder[]> {
        return axios.post(`${this._baseHost}/api/liquidity-pools/withdraws/historic`, {
            fromTimestamp,
            toTimestamp,
            forAssets: forAssets.map((asset: Asset) => asset.identifier())
        }).then((response: any) => {
            return response.data.map((order: WithdrawOrderResponse) => {
                const operationStatuses: OperationStatus[] = order.statuses?.map((status: OperationStatusResponse) => {
                    return new OperationStatus(
                        null,
                        status.status,
                        status.slot,
                        status.txHash,
                        status.outputIndex,
                        status.operationTxHash,
                        status.operationOutputIndex,
                    );
                }) ?? [];

                const liquidityPool: LiquidityPool | null = order.liquidityPool
                    ? this.responseToLiquidityPool(order.liquidityPool)
                    : null;

                return new WithdrawOrder(
                    new Asset(order.lpToken.policyId, order.lpToken.nameHex, order.lpToken.decimals),
                    BigInt(order.lpTokenAmount),
                    BigInt(order.minReceiveA),
                    BigInt(order.minReceiveB),
                    BigInt(order.dexFeesPaid),
                    order.senderPubKeyHash,
                    order.senderStakeKeyHash,
                    operationStatuses,
                    order.txHash,
                    Number(order.outputIndex),
                    Number(order.slot),
                    liquidityPool,
                    order.meta,
                );
            });
        });
    }

    public statesHistoric(fromTimestamp: number, toTimestamp: number, forAssets: Asset[] = []): Promise<LiquidityPoolState[]> {
        return axios.post(`${this._baseHost}/api/liquidity-pools/states/historic`, {
            fromTimestamp,
            toTimestamp,
            forAssets: forAssets.map((asset: Asset) => asset.identifier())
        }).then((response: any) => {
            return response.data.map((state: LiquidityPoolStateResponse) => {
                const liquidityPool: LiquidityPool | undefined = state.liquidityPool
                    ? this.responseToLiquidityPool(state.liquidityPool)
                    : undefined;

                return new LiquidityPoolState(
                    BigInt(state.reserveA),
                    BigInt(state.reserveB),
                    BigInt(state.lpTokens),
                    Number(state.feePercent),
                    BigInt(state.tvl),
                    Number(state.slot),
                    liquidityPool,
                );
            });
        });
    }

    public prices(poolIdentifiers: string[]): Promise<PriceInfo[]> {
        return axios.post(`${this._baseHost}/api/liquidity-pools/prices`, {
            identifiers: poolIdentifiers,
        }).then((response: any) => response.data.map((entry: any) => {
            return {
                identifier: entry.identifier,
                price: entry.price,
                dayLow: entry.dayLow,
                dayHigh: entry.dayHigh,
                dayChange: entry.dayChange,
                hourChange: entry.hourChange,
            };
        }));
    }

    public ticks(liquidityPool: LiquidityPool, resolution: TickInterval, orderBy: 'ASC' | 'DESC' = 'ASC', fromTime?: number, toTime?: number): Promise<Tick[]> {
        let url: string = `${this._baseHost}/api/liquidity-pools/${liquidityPool.identifier}/ticks?resolution=${resolution}&orderBy=${orderBy}`;

        if (fromTime) {
            url += `&fromTime=${fromTime}`;
        }
        if (toTime) {
            url += `&toTime=${toTime}`;
        }

        return axios.get(url).then((response: any) => {
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
