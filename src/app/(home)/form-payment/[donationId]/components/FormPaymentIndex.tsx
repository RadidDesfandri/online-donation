"use client";

import Boxtag from "@/components/Boxtag";
import Button from "@/components/buttons/Button";
import Input from "@/components/inputs/Input";
import { InputRupiah } from "@/components/inputs/InputRupiah";
import TextArea from "@/components/inputs/TextArea";
import Skeleton from "@/components/loadings/Skeleton";
import { initialValuePayment } from "@/formiks/payment/initialValue";
import { paymentSchema } from "@/formiks/payment/schema";
import { useGetDetailDonation } from "@/hooks/donations/useGetDetailDonation";
import { useCheckoutDonation } from "@/hooks/payments/useCheckoutDonation";
import clsx from "clsx";
import { Form, Formik } from "formik";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { MdOutlineCategory } from "react-icons/md";

const FormPaymentIndex = ({ donationId }: { donationId: string }) => {
  const { data, isPending } = useGetDetailDonation(donationId);
  const [isClient, setIsClient] = useState<boolean>(false);
  const { mutate: submitCheckout, isPending: loadingSubmit } =
    useCheckoutDonation();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!data && !isPending) return notFound();

  if (!isClient) return null;

  return (
    <Formik
      initialValues={initialValuePayment}
      validationSchema={paymentSchema}
      onSubmit={(values) => {
        submitCheckout({ ...values, donationId });
      }}
    >
      {({ errors }) => {
        return (
          <Form className="mx-auto max-w-5xl px-5 py-4 md:px-0">
            <div
              className={clsx(
                "text-2xl font-bold text-black md:text-4xl",
                isPending && "flex items-center gap-2",
              )}
            >
              <span className="text-primaryGreen">Berdonasi</span> untuk{" "}
              {isPending ? (
                <Skeleton className="h-7 w-52 md:h-8 md:w-96" />
              ) : (
                <span>{data?.title}</span>
              )}
            </div>
            <div>
              {isPending ? (
                <Skeleton className="h-4 w-28" />
              ) : (
                <p className="flex items-center gap-1 text-sm text-neutral-700">
                  <MdOutlineCategory /> Kategori {data?.category}
                </p>
              )}
            </div>

            <div className="grid gap-8 py-7 md:grid-cols-5 md:py-10">
              <div className="order-2 md:order-none md:col-span-3">
                <div className="flex flex-col gap-2">
                  <Input
                    name="email"
                    type="email"
                    label="Email"
                    placeholder="Masukkan email anda"
                    error={!!errors.email}
                    disabled={isPending || loadingSubmit}
                  />
                  <div className="flex items-center gap-3">
                    <Input
                      name="donorName"
                      type="text"
                      label="Nama pengirim"
                      placeholder="Masukkan nama anda"
                      autoComplete="off"
                      error={!!errors.donorName}
                      disabled={isPending || loadingSubmit}
                    />
                    <InputRupiah
                      name="amount"
                      label="Jumlah donasi"
                      placeholder="Minimal Rp.1"
                      error={!!errors.amount}
                      disabled={isPending || loadingSubmit}
                    />
                  </div>
                  <TextArea
                    name="message"
                    label="Pesan untuk penerima"
                    error={!!errors.message}
                    placeholder="Tulis pesan anda disini..."
                    disabled={isPending || loadingSubmit}
                  />
                  <Button
                    type="submit"
                    secondary
                    autoPadding
                    disabled={isPending || loadingSubmit}
                    className="mt-2"
                  >
                    Submit
                  </Button>
                </div>
              </div>
              <div className="order-1 md:order-none md:col-span-2 md:col-start-4">
                {isPending ? (
                  <div className="flex flex-col gap-2">
                    <Skeleton className="h-72 w-full" />
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-10" />
                      <Skeleton className="h-4 w-10" />
                      <Skeleton className="h-4 w-10" />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Image
                      src={data?.thumbnail || "/non-image.png"}
                      alt={data?.title || "Thumbnail"}
                      width={500}
                      height={500}
                      className="h-full w-full rounded-md"
                    />
                    <div className="flex flex-wrap items-center gap-2">
                      {data?.tag.map((tag) => <Boxtag text={tag} key={tag} />)}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormPaymentIndex;
