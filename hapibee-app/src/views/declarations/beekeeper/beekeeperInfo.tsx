import { Component } from "react";
import { Beekeeper } from "src/model/myTypes";
import styles from "./beekeeper.module.css";

type OwnProps = {
  beekeeper: Beekeeper;
};

type Props = OwnProps;


class BeekeeperInfo extends Component<Props> {

  render() {
    return (
      <div className={styles.inspectionContainer}>
        <div className={styles.infoLine}>
          <span className={styles.label}>ID oficial: </span>
          <span className={styles.value}>{this.props.beekeeper.beekeeperOfficialID}</span>
        </div>
        <div className={styles.infoLine}>
          <span className={styles.label}>Morada: </span>
          <span className={styles.value}>{this.props.beekeeper.beekeeperAddress}</span>
        </div>
        <div className={styles.infoLine}>
          <span className={styles.label}>NIF:</span>
          <span className={styles.value}>{this.props.beekeeper.beekeeperNif}</span>
        </div>
        <div className={styles.infoLine}>
          <span className={styles.label}>Contacto:</span>
          <span className={styles.value}>{this.props.beekeeper.beekeeperPhoneNumber}</span>
        </div>
      </div>
    )
  }
}

export default (BeekeeperInfo);
