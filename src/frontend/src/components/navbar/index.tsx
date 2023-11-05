import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import routes from "../../constants/routes";
import { AuthContext } from "./auth/AuthProvider";
import { useContext } from "react";

interface IProps {
  bodyText: string;
  headerText?: string;

  onConfirm: () => void;
  onCancel?: () => void;

  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const ConfirmationModal = (props: IProps) => {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        {props.headerText && <ModalHeader>{props.headerText}</ModalHeader>}
        <ModalCloseButton />

        <ModalBody>
          <p className="text-center m-8 text-xl">{props.bodyText}</p>
        </ModalBody>

        <ModalFooter className="space-x-6">
          <Button colorScheme="green" width="full" onClick={props.onConfirm}>
            Potvrdi
          </Button>
          <Button
            colorScheme="red"
            variant={"outline"}
            width={"full"}
            onClick={props.onCancel || props.onClose}
          >
            Odustani
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const Navbar = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { logout, getFullName } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="w-full bg-white flex items-center px-8 py-4 justify-between">
      <ConfirmationModal
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        headerText="Odjava?"
        bodyText={"Želite li se odjaviti?"}
        onConfirm={() => {
          logout();
          navigate(routes.LANDING);
        }}
      />
      <div className="space-x-8 flex items-center">
        <Link
          to={routes.LANDING}
          className="text-cyan-500 font-bold italic text-xl"
        >
          DentAll
        </Link>
        <Link
          to={routes.TRANSPORT.COMPANIES}
          className={
            location.pathname.startsWith(routes.TRANSPORT.COMPANIES)
              ? "text-gray-600"
              : ""
          }
        >
          Prijevoznici
        </Link>
      </div>
      <div className="flex space-x-8 items-center">
        <p className="text-lg">{getFullName()}</p>
        <Button colorScheme="red" variant={"outline"} onClick={onOpen}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
