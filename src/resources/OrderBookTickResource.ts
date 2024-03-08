import { BaseWsResource } from './BaseWsResource';
import { WsOrderBookTick } from '../ws.types';
import { Tick } from '../api.types';
import { OrderBookResource } from './OrderBookResource';
import { OrderBook } from '../models/OrderBook';

export class OrderBookTickResource extends BaseWsResource {

    fromWebsocketMessage(message: WsOrderBookTick): Tick {
        return  {
            entity: message.oB ? (new OrderBookResource()).fromWebsocketMessage(message.oB) as OrderBook : null,
            time: message.ti,
            open: message.o,
            high: message.h,
            low: message.l,
            close: message.c,
            volume: message.v,
        };
    }

}
