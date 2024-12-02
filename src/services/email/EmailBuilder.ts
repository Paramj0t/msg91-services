export class EmailBuilder {
  private body: any;

  constructor(recipientEmail: string, senderId: string, domain: string) {
    this.body = {
      recipients: [{ to: [{ email: recipientEmail }] }],
      from: { email: senderId },
      domain: domain,
    };
  }

  setTemplateId(templateId: string | undefined) {
    if (templateId) {
      this.body.template_id = templateId;
    }
    return this;
  }

  setTemplateData(templateData: any) {
    this.body.recipients.forEach((recipient: any) => {
      recipient.variables = {};
      for (const [key, value] of Object.entries(templateData)) {
        if (typeof value === 'string' || typeof value === 'number') {
          recipient.variables[key] = value;
        }
      }
      // Handle CC/BCC if provided in the template data
      if (templateData.cc) recipient.cc = [{ email: templateData.cc }];
      if (templateData.bcc) recipient.bcc = [{ email: templateData.bcc }];
    });
    return this;
  }

  setAttachments(attachments: Array<{ filename: string; content: string | Buffer }> | undefined) {
    if (attachments && attachments.length > 0) {
      this.body.attachments = attachments.map((attachment) => {
        const base64Pattern = /^[A-Za-z0-9+/=]*$/;
        const isBase64 = typeof attachment.content === 'string' && base64Pattern.test(attachment.content);

        if (isBase64) {
          return {
            file: attachment.content,
            filename: attachment.filename,
          };
        }

        const base64Content = Buffer.isBuffer(attachment.content)
          ? attachment.content.toString('base64')
          : Buffer.from(attachment.content).toString('base64');

        return {
          file: base64Content,
          filename: attachment.filename,
        };
      });
    }
    return this;
  }

  build() {
    return this.body;
  }
}

