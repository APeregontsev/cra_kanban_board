import "./style.css";

type ModalType = { showModal: boolean; children: JSX.Element; action: (arg: boolean) => void };

const ModalWindow = ({ showModal, children, action }: ModalType) => {
  if (!showModal) return null;

  return (
    <div className="modal-wrapper" onClick={() => action(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default ModalWindow;
