import { Router } from "express";
import { PDFController } from "./controllers";

const routes: Router = Router()

routes.get('/pdf', PDFController.index)

export default routes;