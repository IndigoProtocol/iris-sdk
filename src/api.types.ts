import { Asset } from './models/Asset';
import { LiquidityPool } from './models/LiquidityPool';
import { OrderBook } from './models/OrderBook';

export interface PaginationParams {
    page: number,
    limit: number,
}

export type Pagination = {
    page: number,
    limit: number,
    totalPages: number,
}

export type PaginatedResponse = {
    data: any,
    pagination: Pagination,
}

export type OrderFilters = {
    type?: string,
    asset?: Asset,
    poolIdentifier?: string,
}

export type DexMetadata = {
    name: string,
    type: string,
    website: string,
    image: string,
    color: string,
}

export type OrderRouteBreakdown = {
    swapInAmount: number,
    splitPercentage: number,
    poolFeePercent: number,
    estimatedReceive: number,
    priceImpactPercent: number,
    dexFees: number,
    liquidityPool: LiquidityPoolResponse,
}

export type OrderRouteResult = {
    [dex: string]: OrderRouteBreakdown,
}

export type OrderRouteResults = {
    totalSwapInAmount: number,
    totalEstimatedReceive: number,
    results: OrderRouteResult,
}

export type LimiterResult = {
    swapInAmount: number,
    estimatedReceive: number,
    percentAllocated: number,
    dexFees: number,
    price: number,
}

export type LimiterResults = {
    totalSwapInAmount: number,
    totalEstimatedReceive: number,
    liquidityPool: LiquidityPoolResponse,
    results: LimiterResult[],
}

export type AssetResponse = {
    policyId: string,
    nameHex: string,
    decimals: number | null,
    isVerified: boolean,
    isLpToken: boolean,
    name: string,
    ticker: string,
    logo: string,
    description: string,
}

export type LiquidityPoolStateResponse = {
    reserveA: bigint,
    reserveB: bigint,
    lpTokens: bigint,
    tvl: bigint,
    feePercent: number,
}

export type LiquidityPoolResponse = {
    dex: string,
    identifier: string,
    address: string,
    tokenA: AssetResponse | null,
    tokenB: AssetResponse,
    createdSlot: number,
    lpToken: AssetResponse,
    state: LiquidityPoolStateResponse,
}

export type OrderBookResponse = {
    dex: string,
    identifier: string,
    tokenA: AssetResponse | null,
    tokenB: AssetResponse,
    createdSlot: number,
}

export type OrderBookOrderResponse = {
    fromToken: AssetResponse | null,
    toToken: AssetResponse | null,
    identifier: string,
    originalOfferAmount: bigint,
    unFilledOfferAmount: bigint,
    askedAmount: bigint,
    price: number,
    numPartialFills: number,
    isCancelled: boolean,
    dexFeesPaid: bigint,
    senderPubKeyHash: string,
    senderStakeKeyHash: string | null,
    slot: number,
    txHash: string,
    outputIndex: number,
}

export type OperationStatusResponse = {
    status: number,
    slot: number,
    txHash: string,
    outputIndex: number,
    operationTxHash: string,
    operationOutputIndex: number,
}

export type SwapOrderResponse = {
    swapInToken: AssetResponse | null,
    swapOutToken: AssetResponse | null,
    orderType: number,
    swapInAmount: bigint,
    minReceive: bigint,
    actualReceive: bigint | null,
    dexFeesPaid: bigint,
    senderPubKeyHash: string,
    senderStakeKeyHash: string | null,
    txHash: string,
    outputIndex: number,
    statuses: OperationStatusResponse[],
    liquidityPool: LiquidityPoolResponse,
}

export type DepositOrderResponse = {
    depositAToken: AssetResponse | null,
    depositBToken: AssetResponse | null,
    depositAAmount: bigint,
    depositBAmount: bigint,
    dexFeesPaid: bigint,
    senderPubKeyHash: string,
    senderStakeKeyHash: string | null,
    statuses: OperationStatusResponse[],
    txHash: string,
    outputIndex: number,
    liquidityPool: LiquidityPoolResponse,
};

export type WithdrawOrderResponse = {
    lpToken: AssetResponse,
    lpTokenAmount: bigint,
    minReceiveA: bigint,
    minReceiveB: bigint,
    dexFeesPaid: bigint,
    senderPubKeyHash: string,
    senderStakeKeyHash: string | null,
    statuses: OperationStatusResponse[],
    txHash: string,
    outputIndex: number,
    liquidityPool: LiquidityPoolResponse,
}

export type PriceInfo = {
    identifier: string,
    price: number,
    dayLow: number,
    dayHigh: number,
    dayChange: number,
    hourChange: number,
}