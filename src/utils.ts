import { Token } from './models/Asset';

export function hexToAscii(hex: string): string {
    hex = hex.toString();

    let result: string = '';
    for (let i = 0; i < hex.length; i += 2) {
        result += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }

    return result;
}

export function tokenId(token: Token): string {
    return token === 'lovelace'
        ? 'ADA'
        : token.identifier();
}

export function tokenDecimals(token: Token): number {
    return token === 'lovelace'
        ? 6
        : token.decimals ?? 0;
}
