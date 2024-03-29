import { Asset, Token } from './Asset';
import { LiquidityPoolState } from './LiquidityPoolState';

export class LiquidityPool {

    constructor(
        public dex: string,
        public identifier: string,
        public address: string,
        public orderAddress: string,
        public tokenA: Token,
        public tokenB: Asset,
        public createdSlot: number,
        public lpToken?: Asset,
        public state?: LiquidityPoolState
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

    get price(): number {
        if (! this.state) return 0;

        const assetADecimals: number = this.tokenA === 'lovelace' ? 6 : (this.tokenA.decimals ?? 0);
        const assetBDecimals: number = this.tokenB.decimals ?? 0;

        const adjustedReserveA: number = Number(this.state.reserveA) / (10**assetADecimals);
        const adjustedReserveB: number = Number(this.state.reserveB) / (10**assetBDecimals);

        return adjustedReserveA / adjustedReserveB;
    }

}
