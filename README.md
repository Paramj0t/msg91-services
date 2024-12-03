# Msg91- Email & Message Services.

[![npm version](https://badge.fury.io/js/message-email-service-factory.svg)](https://www.npmjs.com/package/msg91-service)        [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modular and extensible factory for sending **emails** (and **messages** in future versions). This package simplifies the process of integrating multiple email providers, starting with **Msg91** and **Nodemailer**.

---

## Features

- **Msg91** integration for emails using templates.
- **Nodemailer** support for SMTP-based email delivery which can be easily integrated with msg91 as it provides SMTP credentials.
- Unified interface for sending emails across providers.
- Easy to extend with additional services.
- Written in **TypeScript** for type safety and better developer experience.

> **Upcoming Features:** Future versions will include SMS support and message-sending capabilities.

---

> **NOTE:** Please put the credentials from your msg91 account. It will be provided there.

---

## How to use Email Service of MSG91

- There are two ways-
  1. By creating templates on msg91 then providing template id as mentioned in Example 1.
  2. By using SMTP credentials provided by msg91 to send email with nodemailer as mentioned in Example 2.

---

## Installation

Install the package using npm:

```bash
npm install msg91-service
```

---

## Example 1 (Email service with Template IDs)

```bash
import { EmailServiceFactory, EmailServiceConfig } from 'msg91-service';

// Configuration for Msg91
const msg91Config: EmailServiceConfig = {
  serviceType: 'msg91',
  config: {
    authKey: 'your-msg91-auth-key',
    senderId: 'your-sender-id',
    domain: 'your-domain.com',  // Optional domain parameter
  },
};

// Create Msg91 email service instance
const msg91Service = EmailServiceFactory.createService(msg91Config);

// Define the payload to be sent
const msg91Payload = {
  email: 'recipient@example.com',
  subject: 'Test Subject',
  templateId: 'your-template-id',
  templateData: {
    name: 'John Doe',
    orderNumber: '12345',
  },
};

// Send email
msg91Service.sendEmail(msg91Payload)
  .then(() => {
    console.log('Msg91 email sent successfully!');
  })
  .catch((error) => {
    console.error('Error sending Msg91 email:', error);
  });
```

## Example 2 (Email service with SMTP- nodemailer)

```bash
import { EmailServiceFactory, EmailServiceConfig } from 'msg91-service';

// Configuration for Nodemailer
const nodemailerConfig: EmailServiceConfig = {
  serviceType: 'nodemailer',
  config: {
    smtpHost: "your-smtp-host",   // SMTP host address
    smtpPort: 587,                   // SMTP port (usually 587 for TLS)
    smtpUser: 'emailer@yourdomain.com', // Your SMTP username
    smtpPass: 'your-smtp-password',   // Your SMTP password
  },
};

// Create Nodemailer email service instance
const nodemailerService = EmailServiceFactory.createService(nodemailerConfig);

// Define the payload to be sent
const nodemailerPayload = {
  email: 'recipient@example.com',
  subject: 'Test Subject',
  htmlData: "<h1>This is a test email from Nodemailer!</h1>",
};

// Send email
nodemailerService.sendEmail(nodemailerPayload)
  .then(() => {
    console.log('Nodemailer email sent successfully!');
  })
  .catch((error) => {
    console.error('Error sending Nodemailer email:', error);
  });
```
