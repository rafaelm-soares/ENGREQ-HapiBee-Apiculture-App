import { Component } from "react";
import { connect } from "react-redux";
import { INITIAL_STATE } from "src/redux/reducer/initial-state";
import { HiveSplit } from "src/model/myTypes";
import styles from "./listHiveSplit.module.css";

type OwnProps = {
  list: HiveSplit[];
};

type Props = OwnProps &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

class HiveSplitList extends Component<Props> {

  renderTableHead() {
    return (
      <thead className={styles.tableHeader}>
        <tr className={styles.rowHeader}>
          <th className={styles.rowColumn}>{"Nº"}</th>
          <th className={styles.rowColumn}>{"Apiário"}</th>
          <th className={styles.rowColumn}>{"Colmeia Original"}</th>
          <th className={styles.rowColumn}>{"Colmeia(s) Destino"}</th>
          <th className={styles.rowColumn}>{"Data"}</th>
          <th className={styles.rowColumn}>{"Tipo Produção"}</th>
          <th className={styles.rowColumn}>{"Qtd."}</th>
          <th className={styles.rowColumn}>{"Tipo"}</th>
          <th className={styles.rowColumn}>{"Gestão Reprodução"}</th>
          <th className={styles.rowColumn}>{"Rainha Reprodução"}</th>
        </tr>
      </thead>
    );
  }

  renderTableBody() {
    return (
      <>
        {this.props.list.map((item, index) => {
          if (typeof item.id != "undefined") {
            return (
              <tbody className={styles.bodyWrapper} key={index}>
                <tr className={styles.rowbody}>
                  <th className={styles.rowColumn}>{item.id}</th>
                  <th className={styles.rowColumn}>{item.apiary}</th>
                  <th className={styles.rowColumn}>{item.hiveOrigID}</th>
                  <th className={styles.rowColumn}>{item.listOfHiveDestID.join(', ')}</th>
                  <th className={styles.rowColumn}>{item.hiveSplitDate}</th>
                  <th className={styles.rowColumn}>{item.productionType}</th>
                  <th className={styles.rowColumn}>{item.quantitiy}</th>
                  <th className={styles.rowColumn}>{item.quantityType}</th>
                  <th className={styles.rowColumn}>{item.reproductionManagement}</th>
                  <th className={styles.rowColumn}>{item.reproductionQueen}</th>
                </tr>
              </tbody>
            )
          } else {
            return null;
          }
        })}
      </>
    );
  }

  renderTableBodyNoResults() {
    return (
      <tbody className={styles.bodyWrapper}>
        <tr className={styles.rowbody}>
          <td className={styles.noResults} colSpan={10}>
            {"Não tem desdobramentos registados"}
          </td>
        </tr>
      </tbody>
    );
  }

  render() {
    return (
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          {this.renderTableHead()}
          {this.props.list && this.props.list.length > 0
            ? this.renderTableBody()
            : this.renderTableBodyNoResults()}
        </table>
      </div>
    )
  }
}

const mapStateToProps = (state: typeof INITIAL_STATE) => {
  return {
    hivesplits: state.hivesplits.hivesplits,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    /* getApiaries: () => {
      dispatch(getApiaries());
    }, */
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HiveSplitList);
