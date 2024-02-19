import { BaseWsResource } from './BaseWsResource';
import { WsOrderBook } from '../ws.types';
import { AssetResource } from './AssetResource';
import { OrderBook } from '../models/OrderBook';

export class OrderBookResource extends BaseWsResource {

    fromWebsocketMessage(message: WsOrderBook): OrderBook {
        const assetResource: AssetResource = new AssetResource();

        return new OrderBook(
            message.d,
            message.i,
            message.tA ? assetResource.fromWebsocketMessage(message.tA) : 'lovelace',
            assetResource.fromWebsocketMessage(message.tB),
            Number(message.cS),
        );
    }

}
