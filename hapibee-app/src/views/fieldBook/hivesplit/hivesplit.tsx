import { Component } from "react";
import { connect } from "react-redux";
import { getHiveSplitList } from "src/redux/actions/action-hivesplit";
import { INITIAL_STATE } from "src/redux/reducer/initial-state";
import PageTitle from "src/components/pageTitle/pageTitle";
import Button from "src/components/_nativeHTML/button/button";
import GoBack from "src/components/_nativeHTML/goBack";
// import ListHiveSplit from "./listPage/listHiveSplit";
import SplitCardList from "./listCard/sliptCardList";
import styles from "./hivesplit.module.css";

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;


class MyHiveSplits extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.getInitialValues();
  }

  getInitialValues() {
    this.props.getHiveSplitList();
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <PageTitle
            title={"Os meus desdobramentos"}
          />
          <div>
            <GoBack />
            <Button
              className={styles.newBtn}
              placeholder={"Novo"}
              path={"/caderno-de-campo/desdobramento/criar-desdobramento"}
              isPrimary={true}
            />
          </div>
        </div>
        {/* <ListHiveSplit list={this.props.hivesplits.hivesplits} /> */}
        <SplitCardList list={this.props.hivesplits.hivesplits} />
      </div>
    )
  }
}

const mapStateToProps = (state: typeof INITIAL_STATE) => {
  return {
    hivesplits: state.hivesplits,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getHiveSplitList: () => {
      dispatch(getHiveSplitList());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyHiveSplits);
