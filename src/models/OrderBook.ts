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

    get readableTokenAName(): string {
        return this.tokenA === 'lovelace'
            ? 'ADA'
            : this.tokenA.readableName;
    }

    get readableTokenATicker(): string {
        return this.tokenA === 'lovelace'
            ? 'ADA'
            : (this.tokenA.readableTicker !== '' ? this.tokenA.readableTicker : this.tokenA.readableName);
    }

}
