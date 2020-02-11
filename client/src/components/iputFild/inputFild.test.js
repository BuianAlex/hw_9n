import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import InputFild from './inputFild';
const domTestingLib = require('@testing-library/dom');
const { queryHelpers } = domTestingLib;

const queryById = queryHelpers.queryByAttribute.bind(null, 'id');

describe('<InputFild /> tests', () => {
  describe('Login input', () => {
    it('test if value is not entered should be no valid', () => {
      const handleChange = jest.fn();
      const options = {
        type: 'text',
        id: 'login',
        label: 'Login:',
        isRequired: true,
        value: '',
        disabled: false
      };
      const { container } = render(
        <InputFild options={options} onValid={handleChange} />
      );

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenLastCalledWith({
        isValid: false,
        validValue: ''
      });
    });

    it('test with value which has min allowable length should be valid', () => {
      const handleChange = jest.fn();
      const options = {
        type: 'text',
        id: 'login',
        label: 'Login:',
        isRequired: true,
        value: '',
        disabled: false
      };
      const { container } = render(
        <InputFild options={options} onValid={handleChange} />
      );
      const input = queryById(container, 'login');
      fireEvent.change(input, { target: { value: 'aqq' } });

      expect(handleChange).toHaveBeenCalledTimes(2);
      expect(handleChange).toHaveBeenLastCalledWith({
        isValid: true,
        validValue: 'aqq'
      });
    });

    it('test with value which has length > 50 should be no valid', () => {
      const tooLongVal = 'qwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopq';
      const handleChange = jest.fn();
      const options = {
        type: 'text',
        id: 'login',
        label: 'Login:',
        isRequired: true,
        value: '',
        disabled: false
      };
      const { container } = render(
        <InputFild options={options} onValid={handleChange} />
      );
      const input = queryById(container, 'login');
      fireEvent.change(input, { target: { value: tooLongVal } });

      expect(handleChange).toHaveBeenCalledTimes(2);
      expect(handleChange).toHaveBeenLastCalledWith({
        isValid: false,
        validValue: tooLongVal
      });
    });

    it('test with value which has speсial char should be no valid', () => {
      const withSpecVal = `<script>alert('test');</script>`;
      const handleChange = jest.fn();
      const options = {
        type: 'text',
        id: 'login',
        label: 'Login:',
        isRequired: true,
        value: '',
        disabled: false
      };
      const { container } = render(
        <InputFild options={options} onValid={handleChange} />
      );
      const input = queryById(container, 'login');
      fireEvent.change(input, { target: { value: withSpecVal } });

      expect(handleChange).toHaveBeenCalledTimes(2);
      expect(handleChange).toHaveBeenLastCalledWith({
        isValid: false,
        validValue: ''
      });
    });
  });
});
