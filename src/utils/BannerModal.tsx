import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { modalPropType } from "../utils/type";

const ModalContainer = ({
  isOpen,
  setIsopen,
  title = "",
  children,
}: modalPropType) => {
  return (
    <Modal
      isOpen={isOpen}
      toggle={() => setIsopen(false)}
      centered // Set the centered attribute to true
      className="custom-modal"
    >
      <ModalHeader toggle={() => setIsopen(false)}>{title}</ModalHeader>
      <ModalBody>{children}</ModalBody>
    </Modal>
  );
};

export default ModalContainer;
