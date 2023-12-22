export class OperationStatus {

    public status: number;
    public slot: number;
    public txHash: string;
    public outputIndex: number;

    constructor(
        status: number,
        slot: number,
        txHash: string,
        outputIndex: number,
    ) {
        this.status = status;
        this.slot = slot;
        this.txHash = txHash;
        this.outputIndex = outputIndex;
    }

}
