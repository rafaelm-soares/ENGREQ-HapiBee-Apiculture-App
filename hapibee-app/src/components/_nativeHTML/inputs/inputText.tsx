import { Component } from 'react';
import styles from './input.module.css';

type OwnProps = {
  className?: string;
  label?: string;
  defaultValue?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  name: string;
  handleChange: Function;
  allowNumbers?: boolean;
};

type Props = OwnProps;

class InputText extends Component<Props> {

  handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let value = e.target.value;
    this.props.handleChange(this.props.name, value);
  };

  render() {
    return (
      <div className={`${styles.inputText} ${!!this.props.className ? this.props.className : ''}`}>
        <label className={styles.label}>{this.props.label}</label>
        <input type={"text"}
          className={styles.inputField}
          value={this.props.defaultValue}
          disabled={this.props.isDisabled}
          required={this.props.isRequired}
          onChange={(e) => this.handleOnChange(e)}
        />
      </div>
    )
  }
}

export default InputText;