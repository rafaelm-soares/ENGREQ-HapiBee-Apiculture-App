import { Component } from "react";
import { connect } from "react-redux";
import { INITIAL_STATE } from "src/redux/reducer/initial-state";
import { Hive } from "src/model/myTypes";
import styles from "./listHive.module.css";

type OwnProps = {
  list: Hive[];
};

type Props = OwnProps &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;


class HiveList extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  renderTableHead() {
    return (
      <thead className={styles.tableHeader}>
        <tr className={styles.rowHeader}>
          <th className={styles.rowColumn}>{"Nº apiário"}</th>
          <th className={styles.rowColumn}>{"Nº colmeia"}</th>
          <th className={styles.rowColumn}>{"Nome"}</th>
          <th className={styles.rowColumn}>{"Nome apiário"}</th>
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
                  <th className={styles.rowColumn}>{item.id}</th>
                  <th className={styles.rowColumn}>{item.name}</th>
                  <th className={styles.rowColumn}>{item.apiaryName}</th>
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
          <td className={styles.noResults} colSpan={4}>
            {"Não tem colmeias registadas"}
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
    hives: state.apiaries.hives,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    /* getApiaries: () => {
      dispatch(getApiaries());
    }, */
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HiveList);
