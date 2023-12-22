import { BaseWsResource } from './BaseWsResource';
import { WsLiquidityPoolSwap, WsOperationStatus } from '../ws.types';
import { SwapOrder } from '../models/SwapOrder';
import { AssetResource } from './AssetResource';
import { OperationStatusResource } from './OperationStatusResource';
import { LiquidityPool } from '../models/LiquidityPool';
import { LiquidityPoolResource } from './LiquidityPoolResource';

export class SwapOrderResource extends BaseWsResource {

    fromWebsocketMessage(message: WsLiquidityPoolSwap): SwapOrder {
        const assetResource: AssetResource = new AssetResource();
        const operationStatusResource: OperationStatusResource = new OperationStatusResource();

        const liquidityPool: LiquidityPool | undefined = message.lp
            ? (new LiquidityPoolResource()).fromWebsocketMessage(message.lp)
            : undefined;

        return new SwapOrder(
            message.siT ? assetResource.fromWebsocketMessage(message.siT) : 'lovelace',
            message.soT ? assetResource.fromWebsocketMessage(message.soT) : 'lovelace',
            message.oI,
            BigInt(message.iA),
            BigInt(message.mR),
            message.aR ? BigInt(message.aR) : null,
            BigInt(message.fP),
            message.pkh,
            message.skh,
            message.st
                ? message.st.map((status: WsOperationStatus) => operationStatusResource.fromWebsocketMessage(status))
                : [],
            liquidityPool,
        );
    }

}
