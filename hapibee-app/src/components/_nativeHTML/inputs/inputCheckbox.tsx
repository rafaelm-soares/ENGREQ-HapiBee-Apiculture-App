import { Component } from 'react';
import styles from './input.module.css';

type OwnProps = {
  className?: string;
  label?: string;
  isChecked?: boolean;
  value?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  name: string;
  handleChange: Function;
};

type Props = OwnProps;

class InputCheckbox extends Component<Props> {

  handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let value = e.target.value;
    this.props.handleChange(this.props.name, value);
  };

  render() {
    return (
      <div className={`${styles.inputRadio} ${!!this.props.className ? this.props.className : ''}`}>
        <label className={styles.label}>{this.props.label}</label>
        <div className={styles.checkbox}>
          <input type={"checkbox"}
            checked={this.props.isChecked}
            disabled={this.props.isDisabled}
            required={this.props.isRequired}
            onChange={(e) => this.handleOnChange(e)}
          />
          <span className={styles.value}>{this.props.value}</span>
        </div>
      </div>
    )
  }
}

export default InputCheckbox;