import { DexOperationStatus, SwapOrderType, TickInterval } from './enums';

export type WsSync = {
    t: 'Sync',
    s: number,  // Slot
    bH: string, // Block hash
}

export type WsAsset = {
    t: 'Asset',
    pId: string,    // Policy ID
    nH: string,     // Name Hex
    d: number,      // Decimals
    isLp: boolean,  // Is LP token
    n?: string,     // Name
    ti?: string     // Ticker
    l?: string;     // Logo
    de?: string,    // Description
    v?: boolean,    // Is verified
}

export type WsLiquidityPool = {
    t: 'LiquidityPool',
    d: string,                // DEX
    i: string,                // Identifier
    a: string,                // Address
    tA?: WsAsset,             // Token A
    tB: WsAsset,              // Token B
    cS: number,               // Created slot
    s?: WsLiquidityPoolState, // Latest state
}

export type WsLiquidityPoolState = {
    t: 'LiquidityPoolState',
    rA: number,          // Reserve A
    rB: number,          // Reserve B
    lpTs: number,        // Total LP tokens
    tvl: number,         // Total Value Locked
    f: number,           // Fee percent
    p?: WsLiquidityPool, // Liquidity pool
    tLp?: WsAsset,       // LP token
}

export type WsOperationStatus = {
    t: 'OperationStatus',
    st: DexOperationStatus, // Status type
    s: number,              // Slot
    tH: string,             // Tx hash
    oI: number,             // Output index
}

export type WsLiquidityPoolSwap = {
    t: 'LiquidityPoolSwap',
    siT?: WsAsset,            // Swap in token
    soT?: WsAsset,            // Swap out token
    oT: SwapOrderType,        // Order type
    iA: number,               // Swap in amount
    mR: number,               // Min. receive
    aR?: number,              // Actual receive
    fP: number,               // Paid DEX fees
    pkh: string,              // Public key hash
    skh: string,              // Stake key hash
    s: number,                // Placed in slot
    tH: string,               // Tx hash
    oI: number,               // Output index
    lp?: WsLiquidityPool,     // Liquidity pool
    st?: WsOperationStatus[], // Order statuses
}

export type WsLiquidityPoolDesposit = {
    t: 'LiquidityPoolDeposit',
    dAT?: WsAsset,            // Deposit A token
    dBT?: WsAsset,            // Deposit B token
    dAA: number,              // Deposit A amount
    dBA: number,              // Deposit B amount
    fP: number,               // Paid DEX fees
    pkh: string,              // Public key hash
    skh: string,              // Stake key hash
    s: number,                // Placed in slot
    tH: string,               // Tx hash
    oI: number,               // Output index
    lp?: WsLiquidityPool,     // Liquidity pool
    st?: WsOperationStatus[], // Order statuses
}

export type WsLiquidityPoolWithdraw = {
    t: 'LiquidityPoolWithdraw',
    lpT: WsAsset,             // Related LP token
    lpA: number,              // LP token amount
    mA: number,               // Min. receive token A
    mB: number,               // Min. receive token B
    fP: number,               // Paid DEX fees
    pkh: string,              // Public key hash
    skh: string,              // Stake key hash
    s: number,                // Placed in slot
    tH: string,               // Tx hash
    oI: number,               // Output index
    lp?: WsLiquidityPool,     // Liquidity pool
    st?: WsOperationStatus[], // Order statuses
}

export type WsLiquidityPoolTick = {
    t: 'LiquidityPoolTick',
    r: TickInterval, // Resolution
    o: number,       // Open
    h: number,       // High
    l: number,       // Low
    c: number,       // Close
    v: number,       // Volume
    ti: number,      // Time
}

export type WsMessage = WsSync
    | WsAsset
    | WsLiquidityPool
    | WsLiquidityPoolState
    | WsLiquidityPoolSwap
    | WsLiquidityPoolDesposit
    | WsLiquidityPoolWithdraw
    | WsOperationStatus
    | WsLiquidityPoolTick;
