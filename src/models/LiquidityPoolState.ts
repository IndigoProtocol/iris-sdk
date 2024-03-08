import { LiquidityPool } from './LiquidityPool';
import { Asset } from './Asset';

export class LiquidityPoolState {

    constructor(
        public reserveA: bigint,
        public reserveB: bigint,
        public lpTokens: bigint,
        public feePercent: number,
        public tvl: bigint,
        public pool?: LiquidityPool,
        public lpToken?: Asset
    ) {
    }

}
