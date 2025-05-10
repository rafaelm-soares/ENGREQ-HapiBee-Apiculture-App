import { Component } from "react";
import { connect } from "react-redux";
import { INITIAL_STATE } from "src/redux/reducer/initial-state";
import { Document } from "src/model/myTypes";
// import { ReactComponent as ViewIcon } from 'src/icons/passwordShow.svg';
import ViewDeclaration from "../viewPage/viewDeclaration";
import Modal from "src/components/modal/modal";
import styles from "./declarationsCardList.module.css";

type OwnProps = {
  list: Document[];
};

type Props = OwnProps &
  ReturnType<typeof mapStateToProps>;

type State = {
  showDetails: Array<number>;
}

class DeclarationsCardList extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showDetails: []
    }
  }

  handleViewDocument(item: Document) {
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

  render() {
    return (
      <div className={styles.list}>
        {this.props.list.map((item, index) => {
          if (typeof item.documentNumber != "undefined") {
            return (
              <div className={styles.card} key={index} onClick={() => this.handleViewDocument(item)}>
                {/* <div className={styles.left}>
                  <ViewIcon className={styles.icon} />
                </div> */}
                <div className={styles.right}>
                  <div className={styles.title}>
                    <span>{item.year} v{item.version}</span>
                  </div>
                  <div className={styles.info}>
                    <span className={styles.infoTitle}>Número do documento: </span>
                    <span>{item.documentNumber}</span>
                  </div>
                  <div className={styles.info}>
                    <span className={styles.infoTitle}>Versão: </span>
                    <span>{item.version}</span>
                  </div>
                  <div className={styles.info}>
                    <span className={styles.infoTitle}>Ano: </span>
                    <span>{item.year}</span>
                  </div>
                  <div className={styles.info}>
                    <span className={styles.infoTitle}>Tipo de declaração: </span>
                    <span>{item.declarationType}</span>
                  </div>
                  <div className={styles.info}>
                    <span className={styles.infoTitle}>Data de submissão: </span>
                    <span>{item.submissionDate}</span>
                  </div>
                  <div className={styles.info}>
                    <span className={styles.infoTitle}>ID do apicultor: </span>
                    <span>{item.officialBeekeeperId}</span>
                  </div>
                  <div className={styles.info}>
                    <span className={styles.infoTitle}>Unidade orgânica: </span>
                    <span>{item.unidadeOrganica}</span>
                  </div>
                </div>
                {this.state.showDetails.includes(item.documentNumber) && (
                  <Modal
                    className={styles.modal}
                    toggleModal={() => this.handleViewDocument(item)}
                  >
                    <ViewDeclaration declaration={item} />
                  </Modal>
                )}
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
    listApiarysWithInfo: state.declarations.listApiarysWithInfo,
  };
};

export default connect(mapStateToProps)(DeclarationsCardList);
