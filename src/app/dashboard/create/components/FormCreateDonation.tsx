"use client";

import Button from "@/components/buttons/Button";
import AutoCompleteInput from "@/components/inputs/AutoCompleteInput";
import { ImagePreviewSingle } from "@/components/inputs/ImagePreviewSingle";
import Input from "@/components/inputs/Input";
import { InputRupiah } from "@/components/inputs/InputRupiah";
import TextEditor from "@/components/TextEditor";
import { DONATION_TAG_LINES } from "@/constanst/donations";
import { initialValuesCreateDonation } from "@/formiks/donations/initialValues";
import { validationSchemaCreateDonation } from "@/formiks/donations/schema";
import { usePostDonation } from "@/hooks/donations/usePostDonation";
import { ErrorMessage, Form, Formik } from "formik";
import { useEffect, useState } from "react";

export interface DonationValues {
  title: string;
  content: string;
  tag: string[];
  thumbnail: string | null;
  amount: number;
}

const FormCreateDonation = () => {
  const [isClient, setIsClient] = useState<boolean>(false);
  const { mutate: handleSubmit, isPending } = usePostDonation();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <Formik
      initialValues={initialValuesCreateDonation}
      validationSchema={validationSchemaCreateDonation}
      onSubmit={(value) => {
        handleSubmit(value);
      }}
    >
      {({ values, setFieldValue, errors }) => (
        <Form className="flex flex-col gap-5">
          <ImagePreviewSingle
            name="thumbnail"
            label="Gambar Thumbnail"
            disabled={isPending}
          />
          <div className="flex w-full flex-col gap-2 md:flex-row">
            <Input
              label="Judul Donasi"
              name="title"
              type="text"
              disabled={isPending}
              placeholder="Masukkan judul donasi"
              autoComplete="off"
              error={!!errors.title}
            />
            <InputRupiah
              label="Target Donasi (optional)"
              name="amount"
              disabled={isPending}
              placeholder="Masukkan jumlah target donasi (contoh: 10.000.000)"
              error={!!errors.amount}
            />
          </div>
          <div className="flex w-full flex-col">
            <AutoCompleteInput
              name="tag"
              label="Tag"
              disabled={isPending}
              onSelect={(value) => setFieldValue("tag", value)}
              placeholder="Tambahkan tag terkait, lalu tekan Tab atau Enter"
              suggestions={DONATION_TAG_LINES}
            />
            <ErrorMessage
              name="tag"
              component="div"
              className="text-[11px] text-red-500"
            />
          </div>
          <div>
            <label htmlFor="content" className="mb-1 block text-sm font-medium">
              Deskripsi Donasi
            </label>
            <TextEditor
              value={values.content}
              disabled={isPending}
              onChange={(value) => setFieldValue("content", value)}
            />
            <ErrorMessage
              name="content"
              component="div"
              className="text-[11px] text-red-500"
            />
          </div>

          <Button
            type="submit"
            autoPadding
            secondary
            className="w-fit"
            disabled={isPending}
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default FormCreateDonation;
