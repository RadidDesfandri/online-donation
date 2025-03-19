import { useGetAllDonations } from "@/hooks/donations/useGetAllDonations";
import CardDonation from "./CardDonation";
import LoadingSkeletonCardDonation from "@/app/dashboard/components/LoadingSkeletonCardDonation";
import Empty from "@/components/Empty";

const ListDonation = () => {
  const { data, isPending } = useGetAllDonations();

  if (isPending) {
    return (
      <div className="grid grid-cols-1 place-content-center gap-4 md:grid-cols-2 lg:grid-cols-3">
        <LoadingSkeletonCardDonation />
        <LoadingSkeletonCardDonation />
        <LoadingSkeletonCardDonation />
      </div>
    );
  }

  if (!data?.response.length) {
    return <Empty text="Belum ada donasi yang tersedia" />;
  }

  return (
    <div className="grid grid-cols-1 place-content-center gap-4 md:grid-cols-2 lg:grid-cols-3">
      {data?.response.map((item, idx) => {
        return (
          <CardDonation
            key={idx}
            id={item.id}
            header={item.title}
            thumbnail={item.thumbnail}
            totalAmount={item.amount}
            tagline={item.tag}
          />
        );
      })}
    </div>
  );
};

export default ListDonation;
