import { Asset, Token } from '../models/Asset';
import { LiquidityPoolState } from '../models/LiquidityPoolState';
import { LiquidityPool } from '../models/LiquidityPool';
import { LiquidityPoolResponse } from '../types';

export class BaseApiService {

    protected _baseUrl: string;

    constructor(baseUrl: string) {
        this._baseUrl = baseUrl;
    }

    protected responseToLiquidityPool(poolResponse: LiquidityPoolResponse): LiquidityPool {
        const tokenA: Token = poolResponse.tokenA
            ? new Asset(poolResponse.tokenA.policyId, poolResponse.tokenA.nameHex, poolResponse.tokenA.decimals, poolResponse.tokenA.isVerified, poolResponse.tokenA.isLpToken, poolResponse.tokenA.name, poolResponse.tokenA.ticker, poolResponse.tokenA.logo, poolResponse.tokenA.description)
            : 'lovelace';
        const tokenB: Asset = new Asset(poolResponse.tokenB.policyId, poolResponse.tokenB.nameHex, poolResponse.tokenB.decimals, poolResponse.tokenB.isVerified, poolResponse.tokenB.isLpToken, poolResponse.tokenB.name, poolResponse.tokenB.ticker, poolResponse.tokenB.logo, poolResponse.tokenB.description);
        const lpToken: Asset | undefined = poolResponse.lpToken
            ? new Asset(poolResponse.lpToken.policyId, poolResponse.lpToken.nameHex, poolResponse.lpToken.decimals)
            : undefined;
        const state: LiquidityPoolState | undefined = poolResponse.state
            ? new LiquidityPoolState(
                poolResponse.state.reserveA,
                poolResponse.state.reserveB,
                poolResponse.state.lpTokens,
                poolResponse.state.feePercent,
                poolResponse.state.tvl ?? 0n,
            )
            : undefined;

        return new LiquidityPool(
            poolResponse.dex,
            poolResponse.identifier,
            poolResponse.address,
            tokenA,
            tokenB,
            poolResponse.createdSlot,
            lpToken,
            state,
        );
    }

}
