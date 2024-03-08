import { BaseWsResource } from './BaseWsResource';
import { WsSync } from '../ws.types';
import { Sync } from '../models/Sync';

export class SyncResource extends BaseWsResource {

    fromWebsocketMessage(message: WsSync): Sync {
        return new Sync(
            Number(message.s),
            message.bH,
        );
    }

}
