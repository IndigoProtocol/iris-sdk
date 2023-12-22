import { OperationStatus } from '@/models/OperationStatus';
import { Token } from '@/models/Asset';
import { Statusable } from '@/models/Statusable';
import { LiquidityPool } from '@/models/LiquidityPool';

export class DepositOrder extends Statusable {

    public depositAToken: Token;
    public depositBToken: Token;
    public depositAAmount: bigint;
    public depositBAmount: bigint;
    public dexFeesPaid: bigint;
    public senderPubKeyHash: string;
    public senderStakeKeyHash: string | null;
    public liquidityPool?: LiquidityPool | null;

    constructor(
        depositAToken: Token,
        depositBToken: Token,
        depositAAmount: bigint,
        depositBAmount: bigint,
        dexFeesPaid: bigint,
        senderPubKeyHash: string,
        senderStakeKeyHash: string | null,
        statuses: OperationStatus[],
        liquidityPool?: LiquidityPool | null,
    ) {
        super(statuses);

        this.depositAToken = depositAToken;
        this.depositBToken = depositBToken;
        this.depositAAmount = depositAAmount;
        this.depositBAmount = depositBAmount;
        this.dexFeesPaid = dexFeesPaid;
        this.senderPubKeyHash = senderPubKeyHash;
        this.senderStakeKeyHash = senderStakeKeyHash;
        this.liquidityPool = liquidityPool;
    }

}
