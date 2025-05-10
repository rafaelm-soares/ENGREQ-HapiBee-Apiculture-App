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
};

type Props = OwnProps;

class InputPhone extends Component<Props> {

  handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let value = e.target.value;
    this.props.handleChange(this.props.name, value);
  };

  render() {
    return (
      <div className={`${styles.inputNumber} ${!!this.props.className ? this.props.className : ''}`}>
        <label className={styles.label}>{this.props.label}</label>
        <input type={"tel"}
          // pattern="[0-9]{3}-[0-9]{3}-[0-9]{3}"
          className={`${styles.inputField} ${styles.inputNumber}`}
          value={this.props.defaultValue}
          disabled={this.props.isDisabled}
          required={this.props.isRequired}
          onChange={(e) => this.handleOnChange(e)}
        />
      </div>
    )
  }
}

export default InputPhone;