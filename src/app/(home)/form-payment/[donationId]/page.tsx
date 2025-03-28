import FormPaymentIndex from "./components/FormPaymentIndex";

const FormPayment = async ({
  params,
}: {
  params: Promise<{ donationId: string }>;
}) => {
  const { donationId } = await params;
  return <FormPaymentIndex donationId={donationId}/>;
};

export default FormPayment;
