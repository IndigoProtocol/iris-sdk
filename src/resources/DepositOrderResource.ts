import { BaseWsResource } from './BaseWsResource';
import { WsLiquidityPoolDesposit, WsOperationStatus } from '../ws.types';
import { AssetResource } from './AssetResource';
import { OperationStatusResource } from './OperationStatusResource';
import { LiquidityPool } from '../models/LiquidityPool';
import { LiquidityPoolResource } from './LiquidityPoolResource';
import { DepositOrder } from '../models/DepositOrder';

export class DepositOrderResource extends BaseWsResource {

    fromWebsocketMessage(message: WsLiquidityPoolDesposit): DepositOrder {
        const assetResource: AssetResource = new AssetResource();
        const operationStatusResource: OperationStatusResource = new OperationStatusResource();

        const liquidityPool: LiquidityPool | undefined = message.lp
            ? (new LiquidityPoolResource()).fromWebsocketMessage(message.lp)
            : undefined;

        return new DepositOrder(
            message.dAT ? assetResource.fromWebsocketMessage(message.dAT) : 'lovelace',
            message.dBT ? assetResource.fromWebsocketMessage(message.dBT) : 'lovelace',
            BigInt(message.dAA),
            BigInt(message.dBA),
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
