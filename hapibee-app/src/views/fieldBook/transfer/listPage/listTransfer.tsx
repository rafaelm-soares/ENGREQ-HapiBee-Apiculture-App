import { Component } from "react";
import { connect } from "react-redux";
import { INITIAL_STATE } from "src/redux/reducer/initial-state";
import { Transfer } from "src/model/myTypes";
import styles from "./listTransfer.module.css";

type OwnProps = {
  list: Transfer[];
};

type Props = OwnProps &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;


class TransferList extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  renderTableHead() {
    return (
      <thead className={styles.tableHeader}>
        <tr className={styles.rowHeader}>
          <th className={styles.rowColumn}>{"Nº Transumância"}</th>
          <th className={styles.rowColumn}>{"Nº apiário"}</th>
          <th className={styles.rowColumn}>{"Data Transumância"}</th>
          <th className={styles.rowColumn}>{"Municipio"}</th>
          <th className={styles.rowColumn}>{"Freguesia"}</th>
          <th className={styles.rowColumn}>{"Lugar"}</th>
          <th className={styles.rowColumn}>{"Aprovação DGAV"}</th>
          <th className={styles.rowColumn}>{"Aprovação Zonas Controladas"}</th>
          <th className={styles.rowColumn}>{"Aprovação Transumância"}</th>
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
                  <th className={styles.rowColumn}>{item.apiaryID}</th>
                  <th className={styles.rowColumn}>{item.transferDate}</th>
                  <th className={styles.rowColumn}>{item.location.municipality}</th>
                  <th className={styles.rowColumn}>{item.location.parish}</th>
                  <th className={styles.rowColumn}>{item.location.place}</th>
                  <th className={styles.rowColumn}>{item.isControledZoneApproved}</th>
                  <th className={styles.rowColumn}>{item.isDgavApproved}</th>
                  <th className={styles.rowColumn}>{item.isTransferApproved}</th>
                </tr>
              </tbody>
            )
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
            {"Não tem transumâncias registadas"}
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
    transfers: state.fieldBook.transfers
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    /* getApiaries: () => {
      dispatch(getApiaries());
    }, */
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TransferList);
