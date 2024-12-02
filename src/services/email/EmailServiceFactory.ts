import { EmailSender } from "./EmailSender";
import { Msg91Config, Msg91EmailService } from "./Msg91EmailService";
import { NodemailerConfig, NodemailerEmailService } from "./NodemailerEmailService";

export type EmailServiceConfig = 
  | { serviceType: 'msg91'; config: Msg91Config }
  | { serviceType: 'nodemailer'; config: NodemailerConfig };

export class EmailServiceFactory {
  static createService(config: EmailServiceConfig): EmailSender {
    switch(config.serviceType) {
      case 'msg91':
        return new Msg91EmailService(config.config);
      case 'nodemailer':
        return new NodemailerEmailService(config.config);
      default:
        throw new Error('Invalid email service type');
    }
  }
}
