import { LiquidityPool } from './LiquidityPool';
import { OrderBook } from './OrderBook';

export class Tick {

    constructor(
        public entity: LiquidityPool | OrderBook | null,
        public resolution: string,
        public time: number,
        public open: number,
        public high: number,
        public low: number,
        public close: number,
        public volume: number,
    ) {
    }

    get percent(): number {
        return ((this.close - this.open) / this.open) * 100;
    }

}
