import { BaseWsResource } from './BaseWsResource';
import { WsOperationStatus } from '../ws.types';
import { OperationStatus } from '../models/OperationStatus';
import { Statusable } from '../models/Statusable';
import { WsEvent } from '../enums';
import { SwapOrderResource } from './SwapOrderResource';
import { DepositOrderResource } from './DepositOrderResource';
import { WithdrawOrderResource } from './WithdrawOrderResource';

export class OperationStatusResource extends BaseWsResource {

    fromWebsocketMessage(message: WsOperationStatus): OperationStatus {
        let entity: Statusable | null = null;

        if (message.oE) {
            switch (message.oE.t) {
                case WsEvent.LiquidityPoolSwap:
                    entity = (new SwapOrderResource()).fromWebsocketMessage(message.oE);
                    break;
                case WsEvent.LiquidityPoolDeposit:
                    entity = (new DepositOrderResource()).fromWebsocketMessage(message.oE);
                    break;
                case WsEvent.LiquidityPoolWithdraw:
                    entity = (new WithdrawOrderResource()).fromWebsocketMessage(message.oE);
                    break;
            }
        }

        return new OperationStatus(
            entity,
            message.st,
            message.s,
            message.tH,
            message.oI,
            message.oTx,
            message.oOi,
        );
    }

}
