import { hexToAscii } from '../utils';

export class Asset {

    public policyId: string;
    public nameHex: string;
    public decimals: number | null;
    public isVerified: boolean;
    public isLpToken: boolean;
    public name: string | null;
    public ticker: string | null;
    public logo: string | null;
    public description: string | null;

    constructor(
        policyId: string,
        nameHex: string,
        decimals: number | null = 0,
        isVerified: boolean = false,
        isLpToken: boolean = false,
        name: string | null = null,
        ticker: string | null = null,
        logo: string | null = null,
        description: string | null = null,
    ) {
        this.policyId = policyId;
        this.nameHex = nameHex;
        this.decimals = decimals;
        this.isVerified = isVerified;
        this.isLpToken = isLpToken;
        this.name = name;
        this.ticker = ticker;
        this.logo = logo;
        this.description = description;
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

}

export type Token = Asset | 'lovelace';
