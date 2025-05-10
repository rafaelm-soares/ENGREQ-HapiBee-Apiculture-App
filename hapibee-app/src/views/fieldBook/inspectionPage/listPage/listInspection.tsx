import { Component } from "react";
import { Inspection } from "src/model/myTypes";
import ListMaintenance from "./listMaintenance";
import ListFeeding from "./listFeeding";
import ListTreatment from "./listTreatment";
import styles from "./listInspection.module.css";
import PageTitle from "src/components/pageTitle/pageTitle";

type OwnProps = {
  list: Inspection;
};

type Props = OwnProps;


class InspectionList extends Component<Props> {

  render() {
    return (
      <div className={styles.inspectionContainer}>
        <div>
          <PageTitle
            className={styles.subtitle}
            title={"Manutenções"}
          />
          <ListMaintenance list={this.props.list.maintenance} />
          <PageTitle
            className={styles.subtitle}
            title={"Doenças/Tratamentos"}
          />
          <ListFeeding list={this.props.list.feeding} />
          <PageTitle
            className={styles.subtitle}
            title={"Alimentações"}
          />
          <ListTreatment list={this.props.list.treatments} />
        </div>
      </div>
    )
  }
}

export default (InspectionList);
