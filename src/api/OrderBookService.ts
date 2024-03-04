import { BaseApiService } from './BaseApiService';
import {
    OrderBookOrderResponse,
    OrderBookResponse,
    PaginatedResponse,
    PaginationParams,
    PriceInfo,
    Tick
} from '../api.types';
import axios from 'axios';
import { Asset, Token } from '../models/Asset';
import { OrderBook } from '../models/OrderBook';
import { OrderBookOrder } from '../models/OrderBookOrder';
import { TickInterval } from '../enums';

export class OrderBookService extends BaseApiService {

    public all( pagination: PaginationParams = { page: 1, limit: 100 }): Promise<OrderBook[]> {
        return axios.get(`${this._baseHost}/api/order-books?page=${pagination.page}&limit=${pagination.limit}`)
            .then((response: any) => {
                return response.data.map((orderBook: OrderBookResponse) => {
                    return new OrderBook(
                        orderBook.dex,
                        orderBook.identifier,
                        orderBook.tokenA === null
                            ? 'lovelace'
                            : new Asset(orderBook.tokenA.policyId, orderBook.tokenA.nameHex, orderBook.tokenA.decimals, orderBook.tokenA.isVerified, orderBook.tokenA.isLpToken, orderBook.tokenA.name, orderBook.tokenA.ticker, orderBook.tokenA.logo, orderBook.tokenA.description),
                         new Asset(orderBook.tokenB.policyId, orderBook.tokenB.nameHex, orderBook.tokenB.decimals, orderBook.tokenB.isVerified,orderBook.tokenB.isLpToken, orderBook.tokenB.name, orderBook.tokenB.ticker, orderBook.tokenB.logo, orderBook.tokenB.description),
                        orderBook.createdSlot,
                    );
                });
            });
    }

    public match(book: { identifier?: string, dex?: string, tokenA?: Token, tokenB?: Asset },  pagination: PaginationParams = { page: 1, limit: 100 }): Promise<PaginatedResponse> {
        return axios.post(`${this._baseHost}/api/order-books?page=${pagination.page}&limit=${pagination.limit}`, {
            identifier: book.identifier,
            dex: book.dex,
            tokenA: book.tokenA === 'lovelace' ? 'lovelace' : book.tokenA?.identifier('.'),
            tokenB: book.tokenB?.identifier('.'),
        }).then((response: any) => {
            return {
                data: response.data.data.map((orderBook: OrderBookResponse) => {
                    return new OrderBook(
                        orderBook.dex,
                        orderBook.identifier,
                        orderBook.tokenA === null
                            ? 'lovelace'
                            : new Asset(orderBook.tokenA.policyId, orderBook.tokenA.nameHex, orderBook.tokenA.decimals, orderBook.tokenA.isVerified, orderBook.tokenA.isLpToken, orderBook.tokenA.name, orderBook.tokenA.ticker, orderBook.tokenA.logo, orderBook.tokenA.description),
                        new Asset(orderBook.tokenB.policyId, orderBook.tokenB.nameHex, orderBook.tokenB.decimals, orderBook.tokenB.isVerified,orderBook.tokenB.isLpToken, orderBook.tokenB.name, orderBook.tokenB.ticker, orderBook.tokenB.logo, orderBook.tokenB.description),
                        orderBook.createdSlot,
                    );
                }),
                pagination: response.data.pagination,
            };
        });
    }

    public buyOrders(bookIdentifier: string): Promise<OrderBookOrder[]> {
        return axios.get(`${this._baseHost}/api/order-books/${bookIdentifier}/buy-orders`)
            .then((response: any) => {
                return response.data.map((order: OrderBookOrderResponse) => {
                    return new OrderBookOrder(
                        order.identifier,
                        order.fromToken === null
                            ? 'lovelace'
                            : new Asset(order.fromToken.policyId, order.fromToken.nameHex, order.fromToken.decimals, order.fromToken.isVerified, order.fromToken.isLpToken, order.fromToken.name, order.fromToken.ticker, order.fromToken.logo, order.fromToken.description),
                        order.toToken === null
                            ? 'lovelace'
                            : new Asset(order.toToken.policyId, order.toToken.nameHex, order.toToken.decimals, order.toToken.isVerified, order.toToken.isLpToken, order.toToken.name, order.toToken.ticker, order.toToken.logo, order.toToken.description),

                        BigInt(order.originalOfferAmount),
                        BigInt(order.unFilledOfferAmount),
                        BigInt(order.askedAmount),
                        Number(order.price),
                        Number(order.numPartialFills),
                        Boolean(order.isCancelled),
                        BigInt(order.dexFeesPaid),
                        order.senderPubKeyHash,
                        order.senderStakeKeyHash,
                        Number(order.slot),
                        order.txHash,
                        Number(order.outputIndex),
                    );
                });
            });
    }

    public sellOrders(bookIdentifier: string): Promise<OrderBookOrder[]> {
        return axios.get(`${this._baseHost}/api/order-books/${bookIdentifier}/sell-orders`)
            .then((response: any) => {
                return response.data.map((order: OrderBookOrderResponse) => {
                    return new OrderBookOrder(
                        order.identifier,
                        order.fromToken === null
                            ? 'lovelace'
                            : new Asset(order.fromToken.policyId, order.fromToken.nameHex, order.fromToken.decimals, order.fromToken.isVerified, order.fromToken.isLpToken, order.fromToken.name, order.fromToken.ticker, order.fromToken.logo, order.fromToken.description),
                        order.toToken === null
                            ? 'lovelace'
                            : new Asset(order.toToken.policyId, order.toToken.nameHex, order.toToken.decimals, order.toToken.isVerified, order.toToken.isLpToken, order.toToken.name, order.toToken.ticker, order.toToken.logo, order.toToken.description),

                        BigInt(order.originalOfferAmount),
                        BigInt(order.unFilledOfferAmount),
                        BigInt(order.askedAmount),
                        Number(order.price),
                        Number(order.numPartialFills),
                        Boolean(order.isCancelled),
                        BigInt(order.dexFeesPaid),
                        order.senderPubKeyHash,
                        order.senderStakeKeyHash,
                        Number(order.slot),
                        order.txHash,
                        Number(order.outputIndex),
                    );
                });
            });
    }

    public prices(identifiers: string[]): Promise<PriceInfo[]> {
        return axios.post(`${this._baseHost}/api/order-books/analytics/prices`, {
            identifiers: identifiers,
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

    public ticks(orderBook: OrderBook, resolution: TickInterval, fromTime?: number, toTime?: number): Promise<Tick[]> {
        let url: string = `${this._baseHost}/api/order-books/${orderBook.identifier}/ticks?resolution=${resolution}`;

        if (fromTime) {
            url += `&fromTime=${fromTime}`;
        }
        if (toTime) {
            url += `&toTime=${toTime}`;
        }

        return axios.get(url).then((response: any) => {
            return response.data.map((tick: any) => {
                tick.time *= 1000;

                return tick;
            });
        });
    }

}
