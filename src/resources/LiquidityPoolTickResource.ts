import { BaseWsResource } from './BaseWsResource';
import { WsLiquidityPoolTick } from '../ws.types';
import { LiquidityPoolResource } from './LiquidityPoolResource';
import { LiquidityPool } from '../models/LiquidityPool';
import { Tick } from '../models/Tick';

export class LiquidityPoolTickResource extends BaseWsResource {

    fromWebsocketMessage(message: WsLiquidityPoolTick): Tick {
        return new Tick(
            message.lP ? (new LiquidityPoolResource()).fromWebsocketMessage(message.lP) as LiquidityPool : null,
            message.r,
            message.ti * 1000,
            message.o,
            message.h,
            message.l,
            message.c,
            message.v,
        );
    }

}
