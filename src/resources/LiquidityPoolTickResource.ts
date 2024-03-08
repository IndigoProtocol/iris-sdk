import { BaseWsResource } from './BaseWsResource';
import { WsLiquidityPoolTick } from '../ws.types';
import { Tick } from '../api.types';
import { LiquidityPoolResource } from './LiquidityPoolResource';
import { LiquidityPool } from '../models/LiquidityPool';

export class LiquidityPoolTickResource extends BaseWsResource {

    fromWebsocketMessage(message: WsLiquidityPoolTick): Tick {
        return {
            entity: message.lP ? (new LiquidityPoolResource()).fromWebsocketMessage(message.lP) as LiquidityPool : null,
            time: message.ti,
            open: message.o,
            high: message.h,
            low: message.l,
            close: message.c,
            volume: message.v,
        };
    }

}
