import { Component } from 'react';
import { isValidEmail } from 'src/model/helperFieldValidations';
import styles from './input.module.css';

type OwnProps = {
  className?: string;
  label?: string;
  defaultValue?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  name: string;
  handleChange: Function;
};

type Props = OwnProps;

type State = {
  value: string;
  input: {
    isValid: boolean;
    warning: string;
  };
};

class InputEmail extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      value: "",
      input: {
        isValid: true,
        warning: "",
      },
    };
  };

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (prevState.value !== this.state.value) {
      this.validateInput(this.state.value);
      this.props.handleChange(this.props.name || "", this.state.value);
    }
  };

  validateInput = (text: string) => {
    let isValid = false;
    if (text.length >= 8 && !isValidEmail(text)) {
      this.setState({
        input: {
          isValid: isValid,
          warning: ("Invalid email"),
        },
      });
    } else if (isValidEmail(text)) {
      this.setState({
        input: { isValid: true, warning: ("") },
      });
    }
  };

  handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let value = e.target.value;
    this.setState({ value: value });
  };

  render() {
    return (
      <div className={`${styles.inputWithWarning} ${!!this.props.className ? this.props.className : ''}`}>
        <div className={styles.inputEmail}>
          <label className={styles.label}>{this.props.label}</label>
          <input type={"email"}
            className={styles.inputField}
            pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            value={this.props.defaultValue}
            disabled={this.props.isDisabled}
            required={this.props.isRequired}
            onChange={(e) => this.handleOnChange(e)}
          />
        </div>
        {!this.state.input.isValid && (
          <small className={styles.warning}>{this.state.input.warning}</small>
        )}
      </div>
    )
  }
}

export default InputEmail;