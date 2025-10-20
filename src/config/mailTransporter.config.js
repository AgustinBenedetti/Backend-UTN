import nodemailer from "nodemailer";
import ENVIROMENT from "./enviroment.config.js";

const mailtransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: ENVIROMENT.GMAIL_USER,
        pass: ENVIROMENT.GMAIL_PASSWORD
    },
    tls: { 
        rejectUnauthorized: false //Ignorar las validaciones de certificado TLS
    }
});

export default mailtransporter;