import { Component } from "react";
import { connect } from "react-redux";
import { INITIAL_STATE } from "src/redux/reducer/initial-state";
import { MaintenanceType } from "src/model/myTypes";
// import { ReactComponent as ApiaryIcon } from 'src/icons/hapibee_apiary.svg';
import styles from "./inspectionCardList.module.css";

type OwnProps = {
  list: MaintenanceType[];
};

type Props = OwnProps &
  ReturnType<typeof mapStateToProps>;

class MaintenanceCardList extends Component<Props> {

  render() {
    return (
      <div className={styles.list}>
        {this.props.list.map((item, index) => {
          if (typeof item.id != "undefined") {
            return (
              <div className={styles.card} key={index} onClick={() => (console.log('clicked', item.id))}>
                {/* <div className={styles.left}>
                  <ApiaryIcon className={styles.icon} />
                </div> */}
                <div className={styles.right}>
                  <div className={styles.title}>
                    <span>ID da operação: {item.id}</span>
                  </div>
                  <div className={styles.info}>
                    <span className={styles.infoTitle}>ID apiário: </span>
                    <span>{item.apiaryID}</span>
                  </div>
                  <div className={styles.info}>
                    <span className={styles.infoTitle}>Data: </span>
                    <span>{item.date}</span>
                  </div>
                  <div className={styles.info}>
                    <span className={styles.infoTitle}>Tipo de manutenção: </span>
                    <span>{item.inspectionType}</span>
                  </div>
                  <div className={styles.info}>
                    <span className={styles.infoTitle}>Modo de desinfeção: </span>
                    <span>{item.disinfectionMode}</span>
                  </div>
                  <div className={styles.info}>
                    <span className={styles.infoTitle}>Motivo: </span>
                    <span>{item.motive}</span>
                  </div>
                  <div className={styles.info}>
                    <span className={styles.infoTitle}>Humidade: </span>
                    <span>{item.humidity}</span>
                  </div>
                  <div className={styles.info}>
                    <span className={styles.infoTitle}>Temperatura: </span>
                    <span>{item.temperature}</span>
                  </div>
                  <div className={styles.info}>
                    <span className={styles.infoTitle}>Produtos utilizados: </span>
                    <span>{item.productsUsed}</span>
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
    hiveSplits: state.hivesplits,
  };
};

export default connect(mapStateToProps)(MaintenanceCardList);
