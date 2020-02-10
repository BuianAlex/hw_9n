import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import InputFild from './inputFild';

describe('<InputFild /> tests', () => {
  it('should render as default button', () => {
    const options = {
      type: 'text',
      id: 'login',
      label: 'Login:',
      isRequired: true,
      value: '',
      disabled: false
    };

    const { container } = render(
      <InputFild options={options} onValid={() => {}} />
    );
    const inp = expect(container.firstChild).toMatchSnapshot();
    // console.log(container.firstChild);
  });

  // it('button should has class', () => {
  //   const color = 'red'

  //   const { container } = render(<Button color={`${color}`} callback={() => {}} />)
  //   expect(container.firstChild).toHaveClass(`button-${color}`)
  // })

  // it('button should has children', () => {
  //   const color = 'red'
  //   const children = 'test'

  //   const { getByText } = render(<Button color={`${color}`} callback={() => {}}>{children}</Button>)
  //   getByText(children)
  // })

  // it('button should call callback on click', () => {
  //   const color = 'red'
  //   const children = 'test'
  //   const content = 'button'
  //   const onClick = jest.fn()

  //   const { getByTestId } = render(<Button color={`${color}`} onClick={onClick}>{children}</Button>)
  //   fireEvent.click(getByTestId(content))
  //   expect(onClick).toHaveBeenCalledTimes(1)
  // })
});
