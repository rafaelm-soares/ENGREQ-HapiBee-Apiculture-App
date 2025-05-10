import { Component } from 'react';
import styles from './input.module.css';

interface Items {
  id: number;
  value: string;
};

type OwnProps = {
  className?: string;
  label?: string;
  defaultValue?: number;
  isDisabled?: boolean;
  isRequired?: boolean;
  name: string;
  value: Array<Items>;
  handleChange: Function;
};

type Props = OwnProps;

class SelectAutocomplete extends Component<Props> {

  handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let value = e.target.value;
    this.props.handleChange(this.props.name, value);
  };

  render() {
    return (
      <div className={`${styles.inputDatalist} ${!!this.props.className ? this.props.className : ''}`}>
        <label className={styles.label}>{this.props.label}</label>
        <input
          className={styles.inputField}
          list={this.props.label}
          name={this.props.name}
          disabled={this.props.isDisabled}
          required={this.props.isRequired}
          onChange={(e) => this.handleOnChange(e)}
        />
        <datalist id={this.props.label}>
          {!!this.props.defaultValue ? <option key={this.props.defaultValue} value={this.props.defaultValue}>
            {this.props.defaultValue}
          </option> : null}
          {this.props.value.map((item, index) => (
            <option key={index} value={item.value} />
          ))}
        </datalist>
      </div>
    )
  }
}

export default SelectAutocomplete;