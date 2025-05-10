import { Component } from "react";
import { connect } from "react-redux";
import { INITIAL_STATE } from "src/redux/reducer/initial-state";
import { HiveSplit } from "src/model/myTypes";
import { deleteHiveSplit } from "src/redux/actions/action-hivesplit";
import styles from "./sliptCardList.module.css";
import Button from "src/components/_nativeHTML/button/button";

type OwnProps = {
  list: HiveSplit[];
};

type Props = OwnProps &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

class SplitCardList extends Component<Props> {

  handleDelete = (number: number) => {
    this.props.deleteHiveSplit(number);
  }

  render() {
    return (
      <div className={styles.list}>
        {this.props.list.map((item, index) => {
          if (typeof item.id != "undefined") {
            return (
              <div className={styles.card} key={index} onClick={() => (console.log('clicked', item.id))}>
                <div className={styles.right}>
                  <div className={styles.title}>
                    <span>ID: {item.id}</span>
                  </div>
                  <div className={styles.info}>
                    <span className={styles.infoTitle}>ID colmeia de origem: </span>
                    <span>{item.hiveOrigID}</span>
                  </div>
                  <div className={styles.info}>
                    <span className={styles.infoTitle}>ID(s) colmeia(s) de destino: </span>
                    <span>{item.listOfHiveDestID.join(', ')}</span>
                  </div>
                  <div className={styles.info}>
                    <span className={styles.infoTitle}>Data: </span>
                    <span>{item.hiveSplitDate}</span>
                  </div>
                  <div className={styles.info}>
                    <span className={styles.infoTitle}>Tipo de produção: </span>
                    <span>{item.productionType}</span>
                  </div>
                  <div className={styles.info}>
                    <span className={styles.infoTitle}>Quantidade: </span>
                    <span>{item.quantitiy} {item.quantityType}</span>
                  </div>
                  <div className={styles.info}>
                    <span className={styles.infoTitle}>Gestão de reprodução: </span>
                    <span>{item.reproductionManagement}</span>
                  </div>
                  <div className={styles.info}>
                    <span className={styles.infoTitle}>Origem da raínha: </span>
                    <span>{item.reproductionQueen}</span>
                  </div>
                  <div className={styles.actions}>
                    <Button
                      className={styles.newBtn}
                      placeholder={"Excluir"}
                      onClick={() => this.handleDelete(item.id!)}
                      isPrimary={true}
                    />
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

const mapDispatchToProps = (dispatch: any) => {
  return {
    deleteHiveSplit: (number: number) => {
      dispatch(deleteHiveSplit(number));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SplitCardList);
