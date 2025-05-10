import { Component } from "react";
import { connect } from "react-redux";
import { Document } from "src/model/myTypes";
import { ReactComponent as ViewIcon } from 'src/icons/passwordShow.svg';
import { INITIAL_STATE } from "src/redux/reducer/initial-state";
import styles from "./listDeclaration.module.css";
import ViewDeclaration from "../viewPage/viewDeclaration";

type OwnProps = {
  list: Document[];
};

type Props = OwnProps &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

type State = {
  showDetails: Array<number>;
}

class DocumentsList extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showDetails: []
    }
  }

  handleViewDocument(item: Document) {
    //this.props.getDocumensTotalApiaryInfo(item.documentNumber);
    //console.log(this.props.listApiarysWithInfo);
    let id = item.documentNumber;
    if (this.state.showDetails.includes(id)) {
      let newShowDescription = this.state.showDetails.filter(
        (showDescriptionItem) => showDescriptionItem !== id,
      );
      this.setState({ showDetails: newShowDescription });
    } else {
      let newShowDescription = [...this.state.showDetails, id];
      this.setState({ showDetails: newShowDescription });
    }
  }

  renderTableHead() {
    return (
      <thead className={styles.tableHeader}>
        <tr className={styles.rowHeader}>
          <th className={styles.rowColumn}>{"Nº doc"}</th>
          <th className={styles.rowColumn}>{"Versão"}</th>
          <th className={styles.rowColumn}>{"Ano"}</th>
          <th className={styles.rowColumn}>{"Tipo de declaração"}</th>
          <th className={styles.rowColumn}>{"Data submissão"}</th>
          <th className={styles.rowColumn}>{"ID Apicultor"}</th>
          <th className={styles.rowColumn}>{"Unidade orgãnica"}</th>
          <th className={styles.rowColumn}>{"Visualizar documento"}</th>
        </tr>
      </thead>
    );
  }

  renderTableBody() {
    return (
      <>
        {this.props.list.map((item, index) => {
          if (typeof item.documentNumber != "undefined") {
            return (
              <tbody className={styles.bodyWrapperClicable} key={index}
                onClick={() => this.handleViewDocument(item)}
              >
                <tr className={styles.rowbody}>
                  <th className={styles.rowColumn}>{item.documentNumber}</th>
                  <th className={styles.rowColumn}>{item.version}</th>
                  <th className={styles.rowColumn}>{item.year}</th>
                  <th className={styles.rowColumn}>{item.declarationType}</th>
                  <th className={styles.rowColumn}>{item.submissionDate}</th>
                  <th className={styles.rowColumn}>{item.officialBeekeeperId}</th>
                  <th className={styles.rowColumn}>{item.unidadeOrganica}</th>
                  <th className={styles.rowColumn}>
                    <ViewIcon className={styles.icon} />
                  </th>
                </tr>
                {this.state.showDetails.includes(item.documentNumber) && (
                  <tr className={styles.rowColumn}>
                    <td className={styles.noResults} colSpan={8}>
                      <ViewDeclaration declaration={item} />
                    </td>
                  </tr>
                )}
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
          <td className={styles.noResults} colSpan={8}>
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

const mapStateToProps = (state: typeof INITIAL_STATE) => {
  return {
    listApiarysWithInfo: state.declarations.listApiarysWithInfo,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    /* getDocumensTotalApiaryInfo: (documentID: number) => {
      dispatch(getDocumensTotalApiaryInfo(documentID));
    }, */
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentsList);
