import nodemailer from 'nodemailer';
import { EmailSender, EmailPayload } from './EmailSender';

export interface NodemailerConfig {
  smtpHost: string;
  smtpPort: number;
  smtpUser: string;
  smtpPass: string;
}

export class NodemailerEmailService extends EmailSender {
  private transporter: nodemailer.Transporter;

  constructor(private config: NodemailerConfig) {
    super();

    this.transporter = nodemailer.createTransport({
      host: config.smtpHost,
      port: config.smtpPort,
      secure: true,
      auth: {
        user: config.smtpUser,
        pass: config.smtpPass,
      },
    });
  }

  async sendEmail(payload: EmailPayload): Promise<void> {
    this.validateParameters(payload.email, payload.htmlData);

    const mailOptions: nodemailer.SendMailOptions = {
      from: this.config.smtpUser,
      to: payload.email,
      subject: payload.subject,
      html: payload.htmlData,
      attachments: payload.attachments,
    };

    try {
      return this.transporter.sendMail(mailOptions);
    } catch (error) {
      throw new Error('Failed to send email');
    }
  }

  private validateParameters(recipientEmail: string, htmlData: string | undefined): void {
    if (!recipientEmail || !htmlData) {
      throw new Error('recipientEmail and templateId are required fields.');
    }
  }
}
