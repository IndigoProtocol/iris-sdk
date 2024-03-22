import { LiquidityPool } from './LiquidityPool';
import { OperationStatus } from './OperationStatus';
import { Statusable } from './Statusable';
import { Asset } from './Asset';

export class WithdrawOrder extends Statusable {

    constructor(
        public lpToken: Asset,
        public lpTokenAmount: bigint,
        public minReceiveA: bigint,
        public minReceiveB: bigint,
        public dexFeesPaid: bigint,
        public senderPubKeyHash: string,
        public senderStakeKeyHash: string | null,
        public statuses: OperationStatus[],
        public txHash: string,
        public outputIndex: number,
        public liquidityPool?: LiquidityPool | null,
    ) {
        super(statuses);
    }

}
