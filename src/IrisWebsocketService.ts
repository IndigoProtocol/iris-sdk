import { WsEvent } from './enums';
import { SyncResource } from './resources/SyncResource';
import { LiquidityPoolTickResource } from './resources/LiquidityPoolTickResource';
import { OperationStatusResource } from './resources/OperationStatusResource';
import { LiquidityPoolResource } from './resources/LiquidityPoolResource';
import { LiquidityPoolStateResource } from './resources/LiquidityPoolStateResource';
import { SwapOrderResource } from './resources/SwapOrderResource';
import { DepositOrderResource } from './resources/DepositOrderResource';
import { WithdrawOrderResource } from './resources/WithdrawOrderResource';

export class IrisWebsocketService {

    private readonly _baseHost: string;
    private _client: WebSocket | undefined;
    private _listeners: Function[];

    constructor(baseHost: string) {
        this._baseHost = baseHost;
        this._listeners = [];
    }

    public addListener(callback: Function): void {
        this._listeners.push(callback);
    }

    public connect(): void {
        this._client = new WebSocket(this._baseHost);

        this._client.onmessage = (event: MessageEvent) => {
            this._listeners.forEach((listener: Function) => listener(this.formatMessage(event)));
        };
    }

    private formatMessage(message: MessageEvent) {
        const messageData: any = JSON.parse(message.data);

        switch (messageData['t']) {
            case WsEvent.Sync:
                return (new SyncResource()).fromWebsocketMessage(messageData);
            case WsEvent.LiquidityPool:
                return (new LiquidityPoolResource()).fromWebsocketMessage(messageData);
            case WsEvent.LiquidityPoolState:
                return (new LiquidityPoolStateResource()).fromWebsocketMessage(messageData);
            case WsEvent.LiquidityPoolTick:
                return (new LiquidityPoolTickResource()).fromWebsocketMessage(messageData);
            case WsEvent.LiquidityPoolSwap:
                return (new SwapOrderResource()).fromWebsocketMessage(messageData);
            case WsEvent.LiquidityPoolDeposit:
                return (new DepositOrderResource()).fromWebsocketMessage(messageData);
            case WsEvent.LiquidityPoolWithdraw:
                return (new WithdrawOrderResource()).fromWebsocketMessage(messageData);
            case WsEvent.OperationStatus:
                return (new OperationStatusResource()).fromWebsocketMessage(messageData);
            default:
                throw new Error('Unable to determine WS message type');
        }
    }

}