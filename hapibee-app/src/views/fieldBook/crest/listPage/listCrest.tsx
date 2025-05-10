import { Component } from "react";
import { connect } from "react-redux";
import { INITIAL_STATE } from "src/redux/reducer/initial-state";
import { Cresta } from "src/model/myTypes";
import styles from "./listCrest.module.css";

type OwnProps = {
  list: Cresta[];
};

type Props = OwnProps &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;


class CrestaList extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  renderTableHead() {
    return (
      <thead className={styles.tableHeader}>
        <tr className={styles.rowHeader}>
          <th className={styles.rowColumn}>{"Nº Cresta"}</th>
          <th className={styles.rowColumn}>{"Nº apiário"}</th>
          <th className={styles.rowColumn}>{"Nº colmeia"}</th>
          <th className={styles.rowColumn}>{"Nº Alças"}</th>
          <th className={styles.rowColumn}>{"Tipo de Produto"}</th>
          <th className={styles.rowColumn}>{"Quantidade"}</th>
          <th className={styles.rowColumn}>{"Tipo de Quantidade"}</th>
          <th className={styles.rowColumn}>{"Data da Cresta"}</th>
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
                  <th className={styles.rowColumn}>{item.hiveID}</th>
                  <th className={styles.rowColumn}>{item.nrOfBoards}</th>
                  <th className={styles.rowColumn}>{item.ProductType}</th>
                  <th className={styles.rowColumn}>{item.quantity}</th>
                  <th className={styles.rowColumn}>{item.quantityType}</th>
                  <th className={styles.rowColumn}>{item.CrestaDate}</th>
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
            {"Não tem Crestas registadas"}
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
    crests: state.fieldBook.crestas
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    /* getApiaries: () => {
      dispatch(getApiaries());
    }, */
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CrestaList);
