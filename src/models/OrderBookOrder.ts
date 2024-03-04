import { Token } from './Asset';

export class OrderBookOrder {

    constructor(
        public identifier: string,
        public fromToken: Token,
        public toToken: Token,
        public originalOfferAmount: bigint,
        public unFilledOfferAmount: bigint,
        public askedAmount: bigint,
        public price: number,
        public numPartialFills: number,
        public isCancelled: boolean,
        public dexFeesPaid: bigint,
        public senderPubKeyHash: string,
        public senderStakeKeyHash: string | null,
        public slot: number,
        public txHash: string,
        public outputIndex: number,
    ) {
    }

}
