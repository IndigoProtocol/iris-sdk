import { BaseWsResource } from './BaseWsResource';
import { WsSync } from '../ws.types';
import { Sync } from '../api.types';

export class SyncResource extends BaseWsResource {

    fromWebsocketMessage(message: WsSync): Sync {
        return {
            slot: Number(message.s),
            blockHash: message.bH,
        };
    }

}
