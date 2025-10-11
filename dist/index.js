"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  Asset: () => Asset,
  AssetResource: () => AssetResource,
  AssetService: () => AssetService,
  BaseApiService: () => BaseApiService,
  BaseWsResource: () => BaseWsResource,
  ConnectionService: () => ConnectionService,
  DepositOrder: () => DepositOrder,
  DepositOrderResource: () => DepositOrderResource,
  DexOperationStatus: () => DexOperationStatus,
  DexService: () => DexService,
  IrisApiService: () => IrisApiService,
  IrisWebsocketService: () => IrisWebsocketService,
  LiquidityPool: () => LiquidityPool,
  LiquidityPoolResource: () => LiquidityPoolResource,
  LiquidityPoolService: () => LiquidityPoolService,
  LiquidityPoolState: () => LiquidityPoolState,
  LiquidityPoolStateResource: () => LiquidityPoolStateResource,
  LiquidityPoolTickResource: () => LiquidityPoolTickResource,
  OperationStatus: () => OperationStatus,
  OperationStatusResource: () => OperationStatusResource,
  OrderBook: () => OrderBook,
  OrderBookMatch: () => OrderBookMatch,
  OrderBookMatchResource: () => OrderBookMatchResource,
  OrderBookOrder: () => OrderBookOrder,
  OrderBookOrderResource: () => OrderBookOrderResource,
  OrderBookResource: () => OrderBookResource,
  OrderBookService: () => OrderBookService,
  OrderBookTickResource: () => OrderBookTickResource,
  OrdersService: () => OrdersService,
  Statusable: () => Statusable,
  SwapOrder: () => SwapOrder,
  SwapOrderResource: () => SwapOrderResource,
  SwapOrderType: () => SwapOrderType,
  Sync: () => Sync,
  SyncResource: () => SyncResource,
  Tick: () => Tick,
  TickInterval: () => TickInterval,
  WithdrawOrder: () => WithdrawOrder,
  WithdrawOrderResource: () => WithdrawOrderResource,
  WsEvent: () => WsEvent,
  hexToAscii: () => hexToAscii,
  tokenDecimals: () => tokenDecimals,
  tokenId: () => tokenId
});
module.exports = __toCommonJS(index_exports);

// src/enums.ts
var DexOperationStatus = /* @__PURE__ */ ((DexOperationStatus2) => {
  DexOperationStatus2[DexOperationStatus2["Pending"] = 0] = "Pending";
  DexOperationStatus2[DexOperationStatus2["OnChain"] = 1] = "OnChain";
  DexOperationStatus2[DexOperationStatus2["Complete"] = 2] = "Complete";
  DexOperationStatus2[DexOperationStatus2["Cancelled"] = 3] = "Cancelled";
  return DexOperationStatus2;
})(DexOperationStatus || {});
var TickInterval = /* @__PURE__ */ ((TickInterval2) => {
  TickInterval2["Minute"] = "1m";
  TickInterval2["Hour"] = "1h";
  TickInterval2["Day"] = "1D";
  return TickInterval2;
})(TickInterval || {});
var SwapOrderType = /* @__PURE__ */ ((SwapOrderType2) => {
  SwapOrderType2[SwapOrderType2["Instant"] = 0] = "Instant";
  SwapOrderType2[SwapOrderType2["Limit"] = 1] = "Limit";
  return SwapOrderType2;
})(SwapOrderType || {});
var WsEvent = /* @__PURE__ */ ((WsEvent2) => {
  WsEvent2["Sync"] = "Sync";
  WsEvent2["Asset"] = "Asset";
  WsEvent2["LiquidityPool"] = "LiquidityPool";
  WsEvent2["LiquidityPoolState"] = "LiquidityPoolState";
  WsEvent2["LiquidityPoolTick"] = "LiquidityPoolTick";
  WsEvent2["LiquidityPoolSwap"] = "LiquidityPoolSwap";
  WsEvent2["LiquidityPoolDeposit"] = "LiquidityPoolDeposit";
  WsEvent2["LiquidityPoolWithdraw"] = "LiquidityPoolWithdraw";
  WsEvent2["OperationStatus"] = "OperationStatus";
  WsEvent2["OrderBook"] = "OrderBook";
  WsEvent2["OrderBookOrder"] = "OrderBookOrder";
  WsEvent2["OrderBookMatch"] = "OrderBookMatch";
  WsEvent2["OrderBookTick"] = "OrderBookTick";
  return WsEvent2;
})(WsEvent || {});

// src/utils.ts
function hexToAscii(hex) {
  hex = hex.toString();
  let result = "";
  for (let i = 0; i < hex.length; i += 2) {
    result += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  }
  return result;
}
function tokenId(token) {
  return token === "lovelace" ? "ADA" : token.identifier();
}
function tokenDecimals(token) {
  return token === "lovelace" ? 6 : token.decimals ?? 0;
}

// src/models/Asset.ts
var Asset = class _Asset {
  constructor(policyId, nameHex, decimals = 0, isVerified = false, isLpToken = false, name = null, ticker = null, logo = null, description = null, meta) {
    this.policyId = policyId;
    this.nameHex = nameHex;
    this.decimals = decimals;
    this.isVerified = isVerified;
    this.isLpToken = isLpToken;
    this.name = name;
    this.ticker = ticker;
    this.logo = logo;
    this.description = description;
    this.meta = meta;
  }
  get readableTicker() {
    return (this.ticker === "" ? void 0 : this.ticker) ?? this.name ?? hexToAscii(this.nameHex);
  }
  get readableName() {
    return this.name ?? hexToAscii(this.nameHex);
  }
  identifier(dilimeter = "") {
    return `${this.policyId}${dilimeter}${this.nameHex}`;
  }
  static fromIdentifier(id, decimals = 0) {
    id = id.replace(".", "");
    return new _Asset(
      id.slice(0, 56),
      id.slice(56),
      decimals
    );
  }
};

// src/models/Statusable.ts
var Statusable = class {
  constructor(statuses) {
    this.statuses = statuses;
  }
  get placedStatus() {
    return this.statuses.find((status) => status.status === 1 /* OnChain */);
  }
  get settledStatus() {
    return this.statuses.find((status) => [2 /* Complete */, 3 /* Cancelled */].includes(status.status));
  }
  get latestStatus() {
    return this.statuses.sort((a, b) => b.status - a.status)[0];
  }
};

// src/models/DepositOrder.ts
var DepositOrder = class extends Statusable {
  constructor(depositAToken, depositBToken, depositAAmount, depositBAmount, dexFeesPaid, senderPubKeyHash, senderStakeKeyHash, statuses, txHash, outputIndex, slot, liquidityPool, meta) {
    super(statuses);
    this.depositAToken = depositAToken;
    this.depositBToken = depositBToken;
    this.depositAAmount = depositAAmount;
    this.depositBAmount = depositBAmount;
    this.dexFeesPaid = dexFeesPaid;
    this.senderPubKeyHash = senderPubKeyHash;
    this.senderStakeKeyHash = senderStakeKeyHash;
    this.statuses = statuses;
    this.txHash = txHash;
    this.outputIndex = outputIndex;
    this.slot = slot;
    this.liquidityPool = liquidityPool;
    this.meta = meta;
  }
};

// src/models/LiquidityPool.ts
var LiquidityPool = class {
  constructor(dex, identifier, address, orderAddress, tokenA, tokenB, createdSlot, lpToken, state, meta) {
    this.dex = dex;
    this.identifier = identifier;
    this.address = address;
    this.orderAddress = orderAddress;
    this.tokenA = tokenA;
    this.tokenB = tokenB;
    this.createdSlot = createdSlot;
    this.lpToken = lpToken;
    this.state = state;
    this.meta = meta;
  }
  get readableTokenAName() {
    return this.tokenA === "lovelace" ? "ADA" : this.tokenA.readableName;
  }
  get readableTokenATicker() {
    return this.tokenA === "lovelace" ? "ADA" : this.tokenA.readableTicker !== "" ? this.tokenA.readableTicker : this.tokenA.readableName;
  }
  get price() {
    if (!this.state) return 0;
    const assetADecimals = this.tokenA === "lovelace" ? 6 : this.tokenA.decimals ?? 0;
    const assetBDecimals = this.tokenB.decimals ?? 0;
    const adjustedReserveA = Number(this.state.reserveA) / 10 ** assetADecimals;
    const adjustedReserveB = Number(this.state.reserveB) / 10 ** assetBDecimals;
    return adjustedReserveA / adjustedReserveB;
  }
};

// src/models/LiquidityPoolState.ts
var LiquidityPoolState = class {
  constructor(reserveA, reserveB, lpTokens, buyFeePercent, sellFeePercent, tvl, slot, pool, lpToken) {
    this.reserveA = reserveA;
    this.reserveB = reserveB;
    this.lpTokens = lpTokens;
    this.buyFeePercent = buyFeePercent;
    this.sellFeePercent = sellFeePercent;
    this.tvl = tvl;
    this.slot = slot;
    this.pool = pool;
    this.lpToken = lpToken;
  }
};

// src/models/OperationStatus.ts
var OperationStatus = class {
  constructor(entity, status, slot, txHash, outputIndex, operationTxHash, operationOutputIndex) {
    this.entity = entity;
    this.status = status;
    this.slot = slot;
    this.txHash = txHash;
    this.outputIndex = outputIndex;
    this.operationTxHash = operationTxHash;
    this.operationOutputIndex = operationOutputIndex;
  }
};

// src/models/OrderBook.ts
var OrderBook = class {
  constructor(dex, identifier, tokenA, tokenB, createdSlot) {
    this.dex = dex;
    this.identifier = identifier;
    this.tokenA = tokenA;
    this.tokenB = tokenB;
    this.createdSlot = createdSlot;
  }
  get readableTokenAName() {
    return this.tokenA === "lovelace" ? "ADA" : this.tokenA.readableName;
  }
  get readableTokenATicker() {
    return this.tokenA === "lovelace" ? "ADA" : this.tokenA.readableTicker !== "" ? this.tokenA.readableTicker : this.tokenA.readableName;
  }
};

// src/models/OrderBookMatch.ts
var OrderBookMatch = class {
  constructor(orderBook, referenceOrder, fromToken, matchedAmount, senderPubKeyHash, senderStakeKeyHash, slot, txHash, outputIndex, meta) {
    this.orderBook = orderBook;
    this.referenceOrder = referenceOrder;
    this.fromToken = fromToken;
    this.matchedAmount = matchedAmount;
    this.senderPubKeyHash = senderPubKeyHash;
    this.senderStakeKeyHash = senderStakeKeyHash;
    this.slot = slot;
    this.txHash = txHash;
    this.outputIndex = outputIndex;
    this.meta = meta;
  }
};

// src/models/OrderBookOrder.ts
var OrderBookOrder = class {
  constructor(identifier, fromToken, toToken, originalOfferAmount, unFilledOfferAmount, askedAmount, price, numPartialFills, isCancelled, dexFeesPaid, senderPubKeyHash, senderStakeKeyHash, slot, txHash, outputIndex, meta) {
    this.identifier = identifier;
    this.fromToken = fromToken;
    this.toToken = toToken;
    this.originalOfferAmount = originalOfferAmount;
    this.unFilledOfferAmount = unFilledOfferAmount;
    this.askedAmount = askedAmount;
    this.price = price;
    this.numPartialFills = numPartialFills;
    this.isCancelled = isCancelled;
    this.dexFeesPaid = dexFeesPaid;
    this.senderPubKeyHash = senderPubKeyHash;
    this.senderStakeKeyHash = senderStakeKeyHash;
    this.slot = slot;
    this.txHash = txHash;
    this.outputIndex = outputIndex;
    this.meta = meta;
  }
};

// src/models/SwapOrder.ts
var SwapOrder = class extends Statusable {
  constructor(swapInToken, swapOutToken, orderType, swapInAmount, minReceive, actualReceive, dexFeesPaid, senderPubKeyHash, senderStakeKeyHash, statuses, txHash, outputIndex, slot, liquidityPool, meta) {
    super(statuses);
    this.swapInToken = swapInToken;
    this.swapOutToken = swapOutToken;
    this.orderType = orderType;
    this.swapInAmount = swapInAmount;
    this.minReceive = minReceive;
    this.actualReceive = actualReceive;
    this.dexFeesPaid = dexFeesPaid;
    this.senderPubKeyHash = senderPubKeyHash;
    this.senderStakeKeyHash = senderStakeKeyHash;
    this.statuses = statuses;
    this.txHash = txHash;
    this.outputIndex = outputIndex;
    this.slot = slot;
    this.liquidityPool = liquidityPool;
    this.meta = meta;
  }
  get price() {
    if (!this.liquidityPool) return 0;
    if (tokenId(this.swapInToken) === tokenId(this.liquidityPool.tokenA)) {
      return Number(this.swapInAmount) / 10 ** tokenDecimals(this.swapInToken ?? "lovelace") / (Number(this.actualReceive ?? this.minReceive) / 10 ** tokenDecimals(this.swapOutToken ?? "lovelace"));
    }
    return Number(this.actualReceive ?? this.minReceive) / 10 ** tokenDecimals(this.swapOutToken ?? "lovelace") / (Number(this.swapInAmount) / 10 ** tokenDecimals(this.swapInToken ?? "lovelace"));
  }
};

// src/models/Sync.ts
var Sync = class {
  constructor(slot, blockHash) {
    this.slot = slot;
    this.blockHash = blockHash;
  }
};

// src/models/Tick.ts
var Tick = class {
  constructor(entity, resolution, time, open, high, low, close, volume) {
    this.entity = entity;
    this.resolution = resolution;
    this.time = time;
    this.open = open;
    this.high = high;
    this.low = low;
    this.close = close;
    this.volume = volume;
  }
  get percent() {
    return (this.close - this.open) / this.open * 100;
  }
};

// src/models/WithdrawOrder.ts
var WithdrawOrder = class extends Statusable {
  constructor(lpToken, lpTokenAmount, minReceiveA, minReceiveB, dexFeesPaid, senderPubKeyHash, senderStakeKeyHash, statuses, txHash, outputIndex, slot, liquidityPool, meta) {
    super(statuses);
    this.lpToken = lpToken;
    this.lpTokenAmount = lpTokenAmount;
    this.minReceiveA = minReceiveA;
    this.minReceiveB = minReceiveB;
    this.dexFeesPaid = dexFeesPaid;
    this.senderPubKeyHash = senderPubKeyHash;
    this.senderStakeKeyHash = senderStakeKeyHash;
    this.statuses = statuses;
    this.txHash = txHash;
    this.outputIndex = outputIndex;
    this.slot = slot;
    this.liquidityPool = liquidityPool;
    this.meta = meta;
  }
};

// src/api/BaseApiService.ts
var BaseApiService = class {
  constructor(baseHost) {
    this._baseHost = baseHost;
  }
  responseToLiquidityPool(poolResponse) {
    const tokenA = poolResponse.tokenA ? new Asset(poolResponse.tokenA.policyId, poolResponse.tokenA.nameHex, poolResponse.tokenA.decimals, poolResponse.tokenA.isVerified, poolResponse.tokenA.isLpToken, poolResponse.tokenA.name, poolResponse.tokenA.ticker, poolResponse.tokenA.logo, poolResponse.tokenA.description, poolResponse.tokenA.meta) : "lovelace";
    const tokenB = new Asset(poolResponse.tokenB.policyId, poolResponse.tokenB.nameHex, poolResponse.tokenB.decimals, poolResponse.tokenB.isVerified, poolResponse.tokenB.isLpToken, poolResponse.tokenB.name, poolResponse.tokenB.ticker, poolResponse.tokenB.logo, poolResponse.tokenB.description, poolResponse.tokenB.meta);
    const lpToken = poolResponse.state?.tokenLp ? new Asset(poolResponse.state.tokenLp.policyId, poolResponse.state.tokenLp.nameHex, poolResponse.state.tokenLp.decimals) : void 0;
    const state = poolResponse.state ? new LiquidityPoolState(
      BigInt(poolResponse.state.reserveA),
      BigInt(poolResponse.state.reserveB),
      poolResponse.state.lpTokens,
      poolResponse.state.buyFeePercent,
      poolResponse.state.sellFeePercent,
      BigInt(poolResponse.state.tvl ?? 0n),
      poolResponse.state.slot
    ) : void 0;
    return new LiquidityPool(
      poolResponse.dex,
      poolResponse.identifier,
      poolResponse.address,
      poolResponse.orderAddress,
      tokenA,
      tokenB,
      poolResponse.createdSlot,
      lpToken,
      state,
      poolResponse.meta
    );
  }
};

// src/api/AssetService.ts
var import_axios = __toESM(require("axios"));
var AssetService = class extends BaseApiService {
  all(pagination = { page: 1, limit: 100 }) {
    return import_axios.default.get(`${this._baseHost}/api/assets?page=${pagination.page}&limit=${pagination.limit}`).then((response) => {
      if (response.data.message) {
        return Promise.reject(response.data.message);
      }
      return {
        data: response.data.data.map((asset) => new Asset(
          asset.policyId,
          asset.nameHex,
          asset.decimals,
          asset.isVerified,
          asset.isLpToken,
          asset.name,
          asset.ticker,
          asset.logo,
          asset.description,
          asset.meta
        )),
        pagination: response.data.pagination
      };
    });
  }
  match(asset, pagination = { page: 1, limit: 100 }) {
    return import_axios.default.post(`${this._baseHost}/api/assets?page=${pagination.page}&limit=${pagination.limit}`, {
      policyId: asset.policyId,
      nameHex: asset.nameHex
    }).then((response) => {
      if (response.data.message) {
        return Promise.reject(response.data.message);
      }
      if (response.data.data.length === 0) {
        return Promise.reject("Asset not found");
      }
      return {
        data: response.data.data.map((asset2) => new Asset(
          asset2.policyId,
          asset2.nameHex,
          asset2.decimals,
          asset2.isVerified,
          asset2.isLpToken,
          asset2.name,
          asset2.ticker,
          asset2.logo,
          asset2.description,
          asset2.meta
        )),
        pagination: response.data.pagination
      };
    });
  }
  search(query, pagination = { page: 1, limit: 100 }) {
    return import_axios.default.get(`${this._baseHost}/api/assets/search?query=${query}&page=${pagination.page}&limit=${pagination.limit}`).then((response) => {
      if (response.data.message) {
        return Promise.reject(response.data.message);
      }
      return {
        data: response.data.data.map((asset) => new Asset(
          asset.policyId,
          asset.nameHex,
          asset.decimals,
          asset.isVerified,
          asset.isLpToken,
          asset.name,
          asset.ticker,
          asset.logo,
          asset.description,
          asset.meta
        )),
        pagination: response.data.pagination
      };
    });
  }
  asset(asset) {
    return import_axios.default.get(`${this._baseHost}/api/assets/${asset.policyId}.${asset.nameHex}`).then((response) => {
      if ("success" in response.data && !response.data.success) {
        return void 0;
      }
      return new Asset(
        response.data.policyId,
        response.data.nameHex,
        response.data.decimals,
        response.data.isVerified,
        response.data.isLpToken,
        response.data.name,
        response.data.ticker,
        response.data.logo,
        response.data.description,
        response.data.meta
      );
    });
  }
  price(asset, baseTokenIdentifier) {
    let url = `${this._baseHost}/api/assets/${asset.policyId}.${asset.nameHex}/price`;
    if (baseTokenIdentifier) {
      url += `?baseTokenIdentifier=${baseTokenIdentifier}`;
    }
    return import_axios.default.get(url).then((response) => {
      if ("success" in response.data && !response.data.success) {
        return 0;
      }
      return response.data.price;
    });
  }
  lpTokenPool(lpToken) {
    return import_axios.default.get(`${this._baseHost}/api/assets/${lpToken.policyId}.${lpToken.nameHex}/pool`).then((response) => {
      if ("success" in response.data && !response.data.success) {
        return void 0;
      }
      return this.responseToLiquidityPool(response.data);
    });
  }
  ticks(forAssets, resolution, orderBy = "ASC", fromTime, toTime) {
    let url = `${this._baseHost}/api/assets/ticks?resolution=${resolution}&orderBy=${orderBy}`;
    if (fromTime) {
      url += `&fromTime=${fromTime}`;
    }
    if (toTime) {
      url += `&toTime=${toTime}`;
    }
    return import_axios.default.post(url, {
      forAssets: forAssets.map((asset) => asset.identifier())
    }).then((response) => {
      return response.data.map((tickInfo) => {
        return new Tick(
          tickInfo.liquidityPool ? this.responseToLiquidityPool(tickInfo.liquidityPool) : null,
          tickInfo.resolution,
          tickInfo.time * 1e3,
          tickInfo.open,
          tickInfo.high,
          tickInfo.low,
          tickInfo.close,
          tickInfo.volume
        );
      });
    });
  }
};

// src/api/DexService.ts
var import_axios2 = __toESM(require("axios"));
var DexService = class extends BaseApiService {
  metadata() {
    return import_axios2.default.get(`${this._baseHost}/api/dex/metadata`).then((response) => response.data);
  }
};

// src/api/ConnectionService.ts
var import_axios3 = __toESM(require("axios"));
var ConnectionService = class extends BaseApiService {
  ping() {
    return import_axios3.default.get(`${this._baseHost}/api/ping`).then((response) => {
      return Promise.resolve(response.data.success);
    }).catch(() => {
      return Promise.resolve(false);
    });
  }
};

// src/api/OrdersService.ts
var import_axios4 = __toESM(require("axios"));
var OrdersService = class extends BaseApiService {
  swaps(paymentKeyCredentials, stakeKeyCredentials = [], filters = {}, pagination = { page: 1, limit: 100 }) {
    let url = `${this._baseHost}/api/orders/swaps?page=${pagination.page}&limit=${pagination.limit}&type=${filters.type}`;
    if (filters.asset) {
      url += `&token=${filters.asset.identifier(".")}`;
    }
    if (filters.poolIdentifier) {
      url += `&poolIdentifier=${filters.poolIdentifier}`;
    }
    return import_axios4.default.post(url, {
      pubKeyHashes: paymentKeyCredentials,
      stakeKeyHashes: stakeKeyCredentials
    }).then((response) => {
      return {
        data: response.data.data.map((order) => {
          const operationStatuses = order.statuses.map((status) => {
            return new OperationStatus(
              null,
              status.status,
              status.slot,
              status.txHash,
              status.outputIndex,
              status.operationTxHash,
              status.operationOutputIndex
            );
          });
          const liquidityPool = this.responseToLiquidityPool(order.liquidityPool);
          return new SwapOrder(
            order.swapInToken === null ? "lovelace" : new Asset(order.swapInToken.policyId, order.swapInToken.nameHex, order.swapInToken.decimals, order.swapInToken.isVerified, order.swapInToken.isLpToken, order.swapInToken.name, order.swapInToken.ticker, order.swapInToken.logo, order.swapInToken.description),
            order.swapOutToken === null ? "lovelace" : new Asset(order.swapOutToken.policyId, order.swapOutToken.nameHex, order.swapOutToken.decimals, order.swapOutToken.isVerified, order.swapOutToken.isLpToken, order.swapOutToken.name, order.swapOutToken.ticker, order.swapOutToken.logo, order.swapOutToken.description),
            order.orderType,
            BigInt(order.swapInAmount),
            BigInt(order.minReceive),
            order.actualReceive ? BigInt(order.actualReceive) : null,
            BigInt(order.dexFeesPaid),
            order.senderPubKeyHash,
            order.senderStakeKeyHash,
            operationStatuses,
            order.txHash,
            Number(order.outputIndex),
            Number(order.slot),
            liquidityPool,
            order.meta
          );
        }),
        pagination: response.data.pagination
      };
    });
  }
  deposits(paymentKeyCredentials, stakeKeyCredentials = [], filters = {}, pagination = { page: 1, limit: 100 }) {
    let url = `${this._baseHost}/api/orders/deposits?page=${pagination.page}&limit=${pagination.limit}`;
    if (filters.asset) {
      url += `&token=${filters.asset.identifier(".")}`;
    }
    if (filters.poolIdentifier) {
      url += `&poolIdentifier=${filters.poolIdentifier}`;
    }
    return import_axios4.default.post(url, {
      pubKeyHashes: paymentKeyCredentials,
      stakeKeyHashes: stakeKeyCredentials
    }).then((response) => {
      return {
        data: response.data.data.map((order) => {
          const operationStatuses = order.statuses.map((status) => {
            return new OperationStatus(
              null,
              status.status,
              status.slot,
              status.txHash,
              status.outputIndex,
              status.operationTxHash,
              status.operationOutputIndex
            );
          });
          const liquidityPool = this.responseToLiquidityPool(order.liquidityPool);
          return new DepositOrder(
            order.depositAToken === null ? "lovelace" : new Asset(order.depositAToken.policyId, order.depositAToken.nameHex, order.depositAToken.decimals, order.depositAToken.isVerified, order.depositAToken.isLpToken, order.depositAToken.name, order.depositAToken.ticker, order.depositAToken.logo, order.depositAToken.description),
            order.depositBToken === null ? "lovelace" : new Asset(order.depositBToken.policyId, order.depositBToken.nameHex, order.depositBToken.decimals, order.depositBToken.isVerified, order.depositBToken.isLpToken, order.depositBToken.name, order.depositBToken.ticker, order.depositBToken.logo, order.depositBToken.description),
            BigInt(order.depositAAmount),
            BigInt(order.depositBAmount),
            BigInt(order.dexFeesPaid),
            order.senderPubKeyHash,
            order.senderStakeKeyHash,
            operationStatuses,
            order.txHash,
            Number(order.outputIndex),
            Number(order.slot),
            liquidityPool,
            order.meta
          );
        }),
        pagination: response.data.pagination
      };
    });
  }
  withdraws(paymentKeyCredentials, stakeKeyCredentials = [], filters = {}, pagination = { page: 1, limit: 100 }) {
    let url = `${this._baseHost}/api/orders/withdraws?page=${pagination.page}&limit=${pagination.limit}`;
    if (filters.poolIdentifier) {
      url += `&poolIdentifier=${filters.poolIdentifier}`;
    }
    return import_axios4.default.post(url, {
      pubKeyHashes: paymentKeyCredentials,
      stakeKeyHashes: stakeKeyCredentials
    }).then((response) => {
      return {
        data: response.data.data.map((order) => {
          const operationStatuses = order.statuses.map((status) => {
            return new OperationStatus(
              null,
              status.status,
              status.slot,
              status.txHash,
              status.outputIndex,
              status.operationTxHash,
              status.operationOutputIndex
            );
          });
          const liquidityPool = this.responseToLiquidityPool(order.liquidityPool);
          return new WithdrawOrder(
            new Asset(order.lpToken.policyId, order.lpToken.nameHex, order.lpToken.decimals),
            BigInt(order.lpTokenAmount),
            BigInt(order.minReceiveA),
            BigInt(order.minReceiveB),
            BigInt(order.dexFeesPaid),
            order.senderPubKeyHash,
            order.senderStakeKeyHash,
            operationStatuses,
            order.txHash,
            Number(order.outputIndex),
            Number(order.slot),
            liquidityPool,
            order.meta
          );
        }),
        pagination: response.data.pagination
      };
    });
  }
  swapAssets(paymentKeyCredentials) {
    return import_axios4.default.post(`${this._baseHost}/api/orders/swaps/assets`, {
      pubKeyHashes: paymentKeyCredentials
    }).then((response) => {
      return response.data.map((asset) => new Asset(
        asset.policyId,
        asset.nameHex,
        asset.decimals,
        asset.isVerified,
        asset.isLpToken,
        asset.name,
        asset.ticker,
        asset.logo,
        asset.description
      ));
    });
  }
  depositAssets(paymentKeyCredentials) {
    return import_axios4.default.post(`${this._baseHost}/api/orders/deposits/assets`, {
      pubKeyHashes: paymentKeyCredentials
    }).then((response) => {
      return response.data.map((asset) => new Asset(
        asset.policyId,
        asset.nameHex,
        asset.decimals,
        asset.isVerified,
        asset.isLpToken,
        asset.name,
        asset.ticker,
        asset.logo,
        asset.description
      ));
    });
  }
};

// src/api/LiquidityPoolService.ts
var import_axios5 = __toESM(require("axios"));
var LiquidityPoolService = class extends BaseApiService {
  all(pagination = { page: 1, limit: 100 }) {
    return import_axios5.default.get(`${this._baseHost}/api/liquidity-pools?page=${pagination.page}&limit=${pagination.limit}`).then((response) => {
      return response.data.map((pool) => this.responseToLiquidityPool(pool));
    });
  }
  match(pool, pagination = { page: 1, limit: 100 }, fromTimestamp, toTimestamp) {
    let path = `${this._baseHost}/api/liquidity-pools?page=${pagination.page}&limit=${pagination.limit}`;
    if (fromTimestamp) {
      path += `&fromTimestamp=${fromTimestamp}`;
    }
    if (toTimestamp) {
      path += `&toTimestamp=${toTimestamp}`;
    }
    return import_axios5.default.post(path, {
      identifier: pool.identifier,
      dex: pool.dex,
      tokenA: pool.tokenA === "lovelace" ? "lovelace" : pool.tokenA?.identifier("."),
      tokenB: pool.tokenB?.identifier(".")
    }).then((response) => {
      return {
        data: response.data.data.map((pool2) => this.responseToLiquidityPool(pool2)),
        pagination: response.data.pagination
      };
    });
  }
  search(query, pagination = { page: 1, limit: 100 }) {
    return import_axios5.default.get(`${this._baseHost}/api/liquidity-pools/search?query=${query}&page=${pagination.page}&limit=${pagination.limit}`).then((response) => {
      return {
        data: response.data.data.map((pool) => this.responseToLiquidityPool(pool)),
        pagination: response.data.pagination
      };
    });
  }
  swapOrders(liquidityPool, typeFilter = "all", senderFilter = "", pagination = { page: 1, limit: 100 }) {
    return import_axios5.default.get(`${this._baseHost}/api/liquidity-pools/${liquidityPool.identifier}/swaps?page=${pagination.page}&limit=${pagination.limit}&type=${typeFilter}&sender=${senderFilter}`).then((response) => {
      return {
        data: response.data.data.map((order) => {
          const operationStatuses = order.statuses?.map((status) => {
            return new OperationStatus(
              null,
              status.status,
              status.slot,
              status.txHash,
              status.outputIndex,
              status.operationTxHash,
              status.operationOutputIndex
            );
          }) ?? [];
          const liquidityPool2 = order.liquidityPool ? this.responseToLiquidityPool(order.liquidityPool) : null;
          return new SwapOrder(
            order.swapInToken === null ? "lovelace" : new Asset(order.swapInToken.policyId, order.swapInToken.nameHex, order.swapInToken.decimals, order.swapInToken.isVerified, order.swapInToken.isLpToken, order.swapInToken.name, order.swapInToken.ticker, order.swapInToken.logo, order.swapInToken.description),
            order.swapOutToken === null ? "lovelace" : new Asset(order.swapOutToken.policyId, order.swapOutToken.nameHex, order.swapOutToken.decimals, order.swapOutToken.isVerified, order.swapOutToken.isLpToken, order.swapOutToken.name, order.swapOutToken.ticker, order.swapOutToken.logo, order.swapOutToken.description),
            order.orderType,
            BigInt(order.swapInAmount),
            BigInt(order.minReceive),
            order.actualReceive ? BigInt(order.actualReceive) : null,
            BigInt(order.dexFeesPaid),
            order.senderPubKeyHash,
            order.senderStakeKeyHash,
            operationStatuses,
            order.txHash,
            Number(order.outputIndex),
            Number(order.slot),
            liquidityPool2,
            order.meta
          );
        }),
        pagination: response.data.pagination
      };
    });
  }
  swapsHistoric(fromTimestamp, toTimestamp, forAssets = []) {
    return import_axios5.default.post(`${this._baseHost}/api/liquidity-pools/swaps/historic`, {
      fromTimestamp,
      toTimestamp,
      forAssets: forAssets.map((asset) => asset.identifier())
    }).then((response) => {
      return response.data.map((order) => {
        const operationStatuses = order.statuses?.map((status) => {
          return new OperationStatus(
            null,
            status.status,
            status.slot,
            status.txHash,
            status.outputIndex,
            status.operationTxHash,
            status.operationOutputIndex
          );
        }) ?? [];
        const liquidityPool = order.liquidityPool ? this.responseToLiquidityPool(order.liquidityPool) : null;
        return new SwapOrder(
          order.swapInToken === null ? "lovelace" : new Asset(order.swapInToken.policyId, order.swapInToken.nameHex, order.swapInToken.decimals, order.swapInToken.isVerified, order.swapInToken.isLpToken, order.swapInToken.name, order.swapInToken.ticker, order.swapInToken.logo, order.swapInToken.description),
          order.swapOutToken === null ? "lovelace" : new Asset(order.swapOutToken.policyId, order.swapOutToken.nameHex, order.swapOutToken.decimals, order.swapOutToken.isVerified, order.swapOutToken.isLpToken, order.swapOutToken.name, order.swapOutToken.ticker, order.swapOutToken.logo, order.swapOutToken.description),
          order.orderType,
          BigInt(order.swapInAmount),
          BigInt(order.minReceive),
          order.actualReceive ? BigInt(order.actualReceive) : null,
          BigInt(order.dexFeesPaid),
          order.senderPubKeyHash,
          order.senderStakeKeyHash,
          operationStatuses,
          order.txHash,
          Number(order.outputIndex),
          Number(order.slot),
          liquidityPool,
          order.meta
        );
      });
    });
  }
  depositOrders(liquidityPool, senderFilter = "", pagination = { page: 1, limit: 100 }) {
    return import_axios5.default.get(`${this._baseHost}/api/liquidity-pools/${liquidityPool.identifier}/deposits?page=${pagination.page}&limit=${pagination.limit}&sender=${senderFilter}`).then((response) => {
      return {
        data: response.data.data.map((order) => {
          const operationStatuses = order.statuses?.map((status) => {
            return new OperationStatus(
              null,
              status.status,
              status.slot,
              status.txHash,
              status.outputIndex,
              status.operationTxHash,
              status.operationOutputIndex
            );
          }) ?? [];
          const liquidityPool2 = order.liquidityPool ? this.responseToLiquidityPool(order.liquidityPool) : null;
          return new DepositOrder(
            order.depositAToken === null ? "lovelace" : new Asset(order.depositAToken.policyId, order.depositAToken.nameHex, order.depositAToken.decimals, order.depositAToken.isVerified, order.depositAToken.isLpToken, order.depositAToken.name, order.depositAToken.ticker, order.depositAToken.logo, order.depositAToken.description),
            order.depositBToken === null ? "lovelace" : new Asset(order.depositBToken.policyId, order.depositBToken.nameHex, order.depositBToken.decimals, order.depositBToken.isVerified, order.depositBToken.isLpToken, order.depositBToken.name, order.depositBToken.ticker, order.depositBToken.logo, order.depositBToken.description),
            BigInt(order.depositAAmount),
            BigInt(order.depositBAmount),
            BigInt(order.dexFeesPaid),
            order.senderPubKeyHash,
            order.senderStakeKeyHash,
            operationStatuses,
            order.txHash,
            Number(order.outputIndex),
            Number(order.slot),
            liquidityPool2,
            order.meta
          );
        }),
        pagination: response.data.pagination
      };
    });
  }
  depositsHistoric(fromTimestamp, toTimestamp, forAssets = []) {
    return import_axios5.default.post(`${this._baseHost}/api/liquidity-pools/deposits/historic`, {
      fromTimestamp,
      toTimestamp,
      forAssets: forAssets.map((asset) => asset.identifier())
    }).then((response) => {
      return response.data.map((order) => {
        const operationStatuses = order.statuses?.map((status) => {
          return new OperationStatus(
            null,
            status.status,
            status.slot,
            status.txHash,
            status.outputIndex,
            status.operationTxHash,
            status.operationOutputIndex
          );
        }) ?? [];
        const liquidityPool = order.liquidityPool ? this.responseToLiquidityPool(order.liquidityPool) : null;
        return new DepositOrder(
          order.depositAToken === null ? "lovelace" : new Asset(order.depositAToken.policyId, order.depositAToken.nameHex, order.depositAToken.decimals, order.depositAToken.isVerified, order.depositAToken.isLpToken, order.depositAToken.name, order.depositAToken.ticker, order.depositAToken.logo, order.depositAToken.description),
          order.depositBToken === null ? "lovelace" : new Asset(order.depositBToken.policyId, order.depositBToken.nameHex, order.depositBToken.decimals, order.depositBToken.isVerified, order.depositBToken.isLpToken, order.depositBToken.name, order.depositBToken.ticker, order.depositBToken.logo, order.depositBToken.description),
          BigInt(order.depositAAmount),
          BigInt(order.depositBAmount),
          BigInt(order.dexFeesPaid),
          order.senderPubKeyHash,
          order.senderStakeKeyHash,
          operationStatuses,
          order.txHash,
          Number(order.outputIndex),
          Number(order.slot),
          liquidityPool,
          order.meta
        );
      });
    });
  }
  withdrawOrders(liquidityPool, senderFilter = "", pagination = { page: 1, limit: 100 }) {
    return import_axios5.default.get(`${this._baseHost}/api/liquidity-pools/${liquidityPool.identifier}/withdraws?page=${pagination.page}&limit=${pagination.limit}&sender=${senderFilter}`).then((response) => {
      return {
        data: response.data.data.map((order) => {
          const operationStatuses = order.statuses?.map((status) => {
            return new OperationStatus(
              null,
              status.status,
              status.slot,
              status.txHash,
              status.outputIndex,
              status.operationTxHash,
              status.operationOutputIndex
            );
          }) ?? [];
          const liquidityPool2 = order.liquidityPool ? this.responseToLiquidityPool(order.liquidityPool) : null;
          return new WithdrawOrder(
            new Asset(order.lpToken.policyId, order.lpToken.nameHex, order.lpToken.decimals),
            BigInt(order.lpTokenAmount),
            BigInt(order.minReceiveA),
            BigInt(order.minReceiveB),
            BigInt(order.dexFeesPaid),
            order.senderPubKeyHash,
            order.senderStakeKeyHash,
            operationStatuses,
            order.txHash,
            Number(order.outputIndex),
            Number(order.slot),
            liquidityPool2,
            order.meta
          );
        }),
        pagination: response.data.pagination
      };
    });
  }
  withdrawsHistoric(fromTimestamp, toTimestamp, forAssets = []) {
    return import_axios5.default.post(`${this._baseHost}/api/liquidity-pools/withdraws/historic`, {
      fromTimestamp,
      toTimestamp,
      forAssets: forAssets.map((asset) => asset.identifier())
    }).then((response) => {
      return response.data.map((order) => {
        const operationStatuses = order.statuses?.map((status) => {
          return new OperationStatus(
            null,
            status.status,
            status.slot,
            status.txHash,
            status.outputIndex,
            status.operationTxHash,
            status.operationOutputIndex
          );
        }) ?? [];
        const liquidityPool = order.liquidityPool ? this.responseToLiquidityPool(order.liquidityPool) : null;
        return new WithdrawOrder(
          new Asset(order.lpToken.policyId, order.lpToken.nameHex, order.lpToken.decimals),
          BigInt(order.lpTokenAmount),
          BigInt(order.minReceiveA),
          BigInt(order.minReceiveB),
          BigInt(order.dexFeesPaid),
          order.senderPubKeyHash,
          order.senderStakeKeyHash,
          operationStatuses,
          order.txHash,
          Number(order.outputIndex),
          Number(order.slot),
          liquidityPool,
          order.meta
        );
      });
    });
  }
  statesHistoric(fromTimestamp, toTimestamp, forAssets = []) {
    return import_axios5.default.post(`${this._baseHost}/api/liquidity-pools/states/historic`, {
      fromTimestamp,
      toTimestamp,
      forAssets: forAssets.map((asset) => asset.identifier())
    }).then((response) => {
      return response.data.map((state) => {
        const liquidityPool = state.liquidityPool ? this.responseToLiquidityPool(state.liquidityPool) : void 0;
        return new LiquidityPoolState(
          BigInt(state.reserveA),
          BigInt(state.reserveB),
          BigInt(state.lpTokens),
          Number(state.buyFeePercent),
          Number(state.sellFeePercent),
          BigInt(state.tvl),
          Number(state.slot),
          liquidityPool
        );
      });
    });
  }
  prices(poolIdentifiers, baseTokenIdentifier) {
    let url = `${this._baseHost}/api/liquidity-pools/prices`;
    if (baseTokenIdentifier) {
      url += `?baseTokenIdentifier=${baseTokenIdentifier}`;
    }
    return import_axios5.default.post(url, {
      identifiers: poolIdentifiers
    }).then((response) => response.data.map((entry) => {
      return {
        identifier: entry.identifier,
        price: entry.price,
        dayLow: entry.dayLow,
        dayHigh: entry.dayHigh,
        dayChange: entry.dayChange,
        hourChange: entry.hourChange
      };
    }));
  }
  ticks(liquidityPool, resolution, orderBy = "ASC", fromTime, toTime, baseTokenIdentifier) {
    let url = `${this._baseHost}/api/liquidity-pools/${liquidityPool.identifier}/ticks?resolution=${resolution}&orderBy=${orderBy}`;
    if (fromTime) {
      url += `&fromTime=${fromTime}`;
    }
    if (toTime) {
      url += `&toTime=${toTime}`;
    }
    if (baseTokenIdentifier) {
      url += `&baseTokenIdentifier=${baseTokenIdentifier}`;
    }
    return import_axios5.default.get(url).then((response) => {
      return response.data.map((tickInfo) => {
        return new Tick(
          tickInfo.liquidityPool ? this.responseToLiquidityPool(tickInfo.liquidityPool) : null,
          tickInfo.resolution,
          tickInfo.time * 1e3,
          tickInfo.open,
          tickInfo.high,
          tickInfo.low,
          tickInfo.close,
          tickInfo.volume
        );
      });
    });
  }
};

// src/api/SyncService.ts
var import_axios6 = __toESM(require("axios"));
var SyncService = class extends BaseApiService {
  latest() {
    return import_axios6.default.get(`${this._baseHost}/api/sync`).then((response) => new Sync(response.data.slot, response.data.blockHash));
  }
};

// src/api/OrderBookService.ts
var import_axios7 = __toESM(require("axios"));
var OrderBookService = class extends BaseApiService {
  all(pagination = { page: 1, limit: 100 }) {
    return import_axios7.default.get(`${this._baseHost}/api/order-books?page=${pagination.page}&limit=${pagination.limit}`).then((response) => {
      return response.data.map((orderBook) => {
        return new OrderBook(
          orderBook.dex,
          orderBook.identifier,
          orderBook.tokenA === null ? "lovelace" : new Asset(orderBook.tokenA.policyId, orderBook.tokenA.nameHex, orderBook.tokenA.decimals, orderBook.tokenA.isVerified, orderBook.tokenA.isLpToken, orderBook.tokenA.name, orderBook.tokenA.ticker, orderBook.tokenA.logo, orderBook.tokenA.description),
          new Asset(orderBook.tokenB.policyId, orderBook.tokenB.nameHex, orderBook.tokenB.decimals, orderBook.tokenB.isVerified, orderBook.tokenB.isLpToken, orderBook.tokenB.name, orderBook.tokenB.ticker, orderBook.tokenB.logo, orderBook.tokenB.description),
          orderBook.createdSlot
        );
      });
    });
  }
  match(book, pagination = { page: 1, limit: 100 }) {
    return import_axios7.default.post(`${this._baseHost}/api/order-books?page=${pagination.page}&limit=${pagination.limit}`, {
      identifier: book.identifier,
      dex: book.dex,
      tokenA: book.tokenA === "lovelace" ? "lovelace" : book.tokenA?.identifier("."),
      tokenB: book.tokenB?.identifier(".")
    }).then((response) => {
      return {
        data: response.data.data.map((orderBook) => {
          return new OrderBook(
            orderBook.dex,
            orderBook.identifier,
            orderBook.tokenA === null ? "lovelace" : new Asset(orderBook.tokenA.policyId, orderBook.tokenA.nameHex, orderBook.tokenA.decimals, orderBook.tokenA.isVerified, orderBook.tokenA.isLpToken, orderBook.tokenA.name, orderBook.tokenA.ticker, orderBook.tokenA.logo, orderBook.tokenA.description),
            new Asset(orderBook.tokenB.policyId, orderBook.tokenB.nameHex, orderBook.tokenB.decimals, orderBook.tokenB.isVerified, orderBook.tokenB.isLpToken, orderBook.tokenB.name, orderBook.tokenB.ticker, orderBook.tokenB.logo, orderBook.tokenB.description),
            orderBook.createdSlot
          );
        }),
        pagination: response.data.pagination
      };
    });
  }
  buyOrders(bookIdentifier) {
    return import_axios7.default.get(`${this._baseHost}/api/order-books/${bookIdentifier}/buy-orders`).then((response) => {
      return response.data.map((order) => {
        return new OrderBookOrder(
          order.identifier,
          order.fromToken === null ? "lovelace" : new Asset(order.fromToken.policyId, order.fromToken.nameHex, order.fromToken.decimals, order.fromToken.isVerified, order.fromToken.isLpToken, order.fromToken.name, order.fromToken.ticker, order.fromToken.logo, order.fromToken.description),
          order.toToken === null ? "lovelace" : new Asset(order.toToken.policyId, order.toToken.nameHex, order.toToken.decimals, order.toToken.isVerified, order.toToken.isLpToken, order.toToken.name, order.toToken.ticker, order.toToken.logo, order.toToken.description),
          BigInt(order.originalOfferAmount),
          BigInt(order.unFilledOfferAmount),
          BigInt(order.askedAmount),
          Number(order.price),
          Number(order.numPartialFills),
          Boolean(order.isCancelled),
          BigInt(order.dexFeesPaid),
          order.senderPubKeyHash,
          order.senderStakeKeyHash,
          Number(order.slot),
          order.txHash,
          Number(order.outputIndex)
        );
      });
    });
  }
  sellOrders(bookIdentifier) {
    return import_axios7.default.get(`${this._baseHost}/api/order-books/${bookIdentifier}/sell-orders`).then((response) => {
      return response.data.map((order) => {
        return new OrderBookOrder(
          order.identifier,
          order.fromToken === null ? "lovelace" : new Asset(order.fromToken.policyId, order.fromToken.nameHex, order.fromToken.decimals, order.fromToken.isVerified, order.fromToken.isLpToken, order.fromToken.name, order.fromToken.ticker, order.fromToken.logo, order.fromToken.description),
          order.toToken === null ? "lovelace" : new Asset(order.toToken.policyId, order.toToken.nameHex, order.toToken.decimals, order.toToken.isVerified, order.toToken.isLpToken, order.toToken.name, order.toToken.ticker, order.toToken.logo, order.toToken.description),
          BigInt(order.originalOfferAmount),
          BigInt(order.unFilledOfferAmount),
          BigInt(order.askedAmount),
          Number(order.price),
          Number(order.numPartialFills),
          Boolean(order.isCancelled),
          BigInt(order.dexFeesPaid),
          order.senderPubKeyHash,
          order.senderStakeKeyHash,
          Number(order.slot),
          order.txHash,
          Number(order.outputIndex)
        );
      });
    });
  }
  prices(identifiers) {
    return import_axios7.default.post(`${this._baseHost}/api/order-books/analytics/prices`, {
      identifiers
    }).then((response) => response.data.map((entry) => {
      return {
        identifier: entry.identifier,
        price: entry.price,
        dayLow: entry.dayLow,
        dayHigh: entry.dayHigh,
        dayChange: entry.dayChange,
        hourChange: entry.hourChange
      };
    }));
  }
  ticks(orderBook, resolution, fromTime, toTime) {
    let url = `${this._baseHost}/api/order-books/${orderBook.identifier}/ticks?resolution=${resolution}`;
    if (fromTime) {
      url += `&fromTime=${fromTime}`;
    }
    if (toTime) {
      url += `&toTime=${toTime}`;
    }
    return import_axios7.default.get(url).then((response) => {
      return response.data.map((tickInfo) => {
        const orderBook2 = tickInfo.orderBook ? new OrderBook(
          tickInfo.orderBook.dex,
          tickInfo.orderBook.identifier,
          tickInfo.orderBook.tokenA === null ? "lovelace" : new Asset(tickInfo.orderBook.tokenA.policyId, tickInfo.orderBook.tokenA.nameHex, tickInfo.orderBook.tokenA.decimals, tickInfo.orderBook.tokenA.isVerified, tickInfo.orderBook.tokenA.isLpToken, tickInfo.orderBook.tokenA.name, tickInfo.orderBook.tokenA.ticker, tickInfo.orderBook.tokenA.logo, tickInfo.orderBook.tokenA.description),
          new Asset(tickInfo.orderBook.tokenB.policyId, tickInfo.orderBook.tokenB.nameHex, tickInfo.orderBook.tokenB.decimals, tickInfo.orderBook.tokenB.isVerified, tickInfo.orderBook.tokenB.isLpToken, tickInfo.orderBook.tokenB.name, tickInfo.orderBook.tokenB.ticker, tickInfo.orderBook.tokenB.logo, tickInfo.orderBook.tokenB.description),
          tickInfo.orderBook.createdSlot
        ) : null;
        return new Tick(
          orderBook2,
          tickInfo.resolution,
          tickInfo.time * 1e3,
          tickInfo.open,
          tickInfo.high,
          tickInfo.low,
          tickInfo.close,
          tickInfo.volume
        );
      });
    });
  }
};

// src/IrisApiService.ts
var IrisApiService = class {
  constructor(baseHost) {
    this._baseHost = baseHost;
  }
  connection() {
    return new ConnectionService(this._baseHost);
  }
  sync() {
    return new SyncService(this._baseHost);
  }
  dex() {
    return new DexService(this._baseHost);
  }
  assets() {
    return new AssetService(this._baseHost);
  }
  liquidityPools() {
    return new LiquidityPoolService(this._baseHost);
  }
  orders() {
    return new OrdersService(this._baseHost);
  }
  orderBooks() {
    return new OrderBookService(this._baseHost);
  }
};

// src/resources/BaseWsResource.ts
var BaseWsResource = class {
};

// src/resources/SyncResource.ts
var SyncResource = class extends BaseWsResource {
  fromWebsocketMessage(message) {
    return new Sync(
      Number(message.s),
      message.bH
    );
  }
};

// src/resources/AssetResource.ts
var AssetResource = class extends BaseWsResource {
  fromWebsocketMessage(message) {
    return new Asset(
      message.pId,
      message.nH,
      Number(message.d),
      message.v,
      message.isLp,
      message.n,
      message.ti,
      message.l,
      message.de
    );
  }
};

// src/resources/LiquidityPoolStateResource.ts
var LiquidityPoolStateResource = class extends BaseWsResource {
  fromWebsocketMessage(message) {
    const liquidityPool = message.p ? new LiquidityPoolResource().fromWebsocketMessage(message.p) : void 0;
    const lpToken = message.tLp ? new AssetResource().fromWebsocketMessage(message.tLp) : void 0;
    return new LiquidityPoolState(
      BigInt(message.rA),
      BigInt(message.rB),
      BigInt(message.lpTs),
      Number(message.bF),
      Number(message.sF),
      BigInt(message.tvl),
      Number(message.s),
      liquidityPool,
      lpToken
    );
  }
};

// src/resources/LiquidityPoolResource.ts
var LiquidityPoolResource = class extends BaseWsResource {
  fromWebsocketMessage(message) {
    const assetResource = new AssetResource();
    const state = message.s ? new LiquidityPoolStateResource().fromWebsocketMessage(message.s) : void 0;
    return new LiquidityPool(
      message.d,
      message.i,
      message.a,
      message.oA,
      message.tA ? assetResource.fromWebsocketMessage(message.tA) : "lovelace",
      assetResource.fromWebsocketMessage(message.tB),
      Number(message.cS),
      void 0,
      state,
      message.m
    );
  }
};

// src/resources/LiquidityPoolTickResource.ts
var LiquidityPoolTickResource = class extends BaseWsResource {
  fromWebsocketMessage(message) {
    return new Tick(
      message.lP ? new LiquidityPoolResource().fromWebsocketMessage(message.lP) : null,
      message.r,
      message.ti * 1e3,
      message.o,
      message.h,
      message.l,
      message.c,
      message.v
    );
  }
};

// src/resources/SwapOrderResource.ts
var SwapOrderResource = class extends BaseWsResource {
  fromWebsocketMessage(message) {
    const assetResource = new AssetResource();
    const operationStatusResource = new OperationStatusResource();
    const liquidityPool = message.lp ? new LiquidityPoolResource().fromWebsocketMessage(message.lp) : void 0;
    return new SwapOrder(
      message.siT ? assetResource.fromWebsocketMessage(message.siT) : "lovelace",
      message.soT ? assetResource.fromWebsocketMessage(message.soT) : "lovelace",
      message.oI,
      BigInt(message.iA),
      BigInt(message.mR),
      message.aR ? BigInt(message.aR) : null,
      BigInt(message.fP),
      message.pkh,
      message.skh,
      message.st ? message.st.map((status) => operationStatusResource.fromWebsocketMessage(status)) : [],
      message.tH,
      Number(message.oI),
      Number(message.s),
      liquidityPool,
      message.m
    );
  }
};

// src/resources/DepositOrderResource.ts
var DepositOrderResource = class extends BaseWsResource {
  fromWebsocketMessage(message) {
    const assetResource = new AssetResource();
    const operationStatusResource = new OperationStatusResource();
    const liquidityPool = message.lp ? new LiquidityPoolResource().fromWebsocketMessage(message.lp) : void 0;
    return new DepositOrder(
      message.dAT ? assetResource.fromWebsocketMessage(message.dAT) : "lovelace",
      message.dBT ? assetResource.fromWebsocketMessage(message.dBT) : "lovelace",
      BigInt(message.dAA),
      BigInt(message.dBA),
      BigInt(message.fP),
      message.pkh,
      message.skh,
      message.st ? message.st.map((status) => operationStatusResource.fromWebsocketMessage(status)) : [],
      message.tH,
      Number(message.oI),
      Number(message.s),
      liquidityPool,
      message.m
    );
  }
};

// src/resources/WithdrawOrderResource.ts
var WithdrawOrderResource = class extends BaseWsResource {
  fromWebsocketMessage(message) {
    const assetResource = new AssetResource();
    const operationStatusResource = new OperationStatusResource();
    const liquidityPool = message.lp ? new LiquidityPoolResource().fromWebsocketMessage(message.lp) : void 0;
    return new WithdrawOrder(
      assetResource.fromWebsocketMessage(message.lpT),
      BigInt(message.lpA),
      BigInt(message.mA ?? 0),
      BigInt(message.mB ?? 0),
      BigInt(message.fP),
      message.pkh,
      message.skh,
      message.st ? message.st.map((status) => operationStatusResource.fromWebsocketMessage(status)) : [],
      message.tH,
      Number(message.oI),
      Number(message.s),
      liquidityPool,
      message.m
    );
  }
};

// src/resources/OperationStatusResource.ts
var OperationStatusResource = class extends BaseWsResource {
  fromWebsocketMessage(message) {
    let entity = null;
    if (message.oE) {
      switch (message.oE.t) {
        case "LiquidityPoolSwap" /* LiquidityPoolSwap */:
          entity = new SwapOrderResource().fromWebsocketMessage(message.oE);
          break;
        case "LiquidityPoolDeposit" /* LiquidityPoolDeposit */:
          entity = new DepositOrderResource().fromWebsocketMessage(message.oE);
          break;
        case "LiquidityPoolWithdraw" /* LiquidityPoolWithdraw */:
          entity = new WithdrawOrderResource().fromWebsocketMessage(message.oE);
          break;
      }
    }
    return new OperationStatus(
      entity,
      message.st,
      message.s,
      message.tH,
      message.oI,
      message.oTx,
      message.oOi
    );
  }
};

// src/resources/OrderBookResource.ts
var OrderBookResource = class extends BaseWsResource {
  fromWebsocketMessage(message) {
    const assetResource = new AssetResource();
    return new OrderBook(
      message.d,
      message.i,
      message.tA ? assetResource.fromWebsocketMessage(message.tA) : "lovelace",
      assetResource.fromWebsocketMessage(message.tB),
      Number(message.cS)
    );
  }
};

// src/resources/OrderBookOrderResource.ts
var OrderBookOrderResource = class extends BaseWsResource {
  fromWebsocketMessage(message) {
    const assetResource = new AssetResource();
    return new OrderBookOrder(
      message.i,
      message.fT ? assetResource.fromWebsocketMessage(message.fT) : "lovelace",
      message.tT ? assetResource.fromWebsocketMessage(message.tT) : "lovelace",
      BigInt(message.oA),
      BigInt(message.uA),
      BigInt(message.aA),
      Number(message.p),
      Number(message.pF),
      Boolean(message.iC),
      BigInt(message.fP),
      message.pkh,
      message.skh,
      Number(message.s),
      message.tH,
      Number(message.oI),
      message.m
    );
  }
};

// src/resources/OrderBookTickResource.ts
var OrderBookTickResource = class extends BaseWsResource {
  fromWebsocketMessage(message) {
    return new Tick(
      message.oB ? new OrderBookResource().fromWebsocketMessage(message.oB) : null,
      message.r,
      message.ti * 1e3,
      message.o,
      message.h,
      message.l,
      message.c,
      message.v
    );
  }
};

// src/resources/OrderBookMatchResource.ts
var OrderBookMatchResource = class extends BaseWsResource {
  fromWebsocketMessage(message) {
    const assetResource = new AssetResource();
    const orderResource = new OrderBookOrderResource();
    const orderBookResource = new OrderBookResource();
    return new OrderBookMatch(
      message.oB ? orderBookResource.fromWebsocketMessage(message.oB) : null,
      orderResource.fromWebsocketMessage(message.rO),
      message.fT ? assetResource.fromWebsocketMessage(message.fT) : "lovelace",
      BigInt(message.mA),
      message.pkh,
      message.skh,
      Number(message.s),
      message.tH,
      Number(message.oI),
      message.m
    );
  }
};

// src/IrisWebsocketService.ts
var IrisWebsocketService = class {
  constructor(baseHost) {
    this._baseHost = baseHost;
    this._listeners = [];
  }
  addListener(callback) {
    this._listeners.push(callback);
  }
  removeListener(callback) {
    this._listeners = this._listeners.filter((listener) => listener !== callback);
  }
  connect() {
    this._client = new WebSocket(this._baseHost);
    this._client.onmessage = (event) => {
      this._listeners.forEach((listener) => {
        try {
          listener(this.formatMessage(event));
        } catch (e) {
          console.error(e, event);
        }
      });
    };
    const reconnect = () => setTimeout(() => {
      this._client = void 0;
      this.connect();
    }, 5e3);
    this._client.onclose = () => reconnect();
    this._client.onerror = () => this._client?.close();
  }
  formatMessage(message) {
    const messageData = JSON.parse(message.data);
    switch (messageData["t"]) {
      case "Sync" /* Sync */:
        return new SyncResource().fromWebsocketMessage(messageData);
      case "LiquidityPool" /* LiquidityPool */:
        return new LiquidityPoolResource().fromWebsocketMessage(messageData);
      case "LiquidityPoolState" /* LiquidityPoolState */:
        return new LiquidityPoolStateResource().fromWebsocketMessage(messageData);
      case "LiquidityPoolTick" /* LiquidityPoolTick */:
        return new LiquidityPoolTickResource().fromWebsocketMessage(messageData);
      case "LiquidityPoolSwap" /* LiquidityPoolSwap */:
        return new SwapOrderResource().fromWebsocketMessage(messageData);
      case "LiquidityPoolDeposit" /* LiquidityPoolDeposit */:
        return new DepositOrderResource().fromWebsocketMessage(messageData);
      case "LiquidityPoolWithdraw" /* LiquidityPoolWithdraw */:
        return new WithdrawOrderResource().fromWebsocketMessage(messageData);
      case "OperationStatus" /* OperationStatus */:
        return new OperationStatusResource().fromWebsocketMessage(messageData);
      case "OrderBook" /* OrderBook */:
        return new OrderBookResource().fromWebsocketMessage(messageData);
      case "OrderBookOrder" /* OrderBookOrder */:
        return new OrderBookOrderResource().fromWebsocketMessage(messageData);
      case "OrderBookMatch" /* OrderBookMatch */:
        return new OrderBookMatchResource().fromWebsocketMessage(messageData);
      case "OrderBookTick" /* OrderBookTick */:
        return new OrderBookTickResource().fromWebsocketMessage(messageData);
      default:
        throw new Error("Unable to determine WS message type");
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Asset,
  AssetResource,
  AssetService,
  BaseApiService,
  BaseWsResource,
  ConnectionService,
  DepositOrder,
  DepositOrderResource,
  DexOperationStatus,
  DexService,
  IrisApiService,
  IrisWebsocketService,
  LiquidityPool,
  LiquidityPoolResource,
  LiquidityPoolService,
  LiquidityPoolState,
  LiquidityPoolStateResource,
  LiquidityPoolTickResource,
  OperationStatus,
  OperationStatusResource,
  OrderBook,
  OrderBookMatch,
  OrderBookMatchResource,
  OrderBookOrder,
  OrderBookOrderResource,
  OrderBookResource,
  OrderBookService,
  OrderBookTickResource,
  OrdersService,
  Statusable,
  SwapOrder,
  SwapOrderResource,
  SwapOrderType,
  Sync,
  SyncResource,
  Tick,
  TickInterval,
  WithdrawOrder,
  WithdrawOrderResource,
  WsEvent,
  hexToAscii,
  tokenDecimals,
  tokenId
});
