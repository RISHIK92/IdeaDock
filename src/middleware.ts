import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./index";

export interface CustomRequest extends Request {
    userId?: string;
}

function auth(req: CustomRequest, res: Response, next: NextFunction): void {
    const token = req.headers.token as string | undefined;

    if (!token) {
        res.status(401).json({ msg: "Token Missing" });
        return;
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
        req.userId = decoded.id;
        next();
    } catch (error) {
        res.status(403).json({ msg: "Invalid credentials" });
    }
}

export { auth };