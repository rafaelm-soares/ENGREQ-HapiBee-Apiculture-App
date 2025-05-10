import { Component } from "react";
import { connect } from "react-redux";
import { getApiaries } from "src/redux/actions/action-apiary";
import { INITIAL_STATE } from "src/redux/reducer/initial-state";
import styles from "./transfer.module.css";

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;


class Transders extends Component<Props> {

  render() {
    return (
      <div className={styles.container}>
        <div>Transfer page</div>
        <div>Button for new </div>
        <div>Table with existing</div>
      </div>
    )
  }
}

const mapStateToProps = (state: typeof INITIAL_STATE) => {
  return {
    apiaries: state.apiaries,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getApiaries: () => {
      dispatch(getApiaries());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Transders);
