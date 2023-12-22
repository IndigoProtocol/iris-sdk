import { BaseWsResource } from './BaseWsResource';
import { WsLiquidityPoolState } from '../ws.types';
import { LiquidityPool } from '../models/LiquidityPool';
import { AssetResource } from './AssetResource';
import { LiquidityPoolState } from '../models/LiquidityPoolState';
import { LiquidityPoolResource } from './LiquidityPoolResource';
import { Asset } from '../models/Asset';

export class LiquidityPoolStateResource extends BaseWsResource {

    fromWebsocketMessage(message: WsLiquidityPoolState): LiquidityPoolState {
        const liquidityPool: LiquidityPool | undefined = message.p
            ? (new LiquidityPoolResource()).fromWebsocketMessage(message.p)
            : undefined;

        const lpToken: Asset | undefined = message.tLp
            ? (new AssetResource()).fromWebsocketMessage(message.tLp)
            : undefined;

        return new LiquidityPoolState(
            BigInt(message.rA),
            BigInt(message.rB),
            BigInt(message.lpTs),
            Number(message.f),
            BigInt(message.tvl),
            liquidityPool,
            lpToken,
        );
    }

}
