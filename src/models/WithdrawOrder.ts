import { LiquidityPool } from './LiquidityPool';
import { OperationStatus } from './OperationStatus';
import { Statusable } from './Statusable';
import { Asset } from './Asset';

export class WithdrawOrder extends Statusable {

    public lpToken: Asset;
    public lpTokenAmount: bigint;
    public minReceiveA: bigint;
    public minReceiveB: bigint;
    public dexFeesPaid: bigint;
    public senderPubKeyHash: string;
    public senderStakeKeyHash: string | null;
    public liquidityPool?: LiquidityPool | null;

    constructor(
        lpToken: Asset,
        lpTokenAmount: bigint,
        minReceiveA: bigint,
        minReceiveB: bigint,
        dexFeesPaid: bigint,
        senderPubKeyHash: string,
        senderStakeKeyHash: string | null,
        statuses: OperationStatus[],
        liquidityPool?: LiquidityPool | null,
    ) {
        super(statuses);

        this.lpToken = lpToken;
        this.lpTokenAmount = lpTokenAmount;
        this.minReceiveA = minReceiveA;
        this.minReceiveB = minReceiveB;
        this.dexFeesPaid = dexFeesPaid;
        this.senderPubKeyHash = senderPubKeyHash;
        this.senderStakeKeyHash = senderStakeKeyHash;
        this.liquidityPool = liquidityPool;
    }

}
