import { Component } from "react";
import { connect } from "react-redux";
import { MaintenanceType } from "src/model/myTypes";
import styles from "./listInspection.module.css";

type OwnProps = {
  list: MaintenanceType[];
};

type Props = OwnProps &
  ReturnType<typeof mapDispatchToProps>;


class MaintenanceList extends Component<Props> {

  renderTableHead() {
    return (
      <thead className={styles.tableHeader}>
        <tr className={styles.rowHeader}>
          <th className={styles.rowColumn}>{"Nº apiário"}</th>
          <th className={styles.rowColumn}>{"Colmeias nº"}</th>
          <th className={styles.rowColumn}>{"Data"}</th>
          <th className={styles.rowColumn}>{"Tipo de inspeção"}</th>
          <th className={styles.rowColumn}>{"Modo de desinfeção"}</th>
          <th className={styles.rowColumn}>{"Motivo"}</th>
          <th className={styles.rowColumn}>{"Humidade"}</th>
          <th className={styles.rowColumn}>{"Temperatura"}</th>
          <th className={styles.rowColumn}>{"Produtos usados"}</th>
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
                  <th className={styles.rowColumn}>{item.apiaryID}</th>
                  <th className={styles.rowColumn}>{item.hiveID}</th>
                  <th className={styles.rowColumn}>{item.date}</th>
                  <th className={styles.rowColumn}>{item.inspectionType}</th>
                  <th className={styles.rowColumn}>{item.disinfectionMode}</th>
                  <th className={styles.rowColumn}>{item.motive}</th>
                  <th className={styles.rowColumn}>{item.humidity}</th>
                  <th className={styles.rowColumn}>{item.temperature}</th>
                  <th className={styles.rowColumn}>{item.productsUsed}</th>
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
          <td className={styles.noResults} colSpan={9}>
            {"Não tem manutenções registadas"}
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

const mapDispatchToProps = (dispatch: any) => {
  return {
    /* getApiaries: () => {
      dispatch(getApiaries());
    }, */
  };
};

export default connect(mapDispatchToProps)(MaintenanceList);
