import * as yup from "yup";
import { emailValidation } from "../auth/schema";

const errorMessegeRequired = "field is a required field";

export const paymentSchema = yup.object().shape({
  email: emailValidation,
  amount: yup.string().required(errorMessegeRequired),
  donorName: yup.string().required(errorMessegeRequired),
  message: yup.string().required(),
});
