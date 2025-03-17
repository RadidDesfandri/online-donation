"use client";

import Button from "@/components/buttons/Button";
import AutoCompleteInput from "@/components/inputs/AutoCompleteInput";
import { ImagePreviewSingle } from "@/components/inputs/ImagePreviewSingle";
import Input from "@/components/inputs/Input";
import TextEditor from "@/components/TextEditor";
import { DONATION_TAG_LINES } from "@/constanst/donations";
import { initialValuesCreateDonation } from "@/formiks/donations/initialValues";
import { validationSchemaCreateDonation } from "@/formiks/donations/schema";
import { ErrorMessage, Form, Formik } from "formik";
import { useEffect, useState } from "react";

export interface DonationValues {
  title: string;
  content: string;
  tag: string[];
  thumbnail: string | null;
}

const FormCreateDonation = () => {
  const [isClient, setIsClient] = useState<boolean>(false);

  const handleSubmit = (values: DonationValues) => {
    alert("TESSSSSSSS");
    console.log(values);
  };

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
          <ImagePreviewSingle name="thumbnail" label="Thumbnail" />
          <div className="flex w-full flex-col gap-2 md:flex-row">
            <Input
              label="Judul"
              name="title"
              type="text"
              placeholder="Create a title for your donation"
              autoComplete="off"
              error={!!errors.title}
            />
            <div className="flex w-full flex-col">
              <AutoCompleteInput
                name="tag"
                label="Tagline"
                onSelect={(value) => setFieldValue("tag", value)}
                suggestions={DONATION_TAG_LINES}
              />
              <ErrorMessage
                name="tag"
                component="div"
                className="text-[11px] text-red-500"
              />
            </div>
          </div>
          <div>
            <label htmlFor="content" className="mb-1 block text-sm font-medium">
              Content
            </label>
            <TextEditor
              value={values.content}
              onChange={(value) => setFieldValue("content", value)}
            />
            <ErrorMessage
              name="content"
              component="div"
              className="text-[11px] text-red-500"
            />
          </div>

          <Button type="submit" autoPadding secondary className="w-fit">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default FormCreateDonation;
