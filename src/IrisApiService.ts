import { AssetService } from './api/AssetService';
import { DexService } from './api/DexService';
import { ConnectionService } from './api/ConnectionService';
import { OrdersService } from './api/OrdersService';
import { LiquidityPoolService } from './api/LiquidityPoolService';
import { SyncService } from './api/SyncService';
import { OrderBookService } from './api/OrderBookService';

export class IrisApiService {

    private readonly _baseHost: string;

    constructor(baseHost: string) {
        this._baseHost = baseHost;
    }

    public connection(): ConnectionService {
        return new ConnectionService(this._baseHost);
    }

    public sync(): SyncService {
        return new SyncService(this._baseHost);
    }

    public dex(): DexService {
        return new DexService(this._baseHost);
    }

    public assets(): AssetService {
        return new AssetService(this._baseHost);
    }

    public liquidityPools(): LiquidityPoolService {
        return new LiquidityPoolService(this._baseHost);
    }

    public orders(): OrdersService {
        return new OrdersService(this._baseHost);
    }

    public orderBooks(): OrderBookService {
        return new OrderBookService(this._baseHost);
    }

}
