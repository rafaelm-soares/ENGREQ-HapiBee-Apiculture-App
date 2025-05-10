import { Component } from "react";
import styles from "./modal.module.css";

type Props = {
  className?: string;
  toggleModal: () => void;
  children?: React.ReactNode; // Add this line
};

class Modal extends Component<Props> {
  render() {
    return (
      <div className={styles.modal}>
        <div className={styles.modalOverlay} onClick={this.props.toggleModal} />
        <div className={`${styles.modalContent} ${this.props.className}`}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Modal;
