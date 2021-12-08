import nodemailer, { Transporter } from 'nodemailer';
import { SES } from 'aws-sdk';
import handlebars from 'handlebars';
import fs from 'fs';

import { IMailProvider } from "../IMailProvider";

class SESMailProvider implements IMailProvider {
    private client: Transporter;

    constructor() {
        this.client = nodemailer.createTransport({
            SES: new SES({
                apiVersion: '2010-12-01',
                region: process.env.AWS_REGION
            })
        });
    }

    async sendMail(to: string, subject: string, variables: any, path: string): Promise<void> {
        const templateFileContent = fs.readFileSync(path).toString('utf-8'); //Pegar arquivo de templante puro

        const templateParse = handlebars.compile(templateFileContent); // Utilizando o handlebars para fazer o parse do template

        const templanteHTML = templateParse(variables); // Passando a variables do template

        await this.client.sendMail({
            to,
            from: 'Rentx <jhonatanmuniz@deve.com>',
            subject,
            html: templanteHTML
        });
    }
}

export { SESMailProvider };