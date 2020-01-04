import React from 'react';
import Login from './login';

export default class TextFild extends React.Component {
  render() {
    return (
      <div className="textFild">
        <label>
          {this.props.label}
          <input
            type={this.props.type}
            className={this.props.classes}
            onChange={this.props.onChangeFild}
            onBlur={this.props.onBlur}
            value={this.props.value}
            name={this.props.name}
          />
        </label>
        <span className="fildErr">{this.props.error}</span>
      </div>
    );
  }
}
