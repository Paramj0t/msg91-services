import { AxiosResponse } from "axios";

export abstract class EmailSender {
	abstract sendEmail(payload: EmailPayload): Promise<void> | Promise<AxiosResponse>;
}

export interface EmailPayload {
	email: string;
	subject: string;
	htmlData?: string;
  templateData?: Object;
	templateId?: string;
	attachments?: Array<{
		filename: string;
		content: Buffer | string;
		encoding?: string;
		path?: string;
	}>;
}
