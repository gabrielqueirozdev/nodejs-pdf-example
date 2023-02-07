import { Router } from "express";
import { PDFController } from "./controllers";

const routes: Router = Router()

routes.get('/', PDFController.index)

export default routes;