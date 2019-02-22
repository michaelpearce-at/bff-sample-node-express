"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const moment_1 = __importDefault(require("moment"));
function claimable(authToken) {
    return axios_1.default({
        headers: { "X-Auth-Token": authToken },
        method: "get",
        url: "https://api.dev.airtasker.com/api/v2/removals/claimable"
    })
        .then((response) => {
        return response.data.data.map((rawClaimable) => {
            // tslint:disable-next-line:no-console
            console.log(rawClaimable);
            return {
                due_at: formatDate(rawClaimable.dueAt),
                id: rawClaimable.id,
                price: "Some price",
                title: rawClaimable.title
            };
        });
    });
}
exports.claimable = claimable;
function formatDate(dateString) {
    const date = moment_1.default(dateString);
    return date.format("d MMM YYYY");
}
//# sourceMappingURL=bff.js.map