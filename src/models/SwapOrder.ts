import { Token } from './Asset';
import { LiquidityPool } from './LiquidityPool';
import { tokenDecimals, tokenId } from '../utils';
import { Statusable } from './Statusable';
import { OperationStatus } from './OperationStatus';

export class SwapOrder extends Statusable {

    public swapInToken: Token;
    public swapOutToken: Token;
    public orderType: number;
    public swapInAmount: bigint;
    public minReceive: bigint;
    public actualReceive: bigint | null;
    public dexFeesPaid: bigint;
    public senderPubKeyHash: string;
    public senderStakeKeyHash: string | null;
    public txHash: string;
    public outputIndex: number;
    public liquidityPool?: LiquidityPool | null;
    public statuses: OperationStatus[];

    constructor(
        swapInToken: Token,
        swapOutToken: Token,
        orderType: number,
        swapInAmount: bigint,
        minReceive: bigint,
        actualReceive: bigint | null,
        dexFeesPaid: bigint,
        senderPubKeyHash: string,
        senderStakeKeyHash: string | null,
        statuses: OperationStatus[],
        txHash: string,
        outputIndex: number,
        liquidityPool?: LiquidityPool | null,
    ) {
        super(statuses);

        this.swapInToken = swapInToken;
        this.swapOutToken = swapOutToken;
        this.orderType = orderType;
        this.swapInAmount = swapInAmount;
        this.minReceive = minReceive;
        this.actualReceive = actualReceive;
        this.dexFeesPaid = dexFeesPaid;
        this.senderPubKeyHash = senderPubKeyHash;
        this.senderStakeKeyHash = senderStakeKeyHash;
        this.txHash = txHash;
        this.outputIndex = outputIndex;
        this.statuses = statuses;
        this.liquidityPool = liquidityPool;
    }

    get price(): number {
        if (! this.liquidityPool || ! this.actualReceive) return 0;

        // Buy
        if (tokenId(this.swapInToken) === tokenId(this.liquidityPool.tokenA)) {
            return (Number(this.swapInAmount) / 10**tokenDecimals(this.swapInToken ?? 'lovelace'))
                / (Number(this.actualReceive) / 10**tokenDecimals(this.swapOutToken ?? 'lovelace'));
        }

        // Sell
        return (Number(this.actualReceive) / 10**tokenDecimals(this.swapOutToken ?? 'lovelace'))
            / (Number(this.swapInAmount) / 10**tokenDecimals(this.swapInToken ?? 'lovelace'));
    }

}
