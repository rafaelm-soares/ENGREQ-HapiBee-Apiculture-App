import { Component } from 'react';
import styles from './input.module.css';
import { ReactComponent as PasswordShowIcon } from 'src/icons/passwordShow.svg';
import { ReactComponent as PasswordHideIcon } from 'src/icons/passwordHide.svg';
import { isValidPassword } from 'src/model/helperFieldValidations';

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
  showPassword: boolean;
};

class InputPassword extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      value: "",
      input: {
        isValid: true,
        warning: "",
      },
      showPassword: false,
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
    if (text.length < 8) {
      this.setState({
        input: {
          isValid: isValid,
          warning: ("Password must be at least 8 characters long."),
        },
      });
    } else if (text.length >= 8 && !isValidPassword(text)) {
      this.setState({
        input: {
          isValid: isValid,
          warning: ("The password must contain both numbers and letters (may have special chars, spaces not allowed)"),
        },
      });
    } else if (isValidPassword(text)) {
      this.setState({
        input: { isValid: true, warning: ("") },
      });
    }
  };

  handleClickShowPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword,
    });
  };

  handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let value = e.target.value;
    this.setState({ value: value });
  };

  render() {
    return (
      <div className={`${styles.inputWithWarning} ${!!this.props.className ? this.props.className : ''}`}>
        <div className={styles.inputPassword}>
          <label className={styles.label}>{this.props.label}</label>
          <label className={styles.password}>
            <input type={this.state.showPassword ? 'text' : 'password'}
              className={styles.inputField}
              value={this.props.defaultValue}
              disabled={this.props.isDisabled}
              required={this.props.isRequired}
              onChange={(e) => this.handleOnChange(e)}
            />
            {!this.state.showPassword
              ? <PasswordShowIcon className={styles.passwordIcon} onClick={this.handleClickShowPassword} />
              : <PasswordHideIcon className={styles.passwordIcon} onClick={this.handleClickShowPassword} />
            }
          </label>
        </div>
        {!this.state.input.isValid && (
          <small className={styles.warning}>{this.state.input.warning}</small>
        )}
      </div>
    )
  }
}

export default InputPassword;