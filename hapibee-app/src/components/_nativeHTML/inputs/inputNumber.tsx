import { Component } from 'react';
import styles from './input.module.css';

type OwnProps = {
  className?: string;
  label?: string;
  defaultValue?: number;
  isDisabled?: boolean;
  isRequired?: boolean;
  name: string;
  handleChange: Function;
  onlyPositive?: boolean;
};

type Props = OwnProps;

class InputNumber extends Component<Props> {

  handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let value = e.target.value;
    this.props.handleChange(this.props.name, value);
  };

  render() {
    const negativeAllowed = ["e", "E", "+"];
    const positiveOnly = ["e", "E", "+", "-"];
    const exceptThisSymbols = this.props.onlyPositive ? positiveOnly : negativeAllowed;

    return (
      <div className={`${styles.inputNumber} ${!!this.props.className ? this.props.className : ''}`}>
        <label className={styles.label}>{this.props.label}</label>
        <input type={"number"}
          className={`${styles.inputField} ${styles.inputNumber}`}
          value={this.props.defaultValue}
          disabled={this.props.isDisabled}
          required={this.props.isRequired}
          onChange={(e) => this.handleOnChange(e)}
          onKeyDown={e => exceptThisSymbols.includes(e.key) && e.preventDefault()}
          min={this.props.onlyPositive ? "0" : undefined}
        />
      </div>
    )
  }
}

export default InputNumber;