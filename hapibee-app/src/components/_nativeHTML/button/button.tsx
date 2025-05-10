import { Component } from "react";
import styles from './button.module.css';
import { Link } from "react-router-dom";
import classNames from "classnames";

type OwnProps = {
  className?: string;
  path?: string;
  name?: string;
  placeholder: string;
  isDisabled?: boolean;
  isSubmit?: boolean;
  onClick?: Function;
  isPrimary?: boolean;
  isSecondary?: boolean;
  isActive?: boolean;
};

type Props = OwnProps;

class Button extends Component<Props> {
  
  handleClick = () => {
    !!this.props.onClick && this.props.onClick(this.props.name);
  }

  render() {
    const buttonClassNames = classNames(
      styles.btn,
      this.props.className,
      this.props.isPrimary && styles.primaryBtn,
      this.props.isSecondary && styles.secondaryBtn,
      this.props.isDisabled && styles.disabled,
      this.props.isActive && styles.active
    );
  
    return (
      !!this.props.path ? (
        <Link to={this.props.path} className={styles.btnLink}>
          <button
            type="button"
            className={buttonClassNames}
            disabled={this.props.isDisabled}
          >
            {this.props.placeholder}
          </button>
        </Link>
      ) : (
        <button
          type={this.props.isSubmit ? "submit" : "button"}
          className={buttonClassNames}
          disabled={this.props.isDisabled}
          onClick={this.handleClick}
        >
          {this.props.placeholder}
        </button>
      )
    )
  }
}

export default Button;