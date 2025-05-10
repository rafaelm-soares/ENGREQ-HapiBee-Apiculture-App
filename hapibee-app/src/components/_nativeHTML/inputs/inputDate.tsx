import { Component } from 'react';
import styles from './input.module.css';

type OwnProps = {
  className?: string,
  label?: string;
  defaultValue: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  name: string;
  handleChange: Function;
};

type Props = OwnProps;

class InputDate extends Component<Props> {

  handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let value = e.target.value;
    this.props.handleChange(this.props.name, value);
  };

  render() {
    const defaultValue = this.props.defaultValue/* ?.toISOString().split('T')[0] */;
    
    return (
      <div className={`${styles.inputDate} ${!!this.props.className ? this.props.className : ''}`}>
        <label className={styles.label}>{this.props.label}</label>
        <input type={"date"}
          className={styles.inputField}
          defaultValue={defaultValue}
          disabled={this.props.isDisabled}
          required={this.props.isRequired}
          onChange={(e) => this.handleOnChange(e)}
        />
      </div>
    )
  };
}

export default InputDate;
