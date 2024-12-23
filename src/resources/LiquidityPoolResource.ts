import { BaseWsResource } from './BaseWsResource';
import { WsLiquidityPool } from '../ws.types';
import { LiquidityPool } from '../models/LiquidityPool';
import { AssetResource } from './AssetResource';
import { LiquidityPoolStateResource } from './LiquidityPoolStateResource';
import { LiquidityPoolState } from '../models/LiquidityPoolState';

export class LiquidityPoolResource extends BaseWsResource {

    fromWebsocketMessage(message: WsLiquidityPool): LiquidityPool {
        const assetResource: AssetResource = new AssetResource();

        const state: LiquidityPoolState | undefined = message.s
            ? (new LiquidityPoolStateResource()).fromWebsocketMessage(message.s)
            : undefined;

        return new LiquidityPool(
            message.d,
            message.i,
            message.a,
            message.oA,
            message.tA ? assetResource.fromWebsocketMessage(message.tA) : 'lovelace',
            assetResource.fromWebsocketMessage(message.tB),
            Number(message.cS),
            undefined,
            state,
            message.m,
        );
    }

}
