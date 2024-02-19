export enum DexOperationStatus {
    Pending = 0,
    OnChain = 1,
    Complete = 2,
    Cancelled = 3,
}

export enum TickInterval {
    Minute = '1m',
    Hour = '1h',
    Day = '1D',
}

export enum SwapOrderType {
    Instant = 0,
    Limit = 1,
}

export enum WsEvent {
    Sync = 'Sync',
    Asset = 'Asset',
    LiquidityPool = 'LiquidityPool',
    LiquidityPoolState = 'LiquidityPoolState',
    LiquidityPoolTick = 'LiquidityPoolTick',
    LiquidityPoolSwap = 'LiquidityPoolSwap',
    LiquidityPoolDeposit = 'LiquidityPoolDeposit',
    LiquidityPoolWithdraw = 'LiquidityPoolWithdraw',
    OperationStatus = 'OperationStatus',
    OrderBook = 'OrderBook',
    OrderBookOrder = 'OrderBookOrder',
}
