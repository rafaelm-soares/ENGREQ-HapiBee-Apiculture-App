import { Component } from "react";
import { connect } from "react-redux";
import { INITIAL_STATE } from "src/redux/reducer/initial-state";
import { Transfer } from "src/model/myTypes";
import { ReactComponent as PendingIcon } from 'src/icons/statePending.svg';
import { ReactComponent as ApprovedIcon } from 'src/icons/stateApproved.svg';
import { ReactComponent as DeniedIcon } from 'src/icons/stateDenied.svg';
import styles from "./transferCardList.module.css";

type OwnProps = {
  list: Transfer[];
};

type Props = OwnProps &
  ReturnType<typeof mapStateToProps>;

class TransferCardList extends Component<Props> {

  render() {
    return (
      <div className={styles.list}>
        {this.props.list.map((item, index) => {
          if (typeof item.id != "undefined") {
            return (
              <div className={styles.card} key={index} onClick={() => (console.log('clicked', item.id))}>
                <div className={styles.left}>
                  {item.isTransferApproved === "APPROVED" ? (
                    <ApprovedIcon className={styles.iconApproved} />
                  ) : item.isTransferApproved === "PENDING" ? (
                    <PendingIcon className={styles.iconPending} />
                  ) : (
                    <DeniedIcon className={styles.iconDenied} />
                  )}
                </div>
                <div className={styles.right}>
                  <div className={styles.title}>
                    <span>ID operação: {item.id}</span>
                  </div>
                  <div className={styles.info}>
                    <span className={styles.infoTitle}>ID do apiário: </span>
                    <span>{item.apiaryID}</span>
                  </div>
                  <div className={styles.info}>
                    <span className={styles.infoTitle}>Data da transumância: </span>
                    <span>{item.transferDate}</span>
                  </div>
                  <div className={styles.info}>
                    <span className={styles.infoTitle}>Nova localização: </span>
                    <span>{item.location.place}, {item.location.municipality}, {item.location.parish}</span>
                  </div>
                  <div className={styles.info}>
                    <span className={styles.infoTitle}>Resposta Gestor de zona controlada: </span>
                    <span>{item.isControledZoneApproved}</span>
                  </div>
                  <div className={styles.info}>
                    <span className={styles.infoTitle}>Resposta DGAV: </span>
                    <span>{item.isDgavApproved}</span>
                  </div>
                  <div className={styles.info}>
                    <span className={styles.infoTitle}>Estado: </span>
                    <span>{item.isTransferApproved}</span>
                  </div>
                </div>
              </div>
            )
          } else {
            return null;
          }
        })}
      </div>
    )
  }
}

const mapStateToProps = (state: typeof INITIAL_STATE) => {
  return {
    transfers: state.fieldBook.transfers,
  };
};

export default connect(mapStateToProps)(TransferCardList);
