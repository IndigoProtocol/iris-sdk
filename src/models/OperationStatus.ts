import { Statusable } from './Statusable';

export class OperationStatus {

    constructor(
        public entity: Statusable | null,
        public status: number,
        public slot: number,
        public txHash: string,
        public outputIndex: number,
        public operationTxHash: string,
        public operationOutputIndex: number,
    ) {
    }

}
