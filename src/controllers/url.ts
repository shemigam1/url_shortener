import { NextFunction, Request, Response } from "express";
import { ICreateUrl, IGetUrl, IUpdateUrl } from "../types/url";
import { urlFactory } from "../services/factories";

export const createShortUrlController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("here");
  const input: ICreateUrl = {
    originalUrl: req.body.originalUrl,
    createdBy: req.body.createdBy,
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
  const redirect_target = response.data.target_url;
  //   if (!redirect_target) return res.status(response.code).json(response);
  const proxyOptions = {
    target: response.data.target_url,
    changeOrigin: true,
  };
  res.redirect(302, redirect_target);
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
