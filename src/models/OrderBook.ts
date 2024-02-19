import { Asset, Token } from './Asset';

export class OrderBook {

    constructor(
        public dex: string,
        public identifier: string,
        public tokenA: Token,
        public tokenB: Asset,
        public createdSlot: number,
    ) {
    }

}
