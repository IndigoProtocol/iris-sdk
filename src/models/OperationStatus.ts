export class OperationStatus {

    public status: number;
    public slot: number;
    public txHash: string;
    public outputIndex: number;
    public operationTxHash: string;
    public operationOutputIndex: number;

    constructor(
        status: number,
        slot: number,
        txHash: string,
        outputIndex: number,
        operationTxHash: string,
        operationOutputIndex: number,
    ) {
        this.status = status;
        this.slot = slot;
        this.txHash = txHash;
        this.outputIndex = outputIndex;
        this.operationTxHash = operationTxHash;
        this.operationOutputIndex = operationOutputIndex;
    }

}
