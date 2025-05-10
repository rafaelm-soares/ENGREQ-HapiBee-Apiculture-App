import { Component } from "react";
import { connect } from "react-redux";
import { INITIAL_STATE } from "src/redux/reducer/initial-state";
import PageTitle from "src/components/pageTitle/pageTitle";
import InputNumber from "src/components/_nativeHTML/inputs/inputNumber";
import { Schedule } from "src/model/myTypes";
import Button from "src/components/_nativeHTML/button/button";
import GoBack from "src/components/_nativeHTML/goBack";
import InputDate from "src/components/_nativeHTML/inputs/inputDate";
import { createInspectionSchedule } from "src/redux/actions/action-fieldBook";
import styles from "./createInspection.module.css";


type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

type State = {
  form: {
    apiaryID: number;
    date: string;
  };
  isValid: boolean;
}

class ScheduleInspection extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      form: {
        apiaryID: 0,
        date: new Date().toISOString().split('T')[0],
      },
      isValid: false,
    };
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (prevState.form !== this.state.form) {
      this.validateForm();
    }
  }

  validateForm = () => {
    var isValid = true;
    if (!this.state.form.apiaryID && !this.state.form.date) {
      isValid = false;
    }
    this.setState({ isValid: isValid });
  };

  handleOnChange = (name: string, newValue: string | number) => {
    name = name as keyof State['form'];
    this.setState({ form: { ...this.state.form, [name]: newValue, }, });
  };

  handleOnSelect = (name: keyof State) => {
    this.setState({ ...this.state, [name]: !this.state[name] })
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //console.log(this.state.form);
    this.props.createInspectionSchedule(this.state.form);
  };

  render() {
    return (
      <div className={styles.formWrapper}>
        <div className={styles.header}>
          <PageTitle
            title='Agendar inspeção'
          />
          <GoBack />
        </div>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <InputNumber
            label={'ID '}
            name={'apiaryID'}
            defaultValue={this.state.form.apiaryID}
            handleChange={this.handleOnChange}
          />
          <InputDate
            className={styles.inputDate}
            label={"Data"}
            name={"date"}
            handleChange={this.handleOnChange}
            defaultValue={this.state.form.date}
          />
          <Button
            className={styles.submitBtn}
            placeholder={'Guardar'}
            isPrimary={true}
            isDisabled={!this.state.isValid}
            isSubmit={true}
          />
        </form>
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
    createInspectionSchedule: (schedule: Schedule) => {
      dispatch(createInspectionSchedule(schedule));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleInspection);
