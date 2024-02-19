import { BaseWsResource } from './BaseWsResource';
import { WsOrderBookOrder } from '../ws.types';
import { AssetResource } from './AssetResource';
import { OrderBookOrder } from '../models/OrderBookOrder';

export class OrderBookOrderResource extends BaseWsResource {

    fromWebsocketMessage(message: WsOrderBookOrder): OrderBookOrder {
        const assetResource: AssetResource = new AssetResource();

        return new OrderBookOrder(
            message.i,
            message.fT ? assetResource.fromWebsocketMessage(message.fT) : 'lovelace',
            message.tT ? assetResource.fromWebsocketMessage(message.tT) : 'lovelace',
            BigInt(message.oA),
            BigInt(message.uA),
            BigInt(message.aA),
            Number(message.p),
            Number(message.pF),
            BigInt(message.fP),
            message.pkh,
            message.skh,
            Number(message.s),
            message.tH,
            Number(message.oI),
        );
    }

}
