import { Xendit, Invoice as InvoiceClient } from "xendit-node";

const XENDIT_SECRET_KEY = process.env.XENDIT_SECRET_KEY || "";

const xenditClient = new Xendit({
  secretKey: XENDIT_SECRET_KEY,
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Invoice } = xenditClient;

export const xenditInvoiceClient = new InvoiceClient({
  secretKey: XENDIT_SECRET_KEY,
});
