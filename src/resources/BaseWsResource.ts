import { WsMessage } from '../ws.types';

export abstract class BaseWsResource {

    abstract fromWebsocketMessage(message: WsMessage): any;

}
