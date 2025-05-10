import { Component } from "react";
import { Declarations } from "src/model/myTypes";
import PageTitle from "src/components/pageTitle/pageTitle";
import BeekeeperInfo from "../beekeeper/beekeeperInfo";
// import ListDocuments from "./listDocuments";
import DeclarationsCardList from "../listCard/declarationsCardList";
import styles from "./listDeclaration.module.css";

type OwnProps = {
  list: Declarations;
};

type Props = OwnProps;


class DeclarationList extends Component<Props> {

  render() {
    return (
      <div className={styles.inspectionContainer}>
        <div>
          <PageTitle
            className={styles.subtitle}
            title={"Informações do apicultor"}
          />
          <BeekeeperInfo beekeeper={this.props.list.beekeeper} />
          <PageTitle
            className={styles.subtitle}
            title={"Lista de documentos"}
          />
          <DeclarationsCardList list={this.props.list.documents} />
          {/* <ListDocuments list={this.props.list.documents} /> */}
        </div>
      </div>
    )
  }
}

export default (DeclarationList);
