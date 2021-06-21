import React from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import { FaExchangeAlt } from "react-icons/fa";

class Tramitar extends React.Component {

  constructor(props) {
    super(props);
    this.item = props.item;
    this.onTramitar = props.onTramitar;
    this.values = props.values;
  }

  static getDerivedStateFromProps (props, state) {
    if (props.item !== state.item) {
      return { item: props.item } ;
    }
    
    if ((props.item && state.item) && props.item.status !== state.item.status) {
      return { item: props.item } ;
    }
    
    return null;
  }

  state = {
    item: this.item || {}
  };

  tramitar = (newValue) => {
    if (this.onTramitar) {
      this.onTramitar(this.state.item, newValue);
    }
  }

  render() {
    return (
      <Dropdown>
        <Dropdown.Toggle as={Button} size="sm" className="primary-text" variant="link">
          <FaExchangeAlt />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {this.values.map((item, index) => (
            <div key={index}>
              {(item.value !== this.state.item.status) &&
                <Dropdown.Item key={index} onClick={() => this.tramitar(item)}>
                  {item.description}
                </Dropdown.Item>
              }
            </div>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

export default Tramitar;