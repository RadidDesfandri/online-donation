import { useRouter } from "next/navigation";
import Button from "./buttons/Button";
import { Modal } from "./Modal";
import { supabaseClientComponent } from "@/lib/supabase/supabaseClientComponent";

interface LogoutConfirmProps {
  isOpen: boolean;
  onClose: () => void;
}

const LogoutConfirm: React.FC<LogoutConfirmProps> = ({ isOpen, onClose }) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const { error } = await supabaseClientComponent.auth.signOut();
      if (error) {
        alert("Something went wrong");
      } else {
        alert("Logout success");
        router.push("/auth");
      }
    } catch (error) {
      console.log("ERROR LOGOUT:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} padded>
      <div>
        <h1 className="text-2xl font-medium">Logout</h1>
        <p className="mt-1 text-sm text-neutral-400">
          Apakah anda yakin ingin keluar?
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
            onClick={handleLogout}
            className="py-1 text-sm"
            type="button"
            danger
            autoPadding
          >
            Log Out
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default LogoutConfirm;
