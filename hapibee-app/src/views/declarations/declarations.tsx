import { Component } from "react";
import { connect } from "react-redux";
import { INITIAL_STATE } from "src/redux/reducer/initial-state";
import PageTitle from "src/components/pageTitle/pageTitle";
import Button from "src/components/_nativeHTML/button/button";
import GoBack from "src/components/_nativeHTML/goBack";
import DeclarationList from "./listPage/listDeclaration";
import { getBeekeeper, getDocuments } from "src/redux/actions/action-declarations";
import styles from "./declarations.module.css";

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;


class MyDeclarations extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.getInitialValues();
  }

  getInitialValues() {
    this.props.getDocuments();
    this.props.getBeekeeper();
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <PageTitle
            title={"Declarações"}
          />
          <div className={styles.headerBtnContainer}>
            <GoBack />
            <Button
              className={styles.newBtn}
              placeholder={"Nova declaração"}
              path={"/declaracoes/registar-documento"}
              isPrimary={true}
            />
            <Button
              className={styles.newBtn}
              placeholder={"Adicionar documento a declaração existente"}
              path={"/declaracoes/registar-info-apiario"}
              isPrimary={true}
            />
          </div>
        </div>
        <DeclarationList list={this.props.declarations} />
      </div>
    )
  }
}

const mapStateToProps = (state: typeof INITIAL_STATE) => {
  return {
    declarations: state.declarations,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getDocuments: () => {
      dispatch(getDocuments());
    },
    getBeekeeper: () => {
      dispatch(getBeekeeper())
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyDeclarations);
