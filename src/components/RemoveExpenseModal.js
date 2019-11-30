import React from 'react';
import Modal from 'react-modal';

const RemoveExpenseModal = (props) =>
    <Modal
        className='modal-message'
        isOpen={ !!props.openRemoveExpenseModal }
        contentLabel="Example Modal"
        onRequestClose={ props.handelCloseModal }
        ariaHideApp={ false }
        closeTimeoutMS={ 200 }
    >
        <h3 className='modal-message__title'>Your sure you want to remove this expense?</h3>
        { props.openRemoveExpenseModal && <p className='modal-message__text'>{ props.openRemoveExpenseModal }</p> }
        <div className="button-wrapper">
        <button
        className='button' onClick={ props.handelRemoveExpense }>
        Yes
        </button>
        <button
        className='button' onClick={ props.handelCloseModal }>
        No
        </button>
        </div>
    </Modal>

export default RemoveExpenseModal;