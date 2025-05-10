import { Component } from "react";
import { connect } from "react-redux";
import { INITIAL_STATE } from "src/redux/reducer/initial-state";
import PageTitle from "src/components/pageTitle/pageTitle";
import InputText from "src/components/_nativeHTML/inputs/inputText";
import InputNumber from "src/components/_nativeHTML/inputs/inputNumber";
import { NewDocumentApiaryInfo } from "src/model/myTypes";
import { createDocumentApiaryInfo } from "src/redux/actions/action-declarations";
import Button from "src/components/_nativeHTML/button/button";
import GoBack from "src/components/_nativeHTML/goBack";
import InputCheckbox from "src/components/_nativeHTML/inputs/inputCheckbox";
import styles from "./createApiaryInfo.module.css";

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

type State = {
  form: {
    municipality: string;
    parish: string;
    place: string;
    latitude: number;
    longitude: number;
    placeName: string;
    culturaIntensiva: boolean;
    hiveNumber: number;
    hiveSuperNumber: number;
    colonynumber: number;
    transfer: boolean;
    controledZone: boolean;
    apiaryId: number;
    documentNumber: number;
  };
  isValid: boolean;
}

class CreateApiaryInfo extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      form: {
        municipality: '',
        parish: '',
        place: '',
        latitude: 0,
        longitude: 0,
        placeName: '',
        culturaIntensiva: false,
        hiveNumber: 0,
        hiveSuperNumber: 0,
        colonynumber: 0,
        transfer: false,
        controledZone: false,
        apiaryId: 0,
        documentNumber: 0,
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

  handleOnSelect = (name: keyof State["form"]) => {
    this.setState({ form: { ...this.state.form, [name]: !this.state.form[name] } })
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //console.log(this.state.form);
    this.props.createDocumentApiaryInfo(this.state.form);
  };

  render() {
    return (
      <div className={styles.formWrapper}>
        <div className={styles.header}>
          <PageTitle
            title='Adicionar documento à declaração anual'
          />
          <GoBack />
        </div>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <div className={styles.general}>
            <InputNumber
              label={'Nº do documento'}
              name={'documentNumber'}
              defaultValue={this.state.form.documentNumber}
              handleChange={this.handleOnChange}
            />
            <InputNumber
              label={'ID apiário'}
              name={'apiaryId'}
              defaultValue={this.state.form.apiaryId}
              handleChange={this.handleOnChange}
            />
          </div>
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
          <InputText
            label={'Nome do lugar'}
            name={'placeName'}
            defaultValue={this.state.form.placeName}
            handleChange={this.handleOnChange}
          />
          <InputCheckbox
            className={styles.inputAutocomplete}
            name={"culturaIntensiva"}
            handleChange={this.handleOnSelect}
            value={"Cultura intensiva"}
          />
          <InputCheckbox
            className={styles.inputAutocomplete}
            name={"transfer"}
            handleChange={this.handleOnSelect}
            value={"Transumância"}
          />
          <InputCheckbox
            className={styles.inputAutocomplete}
            name={"controledZone"}
            handleChange={this.handleOnSelect}
            value={"Zona controlada"}
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
    createDocumentApiaryInfo: (apiary: NewDocumentApiaryInfo) => {
      dispatch(createDocumentApiaryInfo(apiary));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateApiaryInfo);
