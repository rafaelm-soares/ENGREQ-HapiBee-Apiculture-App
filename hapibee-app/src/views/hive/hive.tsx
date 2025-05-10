import { Component } from "react";
import { connect } from "react-redux";
import { getHives } from "src/redux/actions/action-apiary";
import { INITIAL_STATE } from "src/redux/reducer/initial-state";
import PageTitle from "src/components/pageTitle/pageTitle";
import Button from "src/components/_nativeHTML/button/button";
// import ListHive from "./listPage/listHive";
import HiveCardList from "./listCard/hiveCardList";
import styles from "./hive.module.css";

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;


class MyHives extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.getInitialValues();
  }

  getInitialValues() {
    this.props.getHives();
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <PageTitle
            title={"As minhas colmeias"}
          />
          <Button
            className={styles.newBtn}
            placeholder={"Novo"}
            path={"/colmeias/criar-colmeia"}
            isPrimary={true}
          />
        </div>
        {/* <ListHive list={this.props.hives} /> */}
        <HiveCardList list={this.props.hives} />
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
    getHives: () => {
      dispatch(getHives());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyHives);
