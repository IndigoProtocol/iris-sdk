import { BaseWsResource } from './BaseWsResource';
import { WsAsset } from '../ws.types';
import { Asset } from '../models/Asset';

export class AssetResource extends BaseWsResource {

    fromWebsocketMessage(message: WsAsset): Asset {
        return new Asset(
            message.pId,
            message.nH,
            Number(message.d),
            message.v,
            message.isLp,
            message.n,
            message.ti,
            message.l,
            message.de,
        );
    }

}
