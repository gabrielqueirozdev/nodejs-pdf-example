import express from "express";
import routes from './router';
import http from 'http'

class App {
  public app: express.Application
  public server: http.Server

  constructor() {
    this.app = express()
    this.server = new http.Server(this.app)

    this.config()
    this.routes()
  }

  private config(): void {
    this.app.use(express.json({ limit: '50mb' }))
    this.app.use(express.urlencoded({ limit: '50mb', extended: true }))
  }

  private routes(): void {
    this.app.use('/', routes)
  }
}

export default new App().server
