import Button from "@/components/buttons/Button";
import { Modal } from "@/components/Modal";

interface ConfrimDeleteDonationProps {
  id: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

const ConfrimDeleteDonation: React.FC<ConfrimDeleteDonationProps> = ({
  isOpen,
  onClose,
  //   id,
  title,
}) => {
  return (
    <Modal padded isOpen={isOpen} onClose={onClose}>
      <div>
        <h1 className="text-2xl font-medium">Hapus donasi?</h1>
        <p className="mt-1 text-sm text-neutral-400">
          {`Apakah anda yakin ingin menghapus donasi "${title}"`}
        </p>
        <div className="mt-8 flex justify-end">
          <Button
            autoPadding
            onClick={onClose}
            className="text-sm"
            type="button"
          >
            Batal
          </Button>
          <Button
            // onClick={handleLogout}
            className="py-1 text-sm"
            type="button"
            danger
            autoPadding
          >
            Hapus
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfrimDeleteDonation;
