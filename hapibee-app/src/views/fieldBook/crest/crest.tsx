import { Component } from "react";
import { connect } from "react-redux";
import { getCresta } from "src/redux/actions/action-fieldBook";
import { INITIAL_STATE } from "src/redux/reducer/initial-state";
import PageTitle from "src/components/pageTitle/pageTitle";
import Button from "src/components/_nativeHTML/button/button";
import GoBack from "src/components/_nativeHTML/goBack";
// import ListCrest from "./listPage/listCrest";
import CrestCardList from "./listCard/crestCardList";
import styles from "./crest.module.css";

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;


class MyCrests extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.getInitialValues();
  }

  getInitialValues() {
    this.props.getTransfers();
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <PageTitle
            title={"As minhas Crestas"}
          />
          <div>
            <GoBack />
            <Button
              className={styles.newBtn}
              placeholder={"Novo"}
              path={"criar-cresta"}
              isPrimary={true}
            />
          </div>
        </div>
        {/* <ListCrest list={this.props.crestas} /> */}
        <CrestCardList list={this.props.crestas} />
      </div>
    )
  }
}

const mapStateToProps = (state: typeof INITIAL_STATE) => {
  return {
    crestas: state.fieldBook.crestas,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getTransfers: () => {
      dispatch(getCresta());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyCrests);
