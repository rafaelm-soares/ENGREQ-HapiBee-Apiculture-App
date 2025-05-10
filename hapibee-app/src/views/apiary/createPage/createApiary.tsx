import { Component } from "react";
import { connect } from "react-redux";
import { createApiary } from "src/redux/actions/action-apiary";
import { INITIAL_STATE } from "src/redux/reducer/initial-state";
import PageTitle from "src/components/pageTitle/pageTitle";
import InputText from "src/components/_nativeHTML/inputs/inputText";
import InputNumber from "src/components/_nativeHTML/inputs/inputNumber";
import Select from 'src/components/_nativeHTML/inputs/select';
import { NewApiary } from "src/model/myTypes";
import Button from "src/components/_nativeHTML/button/button";
import GoBack from "src/components/_nativeHTML/goBack";
import styles from "./createApiary.module.css";

const PRODUCTION_GOAL = [
  { id: 1, value: "BEEKEEPING_PRODUCTS" },
  { id: 2, value: "REPRODUCTION_AND_MULTIPLICATION" },
  { id: 3, value: "POLLINATION" },
  { id: 4, value: "DIDACTIC" },
  { id: 5, value: "SCIENTIFIC" },
  { id: 6, value: "OTHER" },
];

const PRODUCTION_TYPE = [
  { id: 1, value: "BIOLOGIC" },
  { id: 2, value: "CONVERSION" },
  { id: 3, value: "CONVENTIONAL" },
];

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

type State = {
  form: {
    id?: number;
    name: string;
    numberOfHives: number;
    productionGoal: string;
    productionType: string;
    municipality: string;
    parish: string;
    place: string;
    latitude: number;
    longitude: number;
    isApproved: boolean;
  };
  isValid: boolean;
}

class CreateApiary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      form: {
        name: "",
        numberOfHives: 0,
        productionGoal: '',
        productionType: '',
        municipality: '',
        parish: '',
        place: '',
        latitude: 0,
        longitude: 0,
        isApproved: false,
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
    this.props.createApiary(this.state.form);
  };

  render() {
    return (
      <div className={styles.formWrapper}>
        <div className={styles.header}>
          <PageTitle
            title='Criar apiario'
          />
          <GoBack />
        </div>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <div className={styles.general}>
            <InputNumber
              label={'Número de colmeias'}
              name={'numberOfHives'}
              defaultValue={this.state.form.numberOfHives}
              handleChange={this.handleOnChange}
            />
            <Select
              className={styles.inputDate}
              label={"Tipo de produção"}
              name={"productionType"}
              options={PRODUCTION_TYPE}
              handleChange={this.handleOnChange}
            />
          </div>
          <InputText
            label={'Nome'}
            name={'name'}
            defaultValue={this.state.form.name}
            handleChange={this.handleOnChange}
          />
          <Select
            className={styles.inputDate}
            label={"Objetivo da produção"}
            name={"productionGoal"}
            options={PRODUCTION_GOAL}
            handleChange={this.handleOnChange}
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
    apiaries: state.apiaries,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    createApiary: (apiary: NewApiary) => {
      dispatch(createApiary(apiary));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateApiary);
