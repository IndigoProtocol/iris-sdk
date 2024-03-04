import { BaseWsResource } from './BaseWsResource';
import { WsOperationStatus } from '../ws.types';
import { OperationStatus } from '../models/OperationStatus';

export class OperationStatusResource extends BaseWsResource {

    fromWebsocketMessage(message: WsOperationStatus): OperationStatus {
        return new OperationStatus(
            message.st,
            message.s,
            message.tH,
            message.oI,
            message.oTx,
            message.oOi,
        );
    }

}
