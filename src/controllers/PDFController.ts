import { Request, Response } from "express";
import puppeteer from "puppeteer";
import fs from 'fs'
import { resolve } from "path";
import Handlebars from "handlebars";

class PDFController {
  async index(_: Request, response: Response) {
    // Define o nome do PDF
    const name = 'arquivo-nodejs-pdf-example.pdf';

    /*
      headless: Informa se o navegador deve rodar em headless, ou seja, sem interface gráfica
    */
    let configLaunch = {
      headless: true, 
      ignoreDefaultArgs: ['--disable-extensions'],
    };

    const browser = await puppeteer.launch(configLaunch);
    const page = await browser.newPage();
    const waitUntil = 'networkidle2';

    // Buscando o template 
    const templateDir = resolve(__dirname, '..', 'views', 'template-pdf.hbs');
    const file = fs.readFileSync(templateDir, 'utf-8');

    // Compilando o template no handlebars
    const fileCompiled = Handlebars.compile(file);

    // Pegando o resultado do template em string
    const fileHTML = fileCompiled({})

    // Seta o HTML do PDF
    await page.setContent(fileHTML, {
      waitUntil,
    });

    await page.setDefaultNavigationTimeout(0);

    // Gera o arquivo PDF
    await page.pdf({
      format: 'A4',
      path: `tmp/${name}`,
      displayHeaderFooter: false,
      preferCSSPageSize: false,
      printBackground: true,
    });

    await browser.close();

    const pdfFile = fs.readFileSync(`tmp/${name}`);

    // Remove o arquivo PDF da pasta temporaria
    fs.unlinkSync(`tmp/${name}`);

    // Retorna o PDF
    response.contentType('application/pdf');
    response.send(pdfFile);
  }
}

export default new PDFController();