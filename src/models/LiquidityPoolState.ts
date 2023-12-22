export class LiquidityPoolState {

    public reserveA: bigint;
    public reserveB: bigint;
    public lpTokens: bigint;
    public feePercent: number;
    public tvl: bigint;

    constructor(reserveA: bigint, reserveB: bigint, lpTokens: bigint, feePercent: number, tvl: bigint) {
        this.reserveA = reserveA;
        this.reserveB = reserveB;
        this.lpTokens = lpTokens;
        this.feePercent = feePercent;
        this.tvl = tvl;
    }

}
