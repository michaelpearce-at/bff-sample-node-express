"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bff_1 = require("../app/bff");
exports.register = (app) => {
    app.get("/", (req, res) => {
        res.send("Hello world!");
    });
    app.get("/bff/claimable", (req, res) => {
        const authToken = req.header("X-Auth-Token");
        bff_1.claimable(authToken)
            .then((claimables) => {
            res.send(claimables);
        }, (reason) => {
            // tslint:disable-next-line:no-console
            console.log("rejected from index: " + reason);
            res.status(500).send(reason.toString());
        });
    });
};
//# sourceMappingURL=index.js.map