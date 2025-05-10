import { Component } from "react";
import { connect } from "react-redux";
import { INITIAL_STATE } from "src/redux/reducer/initial-state";
import PageTitle from "src/components/pageTitle/pageTitle";
import Button from "src/components/_nativeHTML/button/button";
// import ListInspection from "./listPage/listInspection";
import InspectionContainer from "./listCard/inspectionContainer";
import { getInspections, getInspectionSchedule } from "src/redux/actions/action-fieldBook";
import GoBack from "src/components/_nativeHTML/goBack";
import ScheduledInspections from "./scheduledInspections/scheduledInspections";
import styles from "./inspection.module.css";

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;


class MyInspections extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.getInitialValues();
  }

  getInitialValues() {
    this.props.getInspections();
    this.props.getInspectionSchedule();
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <PageTitle
            title={"INSPEÇÕES"}
          />
          <div>
            <GoBack />
            <Button
              className={styles.newBtn}
              placeholder={"Registar inspeção"}
              path={"/caderno-de-campo/inspecoes/registar"}
              isPrimary={true}
            />
            <Button
              className={styles.newBtn}
              placeholder={"Agendar inspeção"}
              path={"/caderno-de-campo/inspecoes/agendar"}
              isPrimary={true}
            />
          </div>
        </div>
        {/* <ListInspection list={this.props.inspections} /> */}
        <ScheduledInspections list={this.props.schedules} />
        <InspectionContainer list={this.props.inspections} />
      </div>
    )
  }
}

const mapStateToProps = (state: typeof INITIAL_STATE) => {
  return {
    inspections: state.fieldBook.inspections,
    schedules: state.fieldBook.schedule,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getInspections: () => {
      dispatch(getInspections());
    },
    getInspectionSchedule: () => {
      dispatch(getInspectionSchedule());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyInspections);
