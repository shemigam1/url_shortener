import { generateShortHash } from "../../helpers/hash";
import { ResultFunction } from "../../helpers/utils";
import { shortUrlModel } from "../../models/url";
import User from "../../models/user";
import { ICreateUrl, IGetUrl, IUpdateUrl } from "../../types/url";
import { createProxyMiddleware } from "http-proxy-middleware";

class Url {
  public async createShortUrl({ originalUrl, createdBy }: ICreateUrl) {
    try {
      const user = await User.find({ email: createdBy });
      if (!user) {
        return ResultFunction(
          false,
          "user doesnt exist",
          401,
          "UNAUTHORIZED",
          null
        );
      }
      const shortHash: any = generateShortHash();
      const shortUrl = await shortUrlModel.create({
        originalUrl,
        shortUrl: shortHash,
        createdBy,
      });

      return ResultFunction(true, "short url created", 200, "OK", shortUrl);
    } catch (error) {
      // this.badReq()
      return ResultFunction(
        false,
        "something went wrong, try again later",
        500,
        "NOT_OK",
        null
      );
    }
  }

  public async updateShortUrl({ originalUrl, shortUrl }: IUpdateUrl) {
    try {
      const existing = shortUrlModel.findOne({ shortUrl });
      if (!existing) {
        return ResultFunction(
          false,
          "url doesnt exist",
          401,
          "BAD_REQUEST",
          null
        );
      }

      const updated = await shortUrlModel.findOneAndUpdate(
        { shortUrl },
        { originalUrl },
        { new: true }
      );
      return ResultFunction(true, "url updated", 200, "OK", updated);
    } catch (error) {
      return ResultFunction(
        false,
        "something went wrong, try again later",
        500,
        "NOT_OK",
        null
      );
    }
  }

  public async deleteShortUrl({ shortUrl }: IGetUrl) {
    try {
      const existing = shortUrlModel.findOne({ shortUrl });
      if (!existing) {
        return ResultFunction(
          false,
          "url doesnt exist",
          401,
          "BAD_REQUEST",
          null
        );
      }

      const deleted = await shortUrlModel.findOneAndDelete({ shortUrl });
      return ResultFunction(true, "url deleted", 200, "OK", null);
    } catch (error) {
      return ResultFunction(
        false,
        "something went wrong, try again later",
        500,
        "NOT_OK",
        null
      );
    }
  }

  public async getShortUrl(input: IGetUrl) {
    try {
      const existing = await shortUrlModel.findOne({
        shortUrl: input.shortUrl,
      });
      if (!existing) {
        return ResultFunction(
          false,
          "url doesnt exist",
          401,
          "BAD_REQUEST",
          null
        );
      }
      const target_url = existing.originalUrl;
      existing.visitCount += 1;
      await existing.save();
      return ResultFunction(true, "url found", 200, "OK", target_url);
    } catch (error) {
      return ResultFunction(
        false,
        "something went wrong, try again later",
        500,
        "NOT_OK",
        null
      );
    }
  }

  public async getShortUrlCount(input: IGetUrl) {
    try {
      const existing = await shortUrlModel.findOne({
        shortUrl: input.shortUrl,
      });
      if (!existing) {
        return ResultFunction(
          false,
          "url doesnt exist",
          401,
          "BAD_REQUEST",
          null
        );
      }
      return ResultFunction(true, "url found", 200, "OK", existing.visitCount);
    } catch (error) {
      return ResultFunction(
        false,
        "something went wrong, try again later",
        500,
        "NOT_OK",
        null
      );
    }
  }

  public async getAllShortUrls() {
    try {
      const urls = await shortUrlModel.find({}).sort({ createdAt: -1 });
      return ResultFunction(true, "urls found", 200, "OK", urls);
    } catch (error) {
      return ResultFunction(
        false,
        "something went wrong, try again later",
        500,
        "NOT_OK",
        null
      );
    }
  }
}

export default Url;
