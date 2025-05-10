import { Component } from 'react';
import styles from './input.module.css';

type OwnProps = {
  className?: string;
  label?: string;
  defaultValue?: number;
  isDisabled?: boolean;
  isRequired?: boolean;
  name: string;
  options: Array<any>;
  placeholder?: string;
  handleChange: Function;
};

type Props = OwnProps;

type State = {
  selected: string;
}

class Select extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selected: ""
    }
  }

  handleChange = (event: { target: { value: string; }; }) => {
    let newValue: string = event.target.value;
    this.setState({ selected: newValue });
    this.props.handleChange(this.props.name, newValue);
  };

  render() {
    return (
      <div className={`${styles.inputSelect} ${!!this.props.className ? this.props.className : ''}`}>
        <label className={styles.label}>{this.props.label}</label>
        <select
          className={`${styles.inputField} ${styles.select}`}
          value={this.state.selected}
          placeholder={this.props.placeholder}
          disabled={this.props.isDisabled}
          onChange={this.handleChange}
          required={this.props.isRequired}
        >
          {!!this.props.defaultValue
            ? <option key={this.props.defaultValue} value={this.props.defaultValue} />
            : <option></option>}
          {this.props.options.map((item, index) => (
            <option key={index} value={item.value}>{item.value}</option>
          ))}
        </select>
      </div>
    )
  }
}

export default Select;