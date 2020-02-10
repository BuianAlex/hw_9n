import React from 'react'
import './FormMessage.scss'

interface Props {
  messageText: string | undefined
  messageType: number | undefined
}

const FormMessage: React.FC<Props> = props => {
  const { messageType, messageText } = props
  let messangeClass: String = ''
  switch (messageType) {
    case 0:
      messangeClass = 'successful'
      break
    case 1:
      messangeClass = 'warning'
      break
    case 2:
      messangeClass = 'error'
      break

    default:
      break
  }
  return (
    <div className={`form-message ${messangeClass}`}>
      <span className={`form-message-text`}>{messageText} </span>
    </div>
  )
}

export default FormMessage
