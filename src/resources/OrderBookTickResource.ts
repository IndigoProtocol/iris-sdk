import { BaseWsResource } from './BaseWsResource';
import { WsOrderBookTick } from '../ws.types';
import { OrderBookResource } from './OrderBookResource';
import { OrderBook } from '../models/OrderBook';
import { Tick } from '../models/Tick';

export class OrderBookTickResource extends BaseWsResource {

    fromWebsocketMessage(message: WsOrderBookTick): Tick {
        return new Tick(
            message.oB ? (new OrderBookResource()).fromWebsocketMessage(message.oB) as OrderBook : null,
            message.r,
            message.ti * 1000,
            message.o,
            message.h,
            message.l,
            message.c,
            message.v,
        );
    }

}
