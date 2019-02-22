import axios from "axios";
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
                // tslint:disable-next-line:no-console
                console.log(rawClaimable);
                return {
                    due_at: formatDate(rawClaimable.dueAt),
                    id: rawClaimable.id,
                    price: "Some price",
                    title: rawClaimable.title
                } as IClaimable;
            });
        });
}

function formatDate(dateString: string) {
    const date = moment(dateString);
    return date.format("d MMM YYYY");
}
