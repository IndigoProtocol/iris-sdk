import { Token } from './Asset';
import { LiquidityPool } from './LiquidityPool';
import { OperationStatus } from './OperationStatus';
import { Statusable } from './Statusable';

export class DepositOrder extends Statusable {

    constructor(
        public depositAToken: Token,
        public depositBToken: Token,
        public depositAAmount: bigint,
        public depositBAmount: bigint,
        public dexFeesPaid: bigint,
        public senderPubKeyHash: string,
        public senderStakeKeyHash: string | null,
        public statuses: OperationStatus[],
        public txHash: string,
        public outputIndex: number,
        public slot: number,
        public liquidityPool?: LiquidityPool | null,
        public meta?: any,
    ) {
        super(statuses);
    }

}
