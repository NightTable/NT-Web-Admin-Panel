import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor:'red'

  },
  
};

// // Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
// Modal.setAppElement('#yourAppElement');

export const DyanimcModal = ({
  openModal,
  afterOpenModal,
  closeModal,
  renderUi,
  modalIsOpen,

}) => {
  //   let subtitle;
//   const [modalIsOpen, setIsOpen] = React.useState (false);

  //   function openModal() {
  //     setIsOpen(true);
  //   }

  //   function afterOpenModal() {
  //     // references are now sync'd and can be accessed.
  //     subtitle.style.color = '#f00';
  //   }

  //   function closeModal() {
  //     setIsOpen(false);
  //   }

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
    //  onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
      >
        {renderUi ()}
      </Modal>
    </div>
  );
};
