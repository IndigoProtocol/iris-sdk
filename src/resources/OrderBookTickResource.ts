import { BaseWsResource } from './BaseWsResource';
import { WsOrderBookTick } from '../ws.types';
import { Tick } from '../api.types';

export class OrderBookTickResource extends BaseWsResource {

    fromWebsocketMessage(message: WsOrderBookTick): Tick {
        return {
            time: message.ti,
            open: message.o,
            high: message.h,
            low: message.l,
            close: message.c,
            volume: message.v,
        };
    }

}
