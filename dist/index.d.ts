declare class Asset {
    policyId: string;
    nameHex: string;
    decimals: number | null;
    isVerified: boolean;
    isLpToken: boolean;
    name: string | null;
    ticker: string | null;
    logo: string | null;
    description: string | null;
    meta?: any | undefined;
    constructor(policyId: string, nameHex: string, decimals?: number | null, isVerified?: boolean, isLpToken?: boolean, name?: string | null, ticker?: string | null, logo?: string | null, description?: string | null, meta?: any | undefined);
    get readableTicker(): string;
    get readableName(): string;
    identifier(dilimeter?: '' | '.'): string;
    static fromIdentifier(id: string, decimals?: number): Asset;
}
type Token = Asset | 'lovelace';

interface PaginationParams {
    page: number;
    limit: number;
}
type Pagination = {
    page: number;
    limit: number;
    totalPages: number;
};
type PaginatedResponse<T> = {
    data: T[];
    pagination: Pagination;
};
type OrderFilters = {
    type?: string;
    asset?: Asset;
    poolIdentifier?: string;
};
type DexMetadata = {
    name: string;
    type: string;
    website: string;
    image: string;
    color: string;
};
type AssetResponse = {
    policyId: string;
    nameHex: string;
    decimals: number | null;
    isVerified: boolean;
    isLpToken: boolean;
    name: string;
    ticker: string;
    logo: string;
    description: string;
    meta?: string;
};
type LiquidityPoolStateResponse = {
    reserveA: bigint;
    reserveB: bigint;
    lpTokens: bigint;
    tvl: bigint;
    buyFeePercent: number;
    sellFeePercent: number;
    slot: number;
    liquidityPool?: LiquidityPoolResponse;
    tokenLp: AssetResponse;
};
type LiquidityPoolResponse = {
    dex: string;
    identifier: string;
    address: string;
    orderAddress: string;
    tokenA: AssetResponse | null;
    tokenB: AssetResponse;
    createdSlot: number;
    state: LiquidityPoolStateResponse;
    meta?: string;
};
type OrderBookResponse = {
    dex: string;
    identifier: string;
    tokenA: AssetResponse | null;
    tokenB: AssetResponse;
    createdSlot: number;
};
type OrderBookOrderResponse = {
    fromToken: AssetResponse | null;
    toToken: AssetResponse | null;
    identifier: string;
    originalOfferAmount: bigint;
    unFilledOfferAmount: bigint;
    askedAmount: bigint;
    price: number;
    numPartialFills: number;
    isCancelled: boolean;
    dexFeesPaid: bigint;
    senderPubKeyHash: string;
    senderStakeKeyHash: string | null;
    slot: number;
    txHash: string;
    outputIndex: number;
    meta?: string;
};
type OperationStatusResponse = {
    status: number;
    slot: number;
    txHash: string;
    outputIndex: number;
    operationTxHash: string;
    operationOutputIndex: number;
};
type SwapOrderResponse = {
    swapInToken: AssetResponse | null;
    swapOutToken: AssetResponse | null;
    orderType: number;
    swapInAmount: bigint;
    minReceive: bigint;
    actualReceive: bigint | null;
    dexFeesPaid: bigint;
    senderPubKeyHash: string;
    senderStakeKeyHash: string | null;
    txHash: string;
    outputIndex: number;
    slot: number;
    statuses: OperationStatusResponse[];
    liquidityPool: LiquidityPoolResponse;
    meta?: string;
};
type DepositOrderResponse = {
    depositAToken: AssetResponse | null;
    depositBToken: AssetResponse | null;
    depositAAmount: bigint;
    depositBAmount: bigint;
    dexFeesPaid: bigint;
    senderPubKeyHash: string;
    senderStakeKeyHash: string | null;
    statuses: OperationStatusResponse[];
    txHash: string;
    outputIndex: number;
    slot: number;
    liquidityPool: LiquidityPoolResponse;
    meta?: string;
};
type WithdrawOrderResponse = {
    lpToken: AssetResponse;
    lpTokenAmount: bigint;
    minReceiveA: bigint;
    minReceiveB: bigint;
    dexFeesPaid: bigint;
    senderPubKeyHash: string;
    senderStakeKeyHash: string | null;
    statuses: OperationStatusResponse[];
    txHash: string;
    outputIndex: number;
    slot: number;
    liquidityPool: LiquidityPoolResponse;
    meta?: string;
};
type PriceInfo = {
    identifier: string;
    price: number;
    dayLow: number;
    dayHigh: number;
    dayChange: number;
    hourChange: number;
};

declare enum DexOperationStatus {
    Pending = 0,
    OnChain = 1,
    Complete = 2,
    Cancelled = 3
}
declare enum TickInterval {
    Minute = "1m",
    Hour = "1h",
    Day = "1D"
}
declare enum SwapOrderType {
    Instant = 0,
    Limit = 1
}
declare enum WsEvent {
    Sync = "Sync",
    Asset = "Asset",
    LiquidityPool = "LiquidityPool",
    LiquidityPoolState = "LiquidityPoolState",
    LiquidityPoolTick = "LiquidityPoolTick",
    LiquidityPoolSwap = "LiquidityPoolSwap",
    LiquidityPoolDeposit = "LiquidityPoolDeposit",
    LiquidityPoolWithdraw = "LiquidityPoolWithdraw",
    OperationStatus = "OperationStatus",
    OrderBook = "OrderBook",
    OrderBookOrder = "OrderBookOrder",
    OrderBookMatch = "OrderBookMatch",
    OrderBookTick = "OrderBookTick"
}

declare class Sync {
    slot: number;
    blockHash: string;
    constructor(slot: number, blockHash: string);
}

declare class LiquidityPoolState {
    reserveA: bigint;
    reserveB: bigint;
    lpTokens: bigint;
    buyFeePercent: number;
    sellFeePercent: number;
    tvl: bigint;
    slot: number;
    pool?: LiquidityPool | undefined;
    lpToken?: Asset | undefined;
    constructor(reserveA: bigint, reserveB: bigint, lpTokens: bigint, buyFeePercent: number, sellFeePercent: number, tvl: bigint, slot: number, pool?: LiquidityPool | undefined, lpToken?: Asset | undefined);
}

declare class LiquidityPool {
    dex: string;
    identifier: string;
    address: string;
    orderAddress: string;
    tokenA: Token;
    tokenB: Asset;
    createdSlot: number;
    lpToken?: Asset | undefined;
    state?: LiquidityPoolState | undefined;
    meta?: any | undefined;
    constructor(dex: string, identifier: string, address: string, orderAddress: string, tokenA: Token, tokenB: Asset, createdSlot: number, lpToken?: Asset | undefined, state?: LiquidityPoolState | undefined, meta?: any | undefined);
    get readableTokenAName(): string;
    get readableTokenATicker(): string;
    get price(): number;
}

declare class OperationStatus {
    entity: Statusable | null;
    status: number;
    slot: number;
    txHash: string;
    outputIndex: number;
    operationTxHash: string;
    operationOutputIndex: number;
    constructor(entity: Statusable | null, status: number, slot: number, txHash: string, outputIndex: number, operationTxHash: string, operationOutputIndex: number);
}

declare class Statusable {
    statuses: OperationStatus[];
    constructor(statuses: OperationStatus[]);
    get placedStatus(): OperationStatus | undefined;
    get settledStatus(): OperationStatus | undefined;
    get latestStatus(): OperationStatus;
}

declare class SwapOrder extends Statusable {
    swapInToken: Token;
    swapOutToken: Token;
    orderType: number;
    swapInAmount: bigint;
    minReceive: bigint;
    actualReceive: bigint | null;
    dexFeesPaid: bigint;
    senderPubKeyHash: string;
    senderStakeKeyHash: string | null;
    statuses: OperationStatus[];
    txHash: string;
    outputIndex: number;
    slot: number;
    liquidityPool?: (LiquidityPool | null) | undefined;
    meta?: any | undefined;
    constructor(swapInToken: Token, swapOutToken: Token, orderType: number, swapInAmount: bigint, minReceive: bigint, actualReceive: bigint | null, dexFeesPaid: bigint, senderPubKeyHash: string, senderStakeKeyHash: string | null, statuses: OperationStatus[], txHash: string, outputIndex: number, slot: number, liquidityPool?: (LiquidityPool | null) | undefined, meta?: any | undefined);
    get price(): number;
}

declare class DepositOrder extends Statusable {
    depositAToken: Token;
    depositBToken: Token;
    depositAAmount: bigint;
    depositBAmount: bigint;
    dexFeesPaid: bigint;
    senderPubKeyHash: string;
    senderStakeKeyHash: string | null;
    statuses: OperationStatus[];
    txHash: string;
    outputIndex: number;
    slot: number;
    liquidityPool?: (LiquidityPool | null) | undefined;
    meta?: any | undefined;
    constructor(depositAToken: Token, depositBToken: Token, depositAAmount: bigint, depositBAmount: bigint, dexFeesPaid: bigint, senderPubKeyHash: string, senderStakeKeyHash: string | null, statuses: OperationStatus[], txHash: string, outputIndex: number, slot: number, liquidityPool?: (LiquidityPool | null) | undefined, meta?: any | undefined);
}

declare class WithdrawOrder extends Statusable {
    lpToken: Asset;
    lpTokenAmount: bigint;
    minReceiveA: bigint;
    minReceiveB: bigint;
    dexFeesPaid: bigint;
    senderPubKeyHash: string;
    senderStakeKeyHash: string | null;
    statuses: OperationStatus[];
    txHash: string;
    outputIndex: number;
    slot: number;
    liquidityPool?: (LiquidityPool | null) | undefined;
    meta?: any | undefined;
    constructor(lpToken: Asset, lpTokenAmount: bigint, minReceiveA: bigint, minReceiveB: bigint, dexFeesPaid: bigint, senderPubKeyHash: string, senderStakeKeyHash: string | null, statuses: OperationStatus[], txHash: string, outputIndex: number, slot: number, liquidityPool?: (LiquidityPool | null) | undefined, meta?: any | undefined);
}

declare class OrderBook {
    dex: string;
    identifier: string;
    tokenA: Token;
    tokenB: Asset;
    createdSlot: number;
    constructor(dex: string, identifier: string, tokenA: Token, tokenB: Asset, createdSlot: number);
    get readableTokenAName(): string;
    get readableTokenATicker(): string;
}

declare class Tick {
    entity: LiquidityPool | OrderBook | null;
    resolution: string;
    time: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    constructor(entity: LiquidityPool | OrderBook | null, resolution: string, time: number, open: number, high: number, low: number, close: number, volume: number);
    get percent(): number;
}

declare class OrderBookOrder {
    identifier: string;
    fromToken: Token;
    toToken: Token;
    originalOfferAmount: bigint;
    unFilledOfferAmount: bigint;
    askedAmount: bigint;
    price: number;
    numPartialFills: number;
    isCancelled: boolean;
    dexFeesPaid: bigint;
    senderPubKeyHash: string;
    senderStakeKeyHash: string | null;
    slot: number;
    txHash: string;
    outputIndex: number;
    meta?: any | undefined;
    constructor(identifier: string, fromToken: Token, toToken: Token, originalOfferAmount: bigint, unFilledOfferAmount: bigint, askedAmount: bigint, price: number, numPartialFills: number, isCancelled: boolean, dexFeesPaid: bigint, senderPubKeyHash: string, senderStakeKeyHash: string | null, slot: number, txHash: string, outputIndex: number, meta?: any | undefined);
}

declare class OrderBookMatch {
    orderBook: OrderBook | null;
    referenceOrder: OrderBookOrder;
    fromToken: Token;
    matchedAmount: bigint;
    senderPubKeyHash: string;
    senderStakeKeyHash: string | null;
    slot: number;
    txHash: string;
    outputIndex: number;
    meta?: any | undefined;
    constructor(orderBook: OrderBook | null, referenceOrder: OrderBookOrder, fromToken: Token, matchedAmount: bigint, senderPubKeyHash: string, senderStakeKeyHash: string | null, slot: number, txHash: string, outputIndex: number, meta?: any | undefined);
}

type WsSync = {
    t: WsEvent.Sync;
    s: number;
    bH: string;
};
type WsAsset = {
    t: WsEvent.Asset;
    pId: string;
    nH: string;
    d: number;
    isLp: boolean;
    n?: string;
    ti?: string;
    l?: string;
    de?: string;
    v?: boolean;
};
type WsLiquidityPool = {
    t: WsEvent.LiquidityPool;
    d: string;
    i: string;
    a: string;
    oA: string;
    tA?: WsAsset;
    tB: WsAsset;
    cS: number;
    s?: WsLiquidityPoolState;
    m?: string;
};
type WsLiquidityPoolState = {
    t: WsEvent.LiquidityPoolState;
    rA: number;
    rB: number;
    lpTs: number;
    tvl: number;
    bF: number;
    sF: number;
    s: number;
    p?: WsLiquidityPool;
    tLp?: WsAsset;
};
type WsOperationStatus = {
    t: WsEvent.OperationStatus;
    oE: WsLiquidityPoolSwap | WsLiquidityPoolDeposit | WsLiquidityPoolWithdraw | null;
    st: DexOperationStatus;
    s: number;
    tH: string;
    oI: number;
    oTx: string;
    oOi: number;
};
type WsLiquidityPoolSwap = {
    t: WsEvent.LiquidityPoolSwap;
    siT?: WsAsset;
    soT?: WsAsset;
    oT: SwapOrderType;
    iA: number;
    mR: number;
    aR?: number;
    fP: number;
    pkh: string;
    skh: string;
    s: number;
    tH: string;
    oI: number;
    lp?: WsLiquidityPool;
    st?: WsOperationStatus[];
    m?: string;
};
type WsLiquidityPoolDeposit = {
    t: WsEvent.LiquidityPoolDeposit;
    dAT?: WsAsset;
    dBT?: WsAsset;
    dAA: number;
    dBA: number;
    fP: number;
    pkh: string;
    skh: string;
    s: number;
    tH: string;
    oI: number;
    lp?: WsLiquidityPool;
    st?: WsOperationStatus[];
    m?: string;
};
type WsLiquidityPoolWithdraw = {
    t: WsEvent.LiquidityPoolWithdraw;
    lpT: WsAsset;
    lpA: number;
    mA: number;
    mB: number;
    fP: number;
    pkh: string;
    skh: string;
    s: number;
    tH: string;
    oI: number;
    lp?: WsLiquidityPool;
    st?: WsOperationStatus[];
    m?: string;
};
type WsLiquidityPoolTick = {
    t: WsEvent.LiquidityPoolTick;
    lP: WsLiquidityPool | null;
    r: TickInterval;
    o: number;
    h: number;
    l: number;
    c: number;
    v: number;
    ti: number;
};
type WsOrderBookTick = {
    t: WsEvent.OrderBookTick;
    oB?: WsOrderBook | null;
    r: TickInterval;
    o: number;
    h: number;
    l: number;
    c: number;
    v: number;
    ti: number;
};
type WsOrderBook = {
    t: WsEvent.OrderBook;
    d: string;
    i: string;
    tA?: WsAsset;
    tB: WsAsset;
    cS: number;
};
type WsOrderBookOrder = {
    t: WsEvent.OrderBookOrder;
    i: string;
    fT?: WsAsset;
    tT?: WsAsset;
    oA: number;
    uA: number;
    aA: number;
    p: number;
    pF: number;
    iC: number;
    fP: number;
    pkh: string;
    skh: string;
    s: number;
    tH: string;
    oI: number;
    m?: string;
};
type WsOrderBookMatch = {
    t: WsEvent.OrderBookMatch;
    oB?: WsOrderBook | null;
    rO: WsOrderBookOrder;
    fT?: WsAsset;
    mA: number;
    pkh: string;
    skh: string;
    s: number;
    tH: string;
    oI: number;
    m?: string;
};
type WsMessage = WsSync | WsAsset | WsLiquidityPool | WsLiquidityPoolState | WsLiquidityPoolSwap | WsLiquidityPoolDeposit | WsLiquidityPoolWithdraw | WsOperationStatus | WsLiquidityPoolTick | WsOrderBook | WsOrderBookOrder | WsOrderBookMatch | WsOrderBookTick;
type WsResponse = Sync | LiquidityPool | LiquidityPoolState | SwapOrder | DepositOrder | WithdrawOrder | OperationStatus | Tick | OrderBook | OrderBookOrder | OrderBookMatch;

declare function hexToAscii(hex: string): string;
declare function tokenId(token: Token): string;
declare function tokenDecimals(token: Token): number;

declare class BaseApiService {
    protected _baseHost: string;
    constructor(baseHost: string);
    protected responseToLiquidityPool(poolResponse: LiquidityPoolResponse): LiquidityPool;
}

declare class AssetService extends BaseApiService {
    all(pagination?: PaginationParams): Promise<PaginatedResponse<Asset>>;
    match(asset: {
        policyId?: string;
        nameHex?: string;
    }, pagination?: PaginationParams): Promise<PaginatedResponse<Asset>>;
    search(query: string, pagination?: PaginationParams): Promise<PaginatedResponse<Asset>>;
    asset(asset: {
        policyId: string;
        nameHex: string;
    }): Promise<Asset | undefined>;
    price(asset: {
        policyId: string;
        nameHex: string;
    }, baseTokenIdentifier?: string): Promise<number>;
    lpTokenPool(lpToken: {
        policyId: string;
        nameHex: string;
    }): Promise<LiquidityPool | undefined>;
    ticks(forAssets: Asset[], resolution: TickInterval, orderBy?: 'ASC' | 'DESC', fromTime?: number, toTime?: number): Promise<Tick[]>;
}

declare class DexService extends BaseApiService {
    metadata(): Promise<DexMetadata[]>;
}

declare class ConnectionService extends BaseApiService {
    ping(): Promise<boolean>;
}

declare class OrdersService extends BaseApiService {
    swaps(paymentKeyCredentials: string[], stakeKeyCredentials?: string[], filters?: OrderFilters, pagination?: PaginationParams): Promise<PaginatedResponse<SwapOrder>>;
    deposits(paymentKeyCredentials: string[], stakeKeyCredentials?: string[], filters?: OrderFilters, pagination?: PaginationParams): Promise<PaginatedResponse<DepositOrder>>;
    withdraws(paymentKeyCredentials: string[], stakeKeyCredentials?: string[], filters?: OrderFilters, pagination?: PaginationParams): Promise<PaginatedResponse<WithdrawOrder>>;
    swapAssets(paymentKeyCredentials: string[]): Promise<Asset[]>;
    depositAssets(paymentKeyCredentials: string[]): Promise<Asset[]>;
}

declare class LiquidityPoolService extends BaseApiService {
    all(pagination?: PaginationParams): Promise<LiquidityPool[]>;
    match(pool: {
        identifier?: string;
        dex?: string;
        tokenA?: Token;
        tokenB?: Asset;
    }, pagination?: PaginationParams, fromTimestamp?: number, toTimestamp?: number): Promise<PaginatedResponse<LiquidityPool>>;
    search(query: string, pagination?: PaginationParams): Promise<PaginatedResponse<LiquidityPool>>;
    swapOrders(liquidityPool: LiquidityPool, typeFilter?: string, senderFilter?: string, pagination?: PaginationParams): Promise<PaginatedResponse<SwapOrder>>;
    swapsHistoric(fromTimestamp: number, toTimestamp: number, forAssets?: Asset[]): Promise<SwapOrder[]>;
    depositOrders(liquidityPool: LiquidityPool, senderFilter?: string, pagination?: PaginationParams): Promise<PaginatedResponse<DepositOrder>>;
    depositsHistoric(fromTimestamp: number, toTimestamp: number, forAssets?: Asset[]): Promise<DepositOrder[]>;
    withdrawOrders(liquidityPool: LiquidityPool, senderFilter?: string, pagination?: PaginationParams): Promise<PaginatedResponse<WithdrawOrder>>;
    withdrawsHistoric(fromTimestamp: number, toTimestamp: number, forAssets?: Asset[]): Promise<WithdrawOrder[]>;
    statesHistoric(fromTimestamp: number, toTimestamp: number, forAssets?: Asset[]): Promise<LiquidityPoolState[]>;
    prices(poolIdentifiers: string[], baseTokenIdentifier?: string): Promise<PriceInfo[]>;
    ticks(liquidityPool: LiquidityPool, resolution: TickInterval, orderBy?: 'ASC' | 'DESC', fromTime?: number, toTime?: number, baseTokenIdentifier?: string): Promise<Tick[]>;
}

declare class SyncService extends BaseApiService {
    latest(): Promise<Sync>;
}

declare class OrderBookService extends BaseApiService {
    all(pagination?: PaginationParams): Promise<OrderBook[]>;
    match(book: {
        identifier?: string;
        dex?: string;
        tokenA?: Token;
        tokenB?: Asset;
    }, pagination?: PaginationParams): Promise<PaginatedResponse<OrderBook>>;
    buyOrders(bookIdentifier: string): Promise<OrderBookOrder[]>;
    sellOrders(bookIdentifier: string): Promise<OrderBookOrder[]>;
    prices(identifiers: string[]): Promise<PriceInfo[]>;
    ticks(orderBook: OrderBook, resolution: TickInterval, fromTime?: number, toTime?: number): Promise<Tick[]>;
}

declare class IrisApiService {
    private readonly _baseHost;
    constructor(baseHost: string);
    connection(): ConnectionService;
    sync(): SyncService;
    dex(): DexService;
    assets(): AssetService;
    liquidityPools(): LiquidityPoolService;
    orders(): OrdersService;
    orderBooks(): OrderBookService;
}

declare class IrisWebsocketService {
    private readonly _baseHost;
    private _client;
    private _listeners;
    constructor(baseHost: string);
    addListener(callback: Function): void;
    removeListener(callback: Function): void;
    connect(): void;
    private formatMessage;
}

declare abstract class BaseWsResource {
    abstract fromWebsocketMessage(message: WsMessage): any;
}

declare class AssetResource extends BaseWsResource {
    fromWebsocketMessage(message: WsAsset): Asset;
}

declare class DepositOrderResource extends BaseWsResource {
    fromWebsocketMessage(message: WsLiquidityPoolDeposit): DepositOrder;
}

declare class LiquidityPoolResource extends BaseWsResource {
    fromWebsocketMessage(message: WsLiquidityPool): LiquidityPool;
}

declare class LiquidityPoolStateResource extends BaseWsResource {
    fromWebsocketMessage(message: WsLiquidityPoolState): LiquidityPoolState;
}

declare class LiquidityPoolTickResource extends BaseWsResource {
    fromWebsocketMessage(message: WsLiquidityPoolTick): Tick;
}

declare class OperationStatusResource extends BaseWsResource {
    fromWebsocketMessage(message: WsOperationStatus): OperationStatus;
}

declare class OrderBookMatchResource extends BaseWsResource {
    fromWebsocketMessage(message: WsOrderBookMatch): OrderBookMatch;
}

declare class OrderBookOrderResource extends BaseWsResource {
    fromWebsocketMessage(message: WsOrderBookOrder): OrderBookOrder;
}

declare class OrderBookResource extends BaseWsResource {
    fromWebsocketMessage(message: WsOrderBook): OrderBook;
}

declare class OrderBookTickResource extends BaseWsResource {
    fromWebsocketMessage(message: WsOrderBookTick): Tick;
}

declare class SwapOrderResource extends BaseWsResource {
    fromWebsocketMessage(message: WsLiquidityPoolSwap): SwapOrder;
}

declare class SyncResource extends BaseWsResource {
    fromWebsocketMessage(message: WsSync): Sync;
}

declare class WithdrawOrderResource extends BaseWsResource {
    fromWebsocketMessage(message: WsLiquidityPoolWithdraw): WithdrawOrder;
}

export { Asset, AssetResource, type AssetResponse, AssetService, BaseApiService, BaseWsResource, ConnectionService, DepositOrder, DepositOrderResource, type DepositOrderResponse, type DexMetadata, DexOperationStatus, DexService, IrisApiService, IrisWebsocketService, LiquidityPool, LiquidityPoolResource, type LiquidityPoolResponse, LiquidityPoolService, LiquidityPoolState, LiquidityPoolStateResource, type LiquidityPoolStateResponse, LiquidityPoolTickResource, OperationStatus, OperationStatusResource, type OperationStatusResponse, OrderBook, OrderBookMatch, OrderBookMatchResource, OrderBookOrder, OrderBookOrderResource, type OrderBookOrderResponse, OrderBookResource, type OrderBookResponse, OrderBookService, OrderBookTickResource, type OrderFilters, OrdersService, type PaginatedResponse, type Pagination, type PaginationParams, type PriceInfo, Statusable, SwapOrder, SwapOrderResource, type SwapOrderResponse, SwapOrderType, Sync, SyncResource, Tick, TickInterval, type Token, WithdrawOrder, WithdrawOrderResource, type WithdrawOrderResponse, type WsAsset, WsEvent, type WsLiquidityPool, type WsLiquidityPoolDeposit, type WsLiquidityPoolState, type WsLiquidityPoolSwap, type WsLiquidityPoolTick, type WsLiquidityPoolWithdraw, type WsMessage, type WsOperationStatus, type WsOrderBook, type WsOrderBookMatch, type WsOrderBookOrder, type WsOrderBookTick, type WsResponse, type WsSync, hexToAscii, tokenDecimals, tokenId };
