import { Component } from "react";
import { connect } from "react-redux";
import { INITIAL_STATE } from "src/redux/reducer/initial-state";
import PageTitle from "src/components/pageTitle/pageTitle";
import InputText from "src/components/_nativeHTML/inputs/inputText";
import InputNumber from "src/components/_nativeHTML/inputs/inputNumber";
import Select from 'src/components/_nativeHTML/inputs/select';
import { NewDocument } from "src/model/myTypes";
import { createDocument } from "src/redux/actions/action-declarations";
import Button from "src/components/_nativeHTML/button/button";
import GoBack from "src/components/_nativeHTML/goBack";
import styles from "./createDocument.module.css";

const DECLARATION_TYPE = [
  { id: 1, value: "INITIAL_DECLARATION" },
  { id: 2, value: "ACTIVITY_CLOSE" },
  { id: 3, value: "ACTIVITY_RESTART" },
  { id: 4, value: "ANUAL_DECLARATION" },
  { id: 5, value: "CHANGE" },
];

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

type State = {
  form: {
    version: number;
    declarationType: string;
    year: string;
    unidadeOrganica: string;
  };
  isValid: boolean;
}

class CreateDocument extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      form: {
        version: 0,
        declarationType: '',
        year: new Date().getFullYear().toString(),
        unidadeOrganica: '',
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
    this.props.createDocument(this.state.form);
  };

  render() {
    return (
      <div className={styles.formWrapper}>
        <div className={styles.header}>
          <PageTitle
            title='Criar documento'
          />
          <GoBack />
        </div>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <div className={styles.general}>
            <InputNumber
              label={'Versão'}
              name={'version'}
              defaultValue={this.state.form.version}
              handleChange={this.handleOnChange}
            />
            <InputText
              label={'Ano'}
              name={'year'}
              defaultValue={this.state.form.year}
              handleChange={this.handleOnChange}
            />
          </div>
          <Select
            className={styles.inputDate}
            label={"Tipo de declaração"}
            name={"declarationType"}
            options={DECLARATION_TYPE}
            handleChange={this.handleOnChange}
          />
          <InputText
            label={'Unidade orgânica'}
            name={'unidadeOrganica'}
            defaultValue={this.state.form.unidadeOrganica}
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
    createDocument: (document: NewDocument) => {
      dispatch(createDocument(document));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateDocument);
