import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.scss';
import ResultPopUpWindow from '../ResultPopUpWindow/ResultPopUpWindow';
import FormMessage from '../FormMessage/FormMessage';

interface IResult {
  saved: Array<object>;
  schemaError: Array<object>;
  duplicate: Array<object>;
  unnounError: Array<object>;
}

interface IModal {
  mainModal: { open: Boolean; result?: any; title: string; error?: string };
  closeModal: () => void;
}

const Modal: React.FC<IModal> = ({ mainModal, closeModal }) => {
  const { open, result, title, error } = mainModal;

  const handleClick = () => {
    const modalTitle = 'Import detail';
    const modalWindow = window.open(
      'about:blank',
      modalTitle,
      'width=600,height=500,menubar=no,resizable=no,scrollbars=no,status=no,location=no'
    );

    if (modalWindow) {
      modalWindow.focus();
      const body = modalWindow.document.body;
      const root: HTMLElement = document.createElement('div');
      body.appendChild(root);
      ReactDOM.render(<ResultPopUpWindow result={result} />, root);
    }
  };

  return (
    <>
      {open && (
        <div className='card-backGround'>
          <div className='mui-panel modal '>
            <div className='modal-body'>
              <h2 className='modal-title'>{title}</h2>
              {result &&
                Object.keys(result).map((item: string, key: number) => {
                  return (
                    <div key={key}>
                      <p>
                        {item}: <span>{result[item].length}</span>
                      </p>
                    </div>
                  );
                })}

              {error ? (
                <FormMessage messageText={error} messageType={2} />
              ) : (
                <button className='link-btn' onClick={handleClick}>
                  Details...
                </button>
              )}
              <div className='buttons'>
                <div className='mui-btn mui-btn--raised' onClick={closeModal}>
                  <span className='button-text'>CLOSE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
