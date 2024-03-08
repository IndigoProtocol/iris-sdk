import { BaseWsResource } from './BaseWsResource';
import { WsOrderBookMatch } from '../ws.types';
import { AssetResource } from './AssetResource';
import { OrderBookMatch } from '../models/OrderBookMatch';
import { OrderBookOrderResource } from './OrderBookOrderResource';
import { OrderBookResource } from './OrderBookResource';

export class OrderBookMatchResource extends BaseWsResource {

    fromWebsocketMessage(message: WsOrderBookMatch): OrderBookMatch {
        const assetResource: AssetResource = new AssetResource();
        const orderResource: OrderBookOrderResource = new OrderBookOrderResource();
        const orderBookResource: OrderBookResource = new OrderBookResource();

        return new OrderBookMatch(
            message.oB ? orderBookResource.fromWebsocketMessage(message.oB) : null,
            orderResource.fromWebsocketMessage(message.rO),
            message.fT ? assetResource.fromWebsocketMessage(message.fT) : 'lovelace',
            BigInt(message.mA),
            message.pkh,
            message.skh,
            Number(message.s),
            message.tH,
            Number(message.oI),
        );
    }

}
