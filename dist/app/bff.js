"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
// import Big from "big.js";
const moment_1 = __importDefault(require("moment"));
function claimable(authToken) {
    return axios_1.default({
        headers: { "X-Auth-Token": authToken },
        method: "get",
        url: "https://api.dev.airtasker.com/api/v2/removals/claimable"
    })
        .then((response) => {
        return response.data.data.map((rawClaimable) => {
            return {
                due_at: formatDate(rawClaimable.dueAt),
                id: rawClaimable.id,
                price: formatPrice(rawClaimable.price_details.value_subunits, rawClaimable.price_details.currency_code),
                title: rawClaimable.title
            };
        });
    }, (reason) => {
        // tslint:disable-next-line:no-console
        console.log("rejected: " + reason);
        return Promise.reject(reason);
    });
}
exports.claimable = claimable;
function formatDate(dateString) {
    const date = moment_1.default(dateString);
    return date.format("d MMM YYYY");
}
function formatPrice(subunits, currencyCode) {
    const currencyFormat = new Intl.NumberFormat("en-AU", { style: "currency", currency: currencyCode });
    const divisor = Math.pow(10, currencyFormat.resolvedOptions().maximumFractionDigits);
    const units = Big(subunits).div(divisor);
    return currencyFormat.format(Number(units));
}
//# sourceMappingURL=bff.js.map