import DetailDonationsIndex from "./components/DetailDonationsIndex";

const DetailDonation = async ({
  params,
}: {
  params: Promise<{ donationId: string }>;
}) => {
  const { donationId } = await params;

  return <DetailDonationsIndex donationId={donationId} />;
};

export default DetailDonation;
