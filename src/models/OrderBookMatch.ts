import { Token } from './Asset';
import { OrderBook } from './OrderBook';
import { OrderBookOrder } from './OrderBookOrder';

export class OrderBookMatch {

    constructor(
        public orderBook: OrderBook | null,
        public referenceOrder: OrderBookOrder,
        public fromToken: Token,
        public matchedAmount: bigint,
        public senderPubKeyHash: string,
        public senderStakeKeyHash: string | null,
        public slot: number,
        public txHash: string,
        public outputIndex: number,
        public meta?: any,
    ) {
    }

}
