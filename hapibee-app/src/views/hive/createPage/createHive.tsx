import { Component } from "react";
import { connect } from "react-redux";
import { createHive } from "src/redux/actions/action-apiary";
import { INITIAL_STATE } from "src/redux/reducer/initial-state";
import PageTitle from "src/components/pageTitle/pageTitle";
import InputNumber from "src/components/_nativeHTML/inputs/inputNumber";
import { NewHive } from "src/model/myTypes";
import Button from "src/components/_nativeHTML/button/button";
import GoBack from "src/components/_nativeHTML/goBack";
import styles from "./createHive.module.css";
import InputText from "src/components/_nativeHTML/inputs/inputText";

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

type State = {
  form: {
    apiaryID: number;
    name: string;
  };
  isValid: boolean;
}

class CreateHive extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      form: {
        apiaryID: 0,
        name: "",
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
    Object.keys(this.state.form).forEach((key) => {
      if (this.state.form[key as keyof State['form']] === '') {
        isValid = false;
      }
    });
    this.setState({ isValid: isValid });
  };

  handleOnChange = (name: string, newValue: string | number) => {
    name = name as keyof State['form'];
    this.setState({ form: { ...this.state.form, [name]: newValue, }, });
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //console.log(this.state.form);
    this.props.createHive(this.state.form);
  };

  render() {
    return (
      <div className={styles.formWrapper}>
        <div className={styles.header}>
          <PageTitle
            title='Criar colmeia'
          />
          <GoBack />
        </div>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <InputNumber
            label={'ID Apiário'}
            name={'apiaryID'}
            defaultValue={this.state.form.apiaryID}
            handleChange={this.handleOnChange}
          />
          <InputText
            label={'Nome'}
            name={'name'}
            defaultValue={this.state.form.name}
            handleChange={this.handleOnChange}
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
    createHive: (hive: NewHive) => {
      dispatch(createHive(hive));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateHive);
