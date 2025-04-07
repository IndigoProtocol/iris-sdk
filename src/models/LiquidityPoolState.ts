import { LiquidityPool } from './LiquidityPool';
import { Asset } from './Asset';

export class LiquidityPoolState {

    constructor(
        public reserveA: bigint,
        public reserveB: bigint,
        public lpTokens: bigint,
        public buyFeePercent: number,
        public sellFeePercent: number,
        public tvl: bigint,
        public slot: number,
        public pool?: LiquidityPool,
        public lpToken?: Asset
    ) {
    }

}
