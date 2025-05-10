import { Component } from "react";
import { connect } from "react-redux";
import { getApiaries } from "src/redux/actions/action-apiary";
import { INITIAL_STATE } from "src/redux/reducer/initial-state";
import PageTitle from "src/components/pageTitle/pageTitle";
import Button from "src/components/_nativeHTML/button/button";
//import ListApiary from "./listPage/listApiary";
import ApiaryCardList from "./listCard/listCard";
import styles from "./apiary.module.css";

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;


class MyApiaries extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.getInitialValues();
  }

  getInitialValues() {
    this.props.getApiaries();
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <PageTitle
            title={"Os meus apiários"}
          />
          <Button
            className={styles.newBtn}
            placeholder={"Novo"}
            path={"/apiario/criar-apiario"}
            isPrimary={true}
          />
        </div>
        {/* <ListApiary list={this.props.apiaries} /> */}
        <ApiaryCardList list={this.props.apiaries} />
      </div>
    )
  }
}

const mapStateToProps = (state: typeof INITIAL_STATE) => {
  return {
    apiaries: state.apiaries.apiaries,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getApiaries: () => {
      dispatch(getApiaries());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyApiaries);
