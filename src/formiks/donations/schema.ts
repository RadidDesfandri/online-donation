import * as Yup from "yup";

export const validationSchemaCreateDonation = Yup.object({
  title: Yup.string().required().min(10),
  content: Yup.string().required(),
  tag: Yup.array().required().min(1).max(10),
  thumbnail: Yup.string().required(),
  amount: Yup.number().max(10),
});
