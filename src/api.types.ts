import { Asset } from './models/Asset';

export interface PaginationParams {
    page: number,
    limit: number,
}

export type Pagination = {
    page: number,
    limit: number,
    totalPages: number,
}

export type PaginatedResponse<T> = {
    data: T[],
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
    meta?: string,
}

export type LiquidityPoolStateResponse = {
    reserveA: bigint,
    reserveB: bigint,
    lpTokens: bigint,
    tvl: bigint,
    feePercent: number,
    slot: number,
    liquidityPool?: LiquidityPoolResponse,
}

export type LiquidityPoolResponse = {
    dex: string,
    identifier: string,
    address: string,
    orderAddress: string,
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
    meta?: string,
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
    slot: number,
    statuses: OperationStatusResponse[],
    liquidityPool: LiquidityPoolResponse,
    meta?: string,
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
    slot: number,
    liquidityPool: LiquidityPoolResponse,
    meta?: string,
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
    slot: number,
    liquidityPool: LiquidityPoolResponse,
    meta?: string,
}

export type PriceInfo = {
    identifier: string,
    price: number,
    dayLow: number,
    dayHigh: number,
    dayChange: number,
    hourChange: number,
}