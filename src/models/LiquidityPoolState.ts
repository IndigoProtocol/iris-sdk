import { LiquidityPool } from './LiquidityPool';
import { Asset } from './Asset';

export class LiquidityPoolState {

    public reserveA: bigint;
    public reserveB: bigint;
    public lpTokens: bigint;
    public feePercent: number;
    public tvl: bigint;
    public liquidityPool: LiquidityPool | undefined;
    public lpToken: Asset | undefined;

    constructor(reserveA: bigint, reserveB: bigint, lpTokens: bigint, feePercent: number, tvl: bigint, pool?: LiquidityPool, lpToken?: Asset) {
        this.reserveA = reserveA;
        this.reserveB = reserveB;
        this.lpTokens = lpTokens;
        this.feePercent = feePercent;
        this.tvl = tvl;
        this.liquidityPool = pool;
        this.lpToken = lpToken;
    }

}
