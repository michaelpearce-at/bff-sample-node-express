import * as express from "express";
import {claimable} from "../app/bff";

export const register = (app: express.Application) => {
    app.get("/", (req: express.Request, res: express.Response) => {
        res.send("Hello world!");
    });

    app.get("/bff/claimable", (req: express.Request, res: express.Response) => {
        const authToken = req.header("X-Auth-Token");
        claimable(authToken)
            .then((claimables) => {
                res.send(claimables);
            }, (reason) => {
                res.status(500).send(reason.toString());
            });
    });
};
