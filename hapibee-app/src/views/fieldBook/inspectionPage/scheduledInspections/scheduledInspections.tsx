import { Component } from "react";
import { Schedule } from "src/model/myTypes";
import PageTitle from "src/components/pageTitle/pageTitle";
import styles from "./scheduledInspections.module.css";

type OwnProps = {
  list: Schedule[];
};

type Props = OwnProps;

class ScheduledInspections extends Component<Props> {

  render() {
    return (
      <div className={styles.scheduleContainer}>
        <PageTitle
          className={styles.subtitle}
          title={"Próximas inspeções agendadas:"}
        />
        <div className={styles.schedules}>
          {this.props.list.map((item) => (
            <div className={styles.right}>
              <div className={styles.info}>
                <span className={styles.infoTitle}>ID apiário: </span>
                <span>{item.apiaryID}</span>
              </div>
              <div className={styles.info}>
                <span className={styles.infoTitle}>Data: </span>
                <span>{item.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default (ScheduledInspections);
