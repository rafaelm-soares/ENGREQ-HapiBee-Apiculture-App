import { Component } from "react";
import { connect } from "react-redux";
import { INITIAL_STATE } from "src/redux/reducer/initial-state";
import { Hive } from "src/model/myTypes";
// import { ReactComponent as ApiaryIcon } from 'src/icons/hapibee_apiary.svg';
import styles from "./hiveCardList.module.css";

type OwnProps = {
  list: Hive[];
};

type Props = OwnProps &
  ReturnType<typeof mapStateToProps>;

type GroupedHives = {
  [apiaryId: string]: Hive[];
};

class HiveCardList extends Component<Props> {


  render() {
    // Convert the list to an object where keys are apiaryId and values are arrays of Hive objects
    const groupedHives: GroupedHives = this.props.list.reduce((result, item) => {
      if (typeof item.id !== "undefined") {
        const apiaryId = item.apiaryID.toString(); // Convert to string for using as the object key
        if (!result[apiaryId]) {
          result[apiaryId] = [];
        }
        result[apiaryId].push(item);
      }
      return result;
    }, {} as GroupedHives);

    return (
      <div className={styles.list}>
        {Object.keys(groupedHives).map(apiaryId => (
          <div key={apiaryId} className={styles.group}>
            <div className={styles.title}>Apiário: {apiaryId}</div>
            <div className={styles.subgroup}>
              {groupedHives[apiaryId].map((item, index) => {
                if (typeof item.id != "undefined") {
                  return (
                    <div className={styles.card} key={index} onClick={() => (console.log('clicked', item.id))}>
                      {/* <div className={styles.left}>
                        <ApiaryIcon className={styles.icon} />
                      </div> */}
                      <div className={styles.right}>
                        <div className={styles.title}>
                          <span>{item.id}</span>
                        </div>
                        <div className={styles.info}>
                          <span className={styles.infoTitle}>Nome: </span>
                          <span>{item.name}</span>
                        </div>
                      </div>
                    </div>
                  )
                } else {
                  return null;
                }
              })}
            </div>
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = (state: typeof INITIAL_STATE) => {
  return {
    hives: state.apiaries.hives,
  };
};

export default connect(mapStateToProps)(HiveCardList);
