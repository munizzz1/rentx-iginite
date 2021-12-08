import nodemailer, { Transporter } from 'nodemailer';
import { injectable } from 'tsyringe';
import handlebars from 'handlebars';
import fs from 'fs';

import { IMailProvider } from "../IMailProvider";

@injectable()
class EtherealMailProvider implements IMailProvider {
    private client: Transporter;

    constructor () {
        nodemailer.createTestAccount().then((account) => {
            const transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass,
                },
            });

            this.client = transporter;
        })
        .catch((err) => console.log(err));
    }

    async sendMail(to: string, subject: string, variables: any, path: string): Promise<void> {
        const templateFileContent = fs.readFileSync(path).toString('utf-8'); //Pegar arquivo de templante puro

        const templateParse = handlebars.compile(templateFileContent); // Utilizando o handlebars para fazer o parse do template

        const templanteHTML = templateParse(variables); // Passando a variables do template

        const message = await this.client.sendMail({
            to,
            from: 'Rentx <noreplay@rentx.com.br>',
            subject,
            html: templanteHTML
        });

        console.log('Message sent: %s', message.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    }
}

export { EtherealMailProvider };