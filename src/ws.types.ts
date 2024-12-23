import { DexOperationStatus, SwapOrderType, TickInterval, WsEvent } from './enums';
import { Sync } from './models/Sync';
import { LiquidityPool } from './models/LiquidityPool';
import { LiquidityPoolState } from './models/LiquidityPoolState';
import { SwapOrder } from './models/SwapOrder';
import { DepositOrder } from './models/DepositOrder';
import { WithdrawOrder } from './models/WithdrawOrder';
import { OperationStatus } from './models/OperationStatus';
import { Tick } from './models/Tick';
import { OrderBook } from './models/OrderBook';
import { OrderBookOrder } from './models/OrderBookOrder';
import { OrderBookMatch } from './models/OrderBookMatch';

export type WsSync = {
    t: WsEvent.Sync,
    s: number,  // Slot
    bH: string, // Block hash
}

export type WsAsset = {
    t: WsEvent.Asset,
    pId: string,   // Policy ID
    nH: string,    // Name Hex
    d: number,     // Decimals
    isLp: boolean, // Is LP token
    n?: string,    // Name
    ti?: string    // Ticker
    l?: string;    // Logo
    de?: string,   // Description
    v?: boolean,   // Is verified
}

export type WsLiquidityPool = {
    t: WsEvent.LiquidityPool,
    d: string,                // DEX
    i: string,                // Identifier
    a: string,                // Address
    oA: string,               // Order Address
    tA?: WsAsset,             // Token A
    tB: WsAsset,              // Token B
    cS: number,               // Created slot
    s?: WsLiquidityPoolState, // Latest state
    m?: string,               // Metadata
}

export type WsLiquidityPoolState = {
    t: WsEvent.LiquidityPoolState,
    rA: number,          // Reserve A
    rB: number,          // Reserve B
    lpTs: number,        // Total LP tokens
    tvl: number,         // Total Value Locked
    f: number,           // Fee percent
    s: number,           // Slot
    p?: WsLiquidityPool, // Liquidity pool
    tLp?: WsAsset,       // LP token
}

export type WsOperationStatus = {
    t: WsEvent.OperationStatus,
    oE: WsLiquidityPoolSwap | WsLiquidityPoolDeposit | WsLiquidityPoolWithdraw | null,
    st: DexOperationStatus, // Status type
    s: number,              // Slot
    tH: string,             // Tx hash
    oI: number,             // Output index
    oTx: string,            // Related operation Tx hash
    oOi: number,            // Related operation Tx output index
}

export type WsLiquidityPoolSwap = {
    t: WsEvent.LiquidityPoolSwap,
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
    m?: string                // Metadata
}

export type WsLiquidityPoolDeposit = {
    t: WsEvent.LiquidityPoolDeposit,
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
    m?: string                // Metadata
}

export type WsLiquidityPoolWithdraw = {
    t: WsEvent.LiquidityPoolWithdraw,
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
    m?: string                // Metadata
}

export type WsLiquidityPoolTick = {
    t: WsEvent.LiquidityPoolTick,
    lP: WsLiquidityPool | null, // Liquidity Pool
    r: TickInterval,            // Resolution
    o: number,                  // Open
    h: number,                  // High
    l: number,                  // Low
    c: number,                  // Close
    v: number,                  // Volume
    ti: number,                 // Time
}

export type WsOrderBookTick = {
    t: WsEvent.OrderBookTick,
    oB?: WsOrderBook | null, // Order Book
    r: TickInterval,         // Resolution
    o: number,               // Open
    h: number,               // High
    l: number,               // Low
    c: number,               // Close
    v: number,               // Volume
    ti: number,              // Time
}

export type WsOrderBook = {
    t: WsEvent.OrderBook,
    d: string,    // DEX
    i: string,    // Identifier
    tA?: WsAsset, // Token A
    tB: WsAsset,  // Token B
    cS: number,   // Created slot
}

export type WsOrderBookOrder = {
    t: WsEvent.OrderBookOrder,
    i: string,    // Identifier
    fT?: WsAsset, // From token
    tT?: WsAsset, // To Token
    oA: number,   // Original offer amount
    uA: number,   // Unfilled offer amount
    aA: number,   // Asked amount
    p: number,    // Price
    pF: number,   // # of partial fills
    iC: number,   // Is cancelled
    fP: number,   // Paid DEX fees
    pkh: string,  // Public key hash
    skh: string,  // Stake key hash
    s: number,    // Placed in slot
    tH: string,   // Tx hash
    oI: number,   // Output index
    m?: string    // Metadata
}

export type WsOrderBookMatch = {
    t: WsEvent.OrderBookMatch,
    oB?: WsOrderBook | null, // Order Book
    rO: WsOrderBookOrder,    // Reference order
    fT?: WsAsset,            // From token
    mA: number,              // Matched amount
    pkh: string,             // Public key hash
    skh: string,             // Stake key hash
    s: number,               // Placed in slot
    tH: string,              // Tx hash
    oI: number,              // Output index
    m?: string               // Metadata
}

export type WsMessage = WsSync
    | WsAsset
    | WsLiquidityPool
    | WsLiquidityPoolState
    | WsLiquidityPoolSwap
    | WsLiquidityPoolDeposit
    | WsLiquidityPoolWithdraw
    | WsOperationStatus
    | WsLiquidityPoolTick
    | WsOrderBook
    | WsOrderBookOrder
    | WsOrderBookMatch
    | WsOrderBookTick;

export type WsResponse = Sync
    | LiquidityPool
    | LiquidityPoolState
    | SwapOrder
    | DepositOrder
    | WithdrawOrder
    | OperationStatus
    | Tick
    | OrderBook
    | OrderBookOrder
    | OrderBookMatch;