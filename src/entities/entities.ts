export interface IRawPriceDetails {
    value_subunits: number;
    currency_code: string;
}

export interface IRawClaimable {
    id: string;
    title: string;
    price_details: IRawPriceDetails;
    dueAt: string;
}

export interface IRawClaimableResponse {
    data: IRawClaimable[];
}

export interface IClaimable {
    id: string;
    title: string;
    price: string;
    due_at: string;
}
