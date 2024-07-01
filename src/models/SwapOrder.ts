import { Token } from './Asset';
import { LiquidityPool } from './LiquidityPool';
import { tokenDecimals, tokenId } from '../utils';
import { Statusable } from './Statusable';
import { OperationStatus } from './OperationStatus';

export class SwapOrder extends Statusable {

    constructor(
        public swapInToken: Token,
        public swapOutToken: Token,
        public orderType: number,
        public swapInAmount: bigint,
        public minReceive: bigint,
        public actualReceive: bigint | null,
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

    get price(): number {
        if (! this.liquidityPool) return 0;

        // Buy
        if (tokenId(this.swapInToken) === tokenId(this.liquidityPool.tokenA)) {
            return (Number(this.swapInAmount) / 10**tokenDecimals(this.swapInToken ?? 'lovelace'))
                / (Number(this.actualReceive ?? this.minReceive) / 10**tokenDecimals(this.swapOutToken ?? 'lovelace'));
        }

        // Sell
        return (Number(this.actualReceive ?? this.minReceive) / 10**tokenDecimals(this.swapOutToken ?? 'lovelace'))
            / (Number(this.swapInAmount) / 10**tokenDecimals(this.swapInToken ?? 'lovelace'));
    }

}
