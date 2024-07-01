import { BaseApiService } from './BaseApiService';
import axios from 'axios';
import {
    AssetResponse,
    DepositOrderResponse,
    OperationStatusResponse,
    OrderFilters,
    PaginatedResponse,
    PaginationParams,
    SwapOrderResponse,
    WithdrawOrderResponse
} from '../api.types';
import { LiquidityPool } from '../models/LiquidityPool';
import { OperationStatus } from '../models/OperationStatus';
import { SwapOrder } from '../models/SwapOrder';
import { Asset } from '../models/Asset';
import { WithdrawOrder } from '../models/WithdrawOrder';
import { DepositOrder } from '../models/DepositOrder';

export class OrdersService extends BaseApiService {

    swaps(paymentKeyCredentials: string[], filters: OrderFilters = {},  pagination: PaginationParams = { page: 1, limit: 100 }): Promise<PaginatedResponse> {
        let url: string = `${this._baseHost}/api/orders/swaps?page=${pagination.page}&limit=${pagination.limit}&type=${filters.type}`;

        if (filters.asset) {
            url += `&token=${filters.asset.identifier('.')}`;
        }
        if (filters.poolIdentifier) {
            url += `&poolIdentifier=${filters.poolIdentifier}`;
        }

        return axios.post(url, {
            pubKeyHashes: paymentKeyCredentials,
        }).then((response: any) => {
            return {
                data: response.data.data.map((order: SwapOrderResponse) => {
                    const operationStatuses: OperationStatus[] = order.statuses.map((status: OperationStatusResponse) => {
                        return new OperationStatus(
                            null,
                            status.status,
                            status.slot,
                            status.txHash,
                            status.outputIndex,
                            status.operationTxHash,
                            status.operationOutputIndex,
                        );
                    });

                    const liquidityPool: LiquidityPool = this.responseToLiquidityPool(order.liquidityPool);

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

    deposits(paymentKeyCredentials: string[], filters: OrderFilters = {},  pagination: PaginationParams = { page: 1, limit: 100 }): Promise<PaginatedResponse> {
        let url: string =`${this._baseHost}/api/orders/deposits?page=${pagination.page}&limit=${pagination.limit}`;

        if (filters.asset) {
            url += `&token=${filters.asset.identifier('.')}`;
        }
        if (filters.poolIdentifier) {
            url += `&poolIdentifier=${filters.poolIdentifier}`;
        }

        return axios.post(url, {
            pubKeyHashes: paymentKeyCredentials,
        }).then((response: any) => {
            return {
                data: response.data.data.map((order: DepositOrderResponse) => {
                    const operationStatuses: OperationStatus[] = order.statuses.map((status: OperationStatusResponse) => {
                        return new OperationStatus(
                            null,
                            status.status,
                            status.slot,
                            status.txHash,
                            status.outputIndex,
                            status.operationTxHash,
                            status.operationOutputIndex,
                        );
                    });

                    const liquidityPool: LiquidityPool = this.responseToLiquidityPool(order.liquidityPool);

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

    withdraws(paymentKeyCredentials: string[], filters: OrderFilters = {},  pagination: PaginationParams = { page: 1, limit: 100 }): Promise<PaginatedResponse> {
        let url: string =`${this._baseHost}/api/orders/withdraws?page=${pagination.page}&limit=${pagination.limit}`;

        if (filters.poolIdentifier) {
            url += `&poolIdentifier=${filters.poolIdentifier}`;
        }

        return axios.post(url, {
            pubKeyHashes: paymentKeyCredentials,
        }).then((response: any) => {
            return {
                data: response.data.data.map((order: WithdrawOrderResponse) => {
                    const operationStatuses: OperationStatus[] = order.statuses.map((status: OperationStatusResponse) => {
                        return new OperationStatus(
                            null,
                            status.status,
                            status.slot,
                            status.txHash,
                            status.outputIndex,
                            status.operationTxHash,
                            status.operationOutputIndex,
                        );
                    });

                    const liquidityPool: LiquidityPool = this.responseToLiquidityPool(order.liquidityPool);

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

    swapAssets(paymentKeyCredentials: string[]): Promise<Asset[]> {
        return axios.post(`${this._baseHost}/api/orders/swaps/assets`, {
            pubKeyHashes: paymentKeyCredentials,
        }).then((response: any) => {
            return response.data.map((asset: AssetResponse) => new Asset(
                asset.policyId,
                asset.nameHex,
                asset.decimals,
                asset.isVerified,
                asset.isLpToken,
                asset.name,
                asset.ticker,
                asset.logo,
                asset.description,
            ));
        });
    }

    depositAssets(paymentKeyCredentials: string[]): Promise<Asset[]> {
        return axios.post(`${this._baseHost}/api/orders/deposits/assets`, {
            pubKeyHashes: paymentKeyCredentials,
        }).then((response: any) => {
            return response.data.map((asset: AssetResponse) => new Asset(
                asset.policyId,
                asset.nameHex,
                asset.decimals,
                asset.isVerified,
                asset.isLpToken,
                asset.name,
                asset.ticker,
                asset.logo,
                asset.description,
            ));
        });
    }

}
