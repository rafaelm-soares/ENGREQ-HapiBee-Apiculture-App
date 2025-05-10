import { Component } from "react";
import { connect } from "react-redux";
import { TreatmentsType } from "src/model/myTypes";
import styles from "./listInspection.module.css";

type OwnProps = {
  list: TreatmentsType[];
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
          <th className={styles.rowColumn}>{"Doença"}</th>
          <th className={styles.rowColumn}>{"Medicação"}</th>
          <th className={styles.rowColumn}>{"Dose"}</th>
          <th className={styles.rowColumn}>{"Subatância ativa"}</th>
          <th className={styles.rowColumn}>{"Duração"}</th>
          <th className={styles.rowColumn}>{"Tipo"}</th>
          <th className={styles.rowColumn}>{"Data fim"}</th>
        </tr>
      </thead>
    );
  }

  renderTableBody() {
    return (
      <>
        {this.props.list.map((item, index) => {
          if (typeof item.apiaryID != "undefined") {
            return (
              <tbody className={styles.bodyWrapper} key={index}>
                <tr className={styles.rowbody}>
                  <th className={styles.rowColumn}>{item.apiaryID}</th>
                  <th className={styles.rowColumn}>{item.hiveID}</th>
                  <th className={styles.rowColumn}>{item.date}</th>
                  <th className={styles.rowColumn}>{item.disease}</th>
                  <th className={styles.rowColumn}>{item.medication}</th>
                  <th className={styles.rowColumn}>{item.dose}</th>
                  <th className={styles.rowColumn}>{item.activeSubstance}</th>
                  <th className={styles.rowColumn}>{item.duration}</th>
                  <th className={styles.rowColumn}>{item.type}</th>
                  <th className={styles.rowColumn}>{item.endDate}</th>
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
            {"Não tem doenças/tratamentos registados"}
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
