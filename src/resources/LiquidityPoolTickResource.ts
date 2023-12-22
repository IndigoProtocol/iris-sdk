import { BaseWsResource } from './BaseWsResource';
import { WsLiquidityPoolTick } from '../ws.types';
import { Tick } from '../api.types';

export class LiquidityPoolTickResource extends BaseWsResource {

    fromWebsocketMessage(message: WsLiquidityPoolTick): Tick {
        return {
            time: message.ti,
            open: message.o,
            high: message.h,
            low: message.l,
            close: message.c,
            volume: message.v,
        };
    }

}
