import { Component } from "react";
import { connect } from "react-redux";
import { INITIAL_STATE } from "src/redux/reducer/initial-state";
import PageTitle from "src/components/pageTitle/pageTitle";
import InputText from "src/components/_nativeHTML/inputs/inputText";
import InputNumber from "src/components/_nativeHTML/inputs/inputNumber";
import Select from 'src/components/_nativeHTML/inputs/select';
import { NewInspection } from "src/model/myTypes";
import Button from "src/components/_nativeHTML/button/button";
import GoBack from "src/components/_nativeHTML/goBack";
import InputDate from "src/components/_nativeHTML/inputs/inputDate";
import { createInspection } from "src/redux/actions/action-fieldBook";
import styles from "./createInspection.module.css";
import InputCheckbox from "src/components/_nativeHTML/inputs/inputCheckbox";

const MAINTENANCE_MOTIVE = [
  { id: 1, value: "PEST_DISEASE_CONTROL" },
  { id: 2, value: "APIARY_CLEANING" },
  { id: 3, value: "HIVE_DISINFECTION" },
  { id: 4, value: "HIVE_REMOVAL" },
  { id: 5, value: "EQUIPMENT_DISINFECTION" },
  { id: 6, value: "OTHER" },
];

const DISINFECTION_MOTIVE = [
  { id: 1, value: "DEATH" },
  { id: 2, value: "MAINTENANCE" },
  { id: 3, value: "OTHER" },
];

const DISINFECTION_MODE = [
  { id: 1, value: "WATER_VAPOR" },
  { id: 2, value: "IMMERSION_CAUSTIC_SODA" },
  { id: 3, value: "DIRECT_FLAME" },
];

const FOOD_ORIGIN = [
  { id: 1, value: "EXTERNAL" },
  { id: 2, value: "EXPLORATION" },
];

const DISIEASE_TYPE = [
  { id: 1, value: "CLINICAL_SUSPICION" },
  { id: 2, value: "SAMPLE_COLLECTION" },
  { id: 3, value: "TREATMENT" },
  { id: 4, value: "HIVE_COLONY_REMOVAL" },
];

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

type State = {
  form: {
    apiaryID: number;
    date: string;
    id?: number;
    // Maintenance
    hiveIDmaintenance: string;
    temperature: string;
    humidity: string;
    inspectionType: string;
    motive: string;
    disinfectionMode: string;
    productsUsed: string;
    observations: string;
    // Feeding
    hiveIDfeeding: string;
    product: string;
    formula: string;
    origin: string;
    doseFood: string;
    // Disease Treatment
    hiveIDdisease: string;
    type: string;
    disease: string;
    medication: string;
    activeSubstance: string;
    doseTreatment: string;
    duration: string;
    endDate: string;
  };
  isMaintenance: boolean;
  isFeeding: boolean;
  isTreatment: boolean;
  isValid: boolean;
}

class CreateInspection extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      form: {
        apiaryID: 0,
        date: new Date().toISOString().split('T')[0],
        // Maintenance
        hiveIDmaintenance: "",
        temperature: "",
        humidity: "",
        inspectionType: "",
        motive: "",
        disinfectionMode: "",
        productsUsed: "",
        observations: "",
        // Feeding
        hiveIDfeeding: "",
        product: "",
        formula: "",
        origin: "",
        doseFood: "",
        // Disease Treatment
        hiveIDdisease: "",
        type: "",
        disease: "",
        medication: "",
        activeSubstance: "",
        doseTreatment: "",
        duration: "",
        endDate: new Date().toISOString().split('T')[0],
      },
      isMaintenance: false,
      isFeeding: false,
      isTreatment: false,
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
    if (!this.state.isMaintenance && !this.state.isFeeding && !this.state.isTreatment) {
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
    this.props.createInspection(this.state.form);
  };

  render() {
    return (
      <div className={styles.formWrapper}>
        <div className={styles.header}>
          <PageTitle
            title='Registar inspeção'
          />
          <GoBack />
        </div>
        <div className={styles.inspectiosType}>
          <PageTitle
            className={styles.subtitle}
            title='Selecione tipo de inspeção'
          />
          <InputCheckbox
            className={styles.checkbox}
            name={"isMaintenance"}
            handleChange={this.handleOnSelect}
            value={"Manutenção"}
          />
          <InputCheckbox
            className={styles.checkbox}
            name={"isFeeding"}
            handleChange={this.handleOnSelect}
            value={"Alimentação"}
          />
          <InputCheckbox
            className={styles.checkbox}
            name={"isTreatment"}
            handleChange={this.handleOnSelect}
            value={"Doença/Tratamento"}
          />
        </div>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <div className={styles.general}>
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
          </div>
          {this.state.isMaintenance && (
            <>
              <PageTitle
                title='Registar manutenção'
                className={styles.subtitle}
              />
              <div className={styles.maintenance}>
                <InputText
                  label={'Colmeias nº'}
                  name={'hiveIDmaintenance'}
                  defaultValue={this.state.form.hiveIDmaintenance}
                  handleChange={this.handleOnChange}
                />
                <InputText
                  label={'Humidade'}
                  name={'humidity'}
                  defaultValue={this.state.form.humidity}
                  handleChange={this.handleOnChange}
                />
                <Select
                  className={styles.inputDate}
                  label={"Tipo de inspeção"}
                  name={"inspectionType"}
                  options={MAINTENANCE_MOTIVE}
                  handleChange={this.handleOnChange}
                />
                <InputText
                  label={'Motivo'}
                  name={'motive'}
                  defaultValue={this.state.form.motive}
                  handleChange={this.handleOnChange}
                />
                <Select
                  className={styles.inputDate}
                  label={"Motivo"}
                  name={"motive"}
                  options={DISINFECTION_MOTIVE}
                  handleChange={this.handleOnChange}
                />
                <Select
                  className={styles.inputDate}
                  label={"Modo de desinfeção"}
                  name={"disinfectionMode"}
                  options={DISINFECTION_MODE}
                  handleChange={this.handleOnChange}
                />
                <InputText
                  label={'Produtos usados'}
                  name={'productsUsed'}
                  defaultValue={this.state.form.productsUsed}
                  handleChange={this.handleOnChange}
                />
                <InputText
                  label={'Oservações'}
                  name={'observations'}
                  defaultValue={this.state.form.observations}
                  handleChange={this.handleOnChange}
                />
              </div>
            </>
          )}
          {this.state.isFeeding && (
            <>
              <PageTitle
                title='Registar alimentação'
                className={styles.subtitle}
              />
              <div className={styles.feeding}>
                <InputText
                  label={'Colmeias nº'}
                  name={'hiveIDfeeding'}
                  defaultValue={this.state.form.hiveIDfeeding}
                  handleChange={this.handleOnChange}
                />
                <InputText
                  label={'Produto'}
                  name={'product'}
                  defaultValue={this.state.form.product}
                  handleChange={this.handleOnChange}
                />
                <InputText
                  label={'Fórmula'}
                  name={'formula'}
                  defaultValue={this.state.form.formula}
                  handleChange={this.handleOnChange}
                />
                <Select
                  className={styles.inputDate}
                  label={"Origem"}
                  name={"origin"}
                  options={FOOD_ORIGIN}
                  handleChange={this.handleOnChange}
                />
                <InputText
                  label={'Dose'}
                  name={'doseFood'}
                  defaultValue={this.state.form.doseFood}
                  handleChange={this.handleOnChange}
                />
              </div>
            </>
          )}
          {this.state.isTreatment && (
            <>
              <PageTitle
                title='Registar doença/tratamento'
                className={styles.subtitle}
              />
              <div className={styles.treatment}>
                <InputText
                  label={'Colmeias nº'}
                  name={'hiveIDdisease'}
                  defaultValue={this.state.form.hiveIDdisease}
                  handleChange={this.handleOnChange}
                />
                <Select
                  className={styles.inputDate}
                  label={"Tipo de doença"}
                  name={"type"}
                  options={DISIEASE_TYPE}
                  handleChange={this.handleOnChange}
                />
                <InputText
                  label={'Doença'}
                  name={'disease'}
                  defaultValue={this.state.form.disease}
                  handleChange={this.handleOnChange}
                />
                <InputText
                  label={'Medicação'}
                  name={'medication'}
                  defaultValue={this.state.form.medication}
                  handleChange={this.handleOnChange}
                />
                <InputText
                  label={'Substância ativa'}
                  name={'activeSubstance'}
                  defaultValue={this.state.form.activeSubstance}
                  handleChange={this.handleOnChange}
                />
                <InputText
                  label={'Dose'}
                  name={'doseTreatment'}
                  defaultValue={this.state.form.doseTreatment}
                  handleChange={this.handleOnChange}
                />
                <InputText
                  label={'Duração'}
                  name={'duration'}
                  defaultValue={this.state.form.duration}
                  handleChange={this.handleOnChange}
                />
                <InputDate
                  className={styles.inputDate}
                  label={"Data fim"}
                  name={"endDate"}
                  handleChange={this.handleOnChange}
                  defaultValue={this.state.form.endDate}
                />
              </div>
            </>
          )}
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
    createInspection: (inspection: NewInspection) => {
      dispatch(createInspection(inspection));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateInspection);
