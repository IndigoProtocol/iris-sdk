import { hexToAscii } from '../utils';

export class Asset {

    constructor(
        public policyId: string,
        public nameHex: string,
        public decimals: number | null = 0,
        public isVerified: boolean = false,
        public isLpToken: boolean = false,
        public name: string | null = null,
        public ticker: string | null = null,
        public logo: string | null = null,
        public description: string | null = null,
        public meta?: any,
    ) {
    }

    get readableTicker(): string {
        return (this.ticker === '' ? undefined : this.ticker) ?? this.name ?? hexToAscii(this.nameHex);
    }

    get readableName(): string {
        return this.name ?? hexToAscii(this.nameHex);
    }

    public identifier(dilimeter: '' | '.' = ''): string {
        return `${this.policyId}${dilimeter}${this.nameHex}`;
    }

    static fromIdentifier(id: string, decimals: number = 0): Asset {
        id = id.replace('.', '');

        return new Asset(
            id.slice(0, 56),
            id.slice(56),
            decimals,
        );
    }

}

export type Token = Asset | 'lovelace';
