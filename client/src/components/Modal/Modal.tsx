import React from 'react'
import './Modal.scss'
import FormMessage from '../formMessage/formMessage'
interface IResult {
  saved: Array<object>
  schemaError: Array<object>
  duplicate: Array<object>
  unnounError: Array<object>
}

interface IModal {
  mainModal: { open: Boolean; result?: any; title: string; error?: string }
  closeModal: () => void
}

const Modal: React.FC<IModal> = ({ mainModal, closeModal }) => {
  const { open, result, title, error } = mainModal

  return (
    <>
      {open && (
        <div className='mui-panel modal '>
          <div className='modal-body'>
            <h2 className='modal-title'>{title}</h2>
            {result &&
              Object.keys(result).map((item: string, key: number) => {
                return (
                  <div key={key}>
                    <p>
                      {item}:<span>{result[item].length}</span>
                    </p>
                  </div>
                )
              })}

            {error && <FormMessage type={2} messange={error} />}
            <div className='buttons'>
              <div className='mui-btn mui-btn--raised' onClick={closeModal}>
                <span className='button-text'>CLOSE</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Modal
