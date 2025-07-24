import { NextFunction, Request, Response } from 'express';
import { ICreateUrl, IGetUrl, IUpdateUrl } from '../types/url';
import { urlFactory } from '../services/factories';


export const createShortUrlController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const input: ICreateUrl = {
        originalUrl: req.body.originalUrl,
        createdBy: res.locals.user._id,
    };
    const response = await urlFactory().createShortUrl(input);
    return res.status(response.code).json(response);
};

export const updateShortUrlController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const input: IUpdateUrl = {
        originalUrl: req.body.originalUrl,
        shortUrl: req.body.shortUrl,
    };
    const response = await urlFactory().updateShortUrl(input);
    return res.status(response.code).json(response);
};

export const deleteShortUrlController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const input: IGetUrl = {
        shortUrl: req.body.shortUrl,
    };
    const response = await urlFactory().deleteShortUrl(input);
    return res.status(response.code).json(response);
};

export const getShortUrlController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const input: IGetUrl = {
        shortUrl: req.body.shortUrl,
    };
    const response = await urlFactory().getShortUrl(input);
    return res.status(response.code).json(response);
};

export const getShortUrlCountController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const input: IGetUrl = {
        shortUrl: req.body.shortUrl,
    };
    const response = await urlFactory().getShortUrlCount(input);
    return res.status(response.code).json(response);
};

export const getAllShortUrlsController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const response = await urlFactory().getAllShortUrls();
    return res.status(response.code).json(response);
};