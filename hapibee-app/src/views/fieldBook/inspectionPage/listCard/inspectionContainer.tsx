import { Component } from "react";
import { Inspection } from "src/model/myTypes";
import PageTitle from "src/components/pageTitle/pageTitle";
import MaintenanceCardList from "./maintenanceCardList";
import FeedingCardList from "./feedingCardList";
import TreatmentCardList from "./treatmentCardList";
import styles from "./inspectionContainer.module.css";
import classNames from "classnames";

type OwnProps = {
  list: Inspection;
};

type Props = OwnProps;

type State = {
  showDetails: Array<string>;
}

class InspectionContainer extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showDetails: ["Manutenção"]
    }
  }

  handleViewInspection(id: string) {
    if (this.state.showDetails.includes(id)) {
      let newShowDescription = this.state.showDetails.filter(
        (showDescriptionItem) => showDescriptionItem !== id,
      );
      this.setState({ showDetails: newShowDescription });
    } else {
      let newShowDescription = [...this.state.showDetails, id];
      this.setState({ showDetails: newShowDescription });
    }
  }

  render() {
    const inspections = ["Manutenção", "Alimentação", "Tratamento"];

    return (
      <div className={styles.inspectionContainer}>
        <PageTitle
          className={styles.subtitle}
          title={"Visualizar inspeções anteriores"}
        />
        <div className={styles.btnContainer}>
          {inspections.map((item) => (
            <div
              key={item}
              className={classNames(styles.btnOption, this.state.showDetails.includes(item) && styles.active)}
              onClick={() => this.handleViewInspection(item)}
            >
              {item}
            </div>
          ))}
        </div>
        <div>
          {this.state.showDetails.includes("Manutenção") && (
            <div className={styles.cardContainer}>
              <PageTitle
                className={styles.subtitle}
                title={"Manutenções"}
              />
              <MaintenanceCardList list={this.props.list.maintenance} />
            </div>
          )}
          {this.state.showDetails.includes("Tratamento") && (
            <div className={styles.cardContainer}>
              <PageTitle
                className={styles.subtitle}
                title={"Doenças/Tratamentos"}
              />
              <FeedingCardList list={this.props.list.feeding} />
            </div>
          )}
          {this.state.showDetails.includes("Alimentação") && (
            <div className={styles.cardContainer}>
              <PageTitle
                className={styles.subtitle}
                title={"Alimentações"}
              />
              <TreatmentCardList list={this.props.list.treatments} />
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default (InspectionContainer);
