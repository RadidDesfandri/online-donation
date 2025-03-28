import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { xenditInvoiceClient } from "@/lib/api/xendit";
import { responseError } from "@/lib/api/responseError";

export const POST = async (req: Request) => {
  try {
    const { amount, message, donorName, donationId, email } = await req.json();

    const donation = await prisma.donation.findUnique({
      where: {
        id: donationId,
      },
    });

    if (!donation) return responseError("Donation notfound", 404);

    const transaction = await prisma.$transaction(async (tx) => {
      const newTransaction = await tx.transaction.create({
        data: {
          amount,
          message,
          email,
          donorName,
          donationId,
        },
      });

      const invoiceResponse = await xenditInvoiceClient.createInvoice({
        data: {
          amount,
          externalId: newTransaction.id,
          payerEmail: email,
          shouldSendEmail: true,
          description: `Donasi dari ${newTransaction.donorName}, untuk ${donation?.title}`,
          successRedirectUrl: `${process.env.NEXT_PUBLIC_BASE_WEB_URL}/success?trx=${newTransaction.id}`,
          failureRedirectUrl: `${process.env.NEXT_PUBLIC_BASE_WEB_URL}/failed?trx=${newTransaction.id}`,
          invoiceDuration: "1800",
          customer: {
            email,
            givenNames: donorName,
          },
        },
      });

      if (!invoiceResponse.id && !invoiceResponse.invoiceUrl) {
        return responseError("Failed create invoice in Xendit", 400);
      }

      await tx.transaction.update({
        where: {
          id: newTransaction.id,
        },
        data: {
          paymentLinkId: invoiceResponse.id,
          paymentUrl: invoiceResponse.invoiceUrl,
        },
      });

      return invoiceResponse.invoiceUrl;
    });

    return NextResponse.json({
      status: "ok",
      paymentUrl: transaction,
    });
  } catch (error) {
    console.log("Internal error:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};
