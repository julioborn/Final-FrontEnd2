import { rest } from "msw";
import { API_URL } from "../app/constants";
import { result, result2 } from "./dataMock";

export const handlers = [
    rest.get(API_URL, (req, res, ctx) => {
        if (req.url.searchParams.get("character") === "Homer") {
            return res(
                ctx.status(200),
                ctx.json(result)
            );
        } else {
            return res(
                ctx.status(200),
                ctx.json(result2)
            );
        }
    })
];