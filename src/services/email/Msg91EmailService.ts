import axios, { AxiosResponse } from 'axios';
import { EmailSender, EmailPayload } from './EmailSender';
import { EmailBuilder } from './EmailBuilder';

export interface Msg91Config {
  authKey: string;
  domain: string
  senderId: string;
}

export class Msg91EmailService extends EmailSender {
  private baseUrl: string = 'https://api.msg91.com/api/v5/email/send';
  private authKey: string;
  private domain: string;
  private senderId: string;

  constructor(config: Msg91Config) {
    super();
    this.authKey = config.authKey;
    this.domain = config.domain;
    this.senderId = config.senderId;
  }

  async sendEmail(payload: EmailPayload): Promise<AxiosResponse> {
    const { email, subject, templateId, templateData, attachments } = payload;

    this.validateParameters(email, templateId);

    const emailBody = new EmailBuilder(email, this.senderId, this.domain)
      .setTemplateId(templateId)
      .setTemplateData(templateData)
      .setAttachments(attachments)
      .build();

    const headers = this.getHeaders();

    try {
      return axios.post(this.baseUrl, JSON.stringify(emailBody), { headers });
    } catch(error) {
      throw new Error('Failed to send email via MSG91');
    }
  }

  private validateParameters(recipientEmail: string, templateId: string | undefined): void {
    if (!recipientEmail || !templateId) {
      throw new Error('recipientEmail and templateId are required fields.');
    }
  }

  private getHeaders() {
    return {
      'Content-Type': 'application/json',
      accept: 'application/json',
      authkey: this.authKey,
    };
  }
}
