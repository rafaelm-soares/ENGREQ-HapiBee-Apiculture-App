import { Component } from "react";
import { connect } from "react-redux";
import { INITIAL_STATE } from "src/redux/reducer/initial-state";
import { TreatmentsType } from "src/model/myTypes";
// import { ReactComponent as ApiaryIcon } from 'src/icons/hapibee_apiary.svg';
import styles from "./inspectionCardList.module.css";

type OwnProps = {
  list: TreatmentsType[];
};

type Props = OwnProps &
  ReturnType<typeof mapStateToProps>;

class TreatmentCardList extends Component<Props> {

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
                    <span className={styles.infoTitle}>ID da colmeia: </span>
                    <span>{item.hiveID}</span>
                  </div>
                  <div className={styles.info}>
                    <span className={styles.infoTitle}>Data: </span>
                    <span>{item.date}</span>
                  </div>
                  <div className={styles.info}>
                    <span className={styles.infoTitle}>Doença: </span>
                    <span>{item.disease}</span>
                  </div>
                  <div className={styles.info}>
                    <span className={styles.infoTitle}>Medicação: </span>
                    <span>{item.medication}</span>
                  </div>
                  <div className={styles.info}>
                    <span className={styles.infoTitle}>Doasgem: </span>
                    <span>{item.dose}</span>
                  </div>
                  <div className={styles.info}>
                    <span className={styles.infoTitle}>Subatância ativa: </span>
                    <span>{item.activeSubstance}</span>
                  </div>
                  <div className={styles.info}>
                    <span className={styles.infoTitle}>Duração: </span>
                    <span>{item.duration}</span>
                  </div>
                  <div className={styles.info}>
                    <span className={styles.infoTitle}>Tipo: </span>
                    <span>{item.type}</span>
                  </div>
                  <div className={styles.info}>
                    <span className={styles.infoTitle}>Data de fim: </span>
                    <span>{item.endDate}</span>
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

export default connect(mapStateToProps)(TreatmentCardList);
