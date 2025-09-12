import { Router } from "express";
import authMiddleWare from "../middlewares/authMiddleware";
import {
  createShortUrlController,
  getAllShortUrlsController,
  getShortUrlController,
  getShortUrlCountController,
  updateShortUrlController,
} from "../controllers/url";

const urlRouter = Router();

urlRouter.get("/:shortUrl", getShortUrlController);
urlRouter.get(
  "/analytics/:shortUrl",
  authMiddleWare,
  getShortUrlCountController
);
urlRouter.get("/", getAllShortUrlsController);
urlRouter.post("/", createShortUrlController);
// urlRouter.put("/:shortUrl", updateShortUrlController);
urlRouter.delete("/:shortUrl", updateShortUrlController);
// urlRouter.get("/:shortUrl", updateShortUrlController);

export default urlRouter;
