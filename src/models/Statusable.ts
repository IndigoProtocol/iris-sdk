import { DexOperationStatus } from '../enum';
import { OperationStatus } from './OperationStatus';

export class Statusable {

    public statuses: OperationStatus[];

    constructor(statuses: OperationStatus[]) {
        this.statuses = statuses;
    }

    get placedStatus(): OperationStatus | undefined {
        return this.statuses.find((status: OperationStatus) => status.status === DexOperationStatus.OnChain);
    }

    get settledStatus(): OperationStatus | undefined {
        return this.statuses.find((status: OperationStatus) => [DexOperationStatus.Complete, DexOperationStatus.Cancelled].includes(status.status));
    }

    get latestStatus(): OperationStatus {
        return this.statuses.sort((a: OperationStatus, b: OperationStatus) => b.status - a.status)[0];
    }

}
