import { Component } from "react";
import { connect } from "react-redux";
import { createTransfer } from "src/redux/actions/action-fieldBook";
import { INITIAL_STATE } from "src/redux/reducer/initial-state";
import PageTitle from "src/components/pageTitle/pageTitle";
import InputText from "src/components/_nativeHTML/inputs/inputText";
import InputNumber from "src/components/_nativeHTML/inputs/inputNumber";
import InputDate from "src/components/_nativeHTML/inputs/inputDate";
import { NewTransfer } from "src/model/myTypes";
import Button from "src/components/_nativeHTML/button/button";
import GoBack from "src/components/_nativeHTML/goBack";
import styles from "./createTransfer.module.css";

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

type State = {
  form: {
    id?: number;
    transferDate: string,
    apiaryID: number,
    municipality: string;
    parish: string;
    place: string;
    latitude: number;
    longitude: number;
  };
  isValid: boolean;
}

class CreateTransfer extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      form: {
        transferDate: new Date().toISOString().split('T')[0],
        apiaryID: 0,
        municipality: '',
        parish: '',
        place: '',
        latitude: 0,
        longitude: 0,
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
    this.props.createTransfer(this.state.form);
  };

  render() {
    return (
      <div className={styles.formWrapper}>
        <div className={styles.header}>
          <PageTitle
            title='Criar transumância'
          />
          <GoBack />
        </div>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <div className={styles.general}>
            <InputNumber
              label={'Número do Apiário'}
              name={'apiaryID'}
              defaultValue={this.state.form.apiaryID}
              handleChange={this.handleOnChange}
            />
          </div>
          <InputDate
              className={styles.inputDate}
              label={"Data do transumância"}
              name={"transferDate"}
              handleChange={this.handleOnChange}
              defaultValue={this.state.form.transferDate}
            />
          <InputText
            label={'Municipio'}
            name={'municipality'}
            defaultValue={this.state.form.municipality}
            handleChange={this.handleOnChange}
          />
          <InputText
            label={'Freguesia'}
            name={'parish'}
            defaultValue={this.state.form.parish}
            handleChange={this.handleOnChange}
          />
          <InputText
            label={'Lugar'}
            name={'place'}
            defaultValue={this.state.form.place}
            handleChange={this.handleOnChange}
          />
          <div className={styles.local}>
            <InputNumber
              label={'Latitude'}
              name={'latitude'}
              defaultValue={this.state.form.latitude}
              handleChange={this.handleOnChange}
            />
            <InputNumber
              label={'Longitude'}
              name={'longitude'}
              defaultValue={this.state.form.longitude}
              handleChange={this.handleOnChange}
            />
          </div>
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
    transfers: state.fieldBook.transfers,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    createTransfer: (transfer: NewTransfer) => {
      dispatch(createTransfer(transfer));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTransfer);
