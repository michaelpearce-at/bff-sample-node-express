import axios from "axios";
import Big from "big.js";
import moment from "moment";
import {IClaimable, IRawClaimableResponse} from "../entities/entities";

export function claimable(authToken: string) {
    return axios({
        headers: {"X-Auth-Token": authToken},
        method: "get",
        url: "https://api.dev.airtasker.com/api/v2/removals/claimable"
    })
        .then((response) => {
            return (response.data as IRawClaimableResponse).data.map((rawClaimable) => {
                return {
                    due_at: formatDate(rawClaimable.dueAt),
                    id: rawClaimable.id,
                    price: formatPrice(rawClaimable.price_details.value_subunits,
                        rawClaimable.price_details.currency_code),
                    title: rawClaimable.title
                } as IClaimable;
            });
        }, (reason) => {
            return Promise.reject(reason);
        });
}

function formatDate(dateString: string) {
    const date = moment(dateString);
    return date.format("d MMM YYYY");
}

function formatPrice(subunits: number, currencyCode: string) {
    const currencyFormat = new Intl.NumberFormat("en-AU", {style: "currency", currency: currencyCode});
    const divisor = Math.pow(10, currencyFormat.resolvedOptions().maximumFractionDigits);
    const units = Big(subunits).div(divisor);
    return currencyFormat.format(Number(units));
}
