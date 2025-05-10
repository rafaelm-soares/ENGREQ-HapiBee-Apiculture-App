import { Component } from "react";
import { connect } from "react-redux";
import { getTransfers } from "src/redux/actions/action-fieldBook";
import { INITIAL_STATE } from "src/redux/reducer/initial-state";
import PageTitle from "src/components/pageTitle/pageTitle";
import Button from "src/components/_nativeHTML/button/button";
import GoBack from "src/components/_nativeHTML/goBack";
// import ListTransfer from "./listPage/listTransfer";
import TransferCardList from "./listCard/transferCardList";
import styles from "./transfer.module.css";

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;


class MyTransfers extends Component<Props> {
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
            title={"As minhas Transumâncias"}
          />
          <div>
            <GoBack />
            <Button
              className={styles.newBtn}
              placeholder={"Novo"}
              path={"criar-transumancia"}
              isPrimary={true}
            />
          </div>
        </div>
        {/* <ListTransfer list={this.props.transfers} /> */}
        <TransferCardList list={this.props.transfers} />
      </div>
    )
  }
}

const mapStateToProps = (state: typeof INITIAL_STATE) => {
  return {
    transfers: state.fieldBook.transfers,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getTransfers: () => {
      dispatch(getTransfers());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyTransfers);
