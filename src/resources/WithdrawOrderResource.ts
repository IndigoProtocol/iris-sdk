import { BaseWsResource } from './BaseWsResource';
import { WsLiquidityPoolWithdraw, WsOperationStatus } from '../ws.types';
import { AssetResource } from './AssetResource';
import { OperationStatusResource } from './OperationStatusResource';
import { LiquidityPool } from '../models/LiquidityPool';
import { LiquidityPoolResource } from './LiquidityPoolResource';
import { WithdrawOrder } from '../models/WithdrawOrder';

export class WithdrawOrderResource extends BaseWsResource {

    fromWebsocketMessage(message: WsLiquidityPoolWithdraw): WithdrawOrder {
        const assetResource: AssetResource = new AssetResource();
        const operationStatusResource: OperationStatusResource = new OperationStatusResource();

        const liquidityPool: LiquidityPool | undefined = message.lp
            ? (new LiquidityPoolResource()).fromWebsocketMessage(message.lp)
            : undefined;

        return new WithdrawOrder(
            assetResource.fromWebsocketMessage(message.lpT),
            BigInt(message.lpA),
            BigInt(message.mA),
            BigInt(message.mB),
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
