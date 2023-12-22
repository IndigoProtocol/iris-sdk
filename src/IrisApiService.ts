import { AssetService } from './api/AssetService';
import { DexService } from './api/DexService';
import { ConnectionService } from './api/ConnectionService';
import { SwapService } from './api/SwapService';
import { OrdersService } from './api/OrdersService';
import { LiquidityPoolService } from './api/LiquidityPoolService';

export class IrisApiService {

    private readonly _baseUrl: string;

    constructor(baseUrl: string) {
        this._baseUrl = baseUrl;
    }

    public connection(): ConnectionService {
        return new ConnectionService(this._baseUrl);
    }

    public dex(): DexService {
        return new DexService(this._baseUrl);
    }

    public assets(): AssetService {
        return new AssetService(this._baseUrl);
    }

    public liquidityPools(): LiquidityPoolService {
        return new LiquidityPoolService(this._baseUrl);
    }

    public orders(): OrdersService {
        return new OrdersService(this._baseUrl);
    }

    public swap(): SwapService {
        return new SwapService(this._baseUrl);
    }

}
