import React from 'react';
import { Form } from 'react-bootstrap';

class Select extends React.Component {

  constructor(props) {
    super(props);
    this.placeholder = props.placeholder;
    this.required = props.required || false;
    this.value = props.value;
    this.onChange = props.onChange;
    this.values = props.values;
    this.name = props.name;

    if (this.required && !this.value && this.values) {
      const first = this.values[0];
      this.change(first.value);
    }
  }

  static getDerivedStateFromProps (props, state) {
    if (props.value !== state.value) {
      state.change(props.value);
    }

    return null;
  }

  clear = () => {
    this.change('');
  };

  change = (newValue) => {
    this.setState({ value: newValue });
    if (this.onChange) {
      this.onChange({
        target: { value: newValue, name: this.name }
      });
    }
  }

  state = {
    value: this.value,
    change: this.change
  };

  render() {
    return (
      <div style={{ position: 'relative' }}>
        <Form.Control as="select" placeholder={this.placeholder} name={this.name}
          onChange={this.change} required={this.required} value={this.state.value}>
          {!this.required &&
            <option value=""></option>
          }
          {this.values.map((item, index) => (
            <option key={index} value={item.value}>{item.description}</option>
          ))}
        </Form.Control>

        {(!this.required && this.state.value) &&
          <button type="button" className="close" onClick={this.clear}
            style={{ position: 'absolute', top: '0.25rem', right: '1.5rem' }}>
            <span aria-hidden="true">×</span>
            <span className="sr-only">Close</span>
          </button>
        }
      </div>
    );
  }
}

export default Select;