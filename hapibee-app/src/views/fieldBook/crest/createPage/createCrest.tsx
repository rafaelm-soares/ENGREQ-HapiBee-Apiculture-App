import { Component } from "react";
import { connect } from "react-redux";
import { createCresta } from "src/redux/actions/action-fieldBook";
import { INITIAL_STATE } from "src/redux/reducer/initial-state";
import PageTitle from "src/components/pageTitle/pageTitle";
import InputNumber from "src/components/_nativeHTML/inputs/inputNumber";
import InputDate from "src/components/_nativeHTML/inputs/inputDate";
import Select from 'src/components/_nativeHTML/inputs/select';
import { NewCresta } from "src/model/myTypes";
import Button from "src/components/_nativeHTML/button/button";
import GoBack from "src/components/_nativeHTML/goBack";
import styles from "./createCrest.module.css";

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;
  
type State = {
  form: {
    id?: number;
    apiaryID: number,
    hiveID: number,
    nrOfBoards: number;
    ProductType: string;
    quantity: number;
    quantityType: string;
    CrestaDate: string;
  };
  isValid: boolean;
}

const QUANTITY_TYPE = [
  { id: 1, value: "KG" },
  { id: 2, value: "NR" },
];

const PRODUCT_TYPE = [
  // { id: 1, value: "SWARMS" },
  { id: 2, value: "HONEY" },
  { id: 3, value: "WAX" },
  { id: 4, value: "POLLEN" },
  { id: 5, value: "PROPOLIS"},
  { id: 6, value: "ROYAL_JELLY" },
];

class CreateCrest extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      form: {
        CrestaDate: new Date().toISOString().split('T')[0],
        apiaryID: 0,
        hiveID: 0,
        ProductType: '',
        quantityType: '',
        nrOfBoards: 0,
        quantity: 0,
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
    this.props.createCrest(this.state.form);
  };

  render() {
    return (
      <div className={styles.formWrapper}>
        <div className={styles.header}>
          <PageTitle
            title='Criar cresta'
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
          <div className={styles.general}>
            <InputNumber
              label={'Número da Colmeia'}
              name={'hiveID'}
              defaultValue={this.state.form.hiveID}
              handleChange={this.handleOnChange}
            />
          </div>
          <div className={styles.general}>
            <InputNumber
              label={'Número de Alças'}
              name={'nrOfBoards'}
              defaultValue={this.state.form.nrOfBoards}
              handleChange={this.handleOnChange}
            />
          </div>
          <Select
            className={styles.inputDate}
            label={"Tipo de Produto"}
            name={"ProductType"}
            options={PRODUCT_TYPE}
            handleChange={this.handleOnChange}
          />
          <div className={styles.general}>
            <InputNumber
              label={'Quantidade'}
              name={'quantity'}
              defaultValue={this.state.form.quantity}
              handleChange={this.handleOnChange}
            />
          </div>
          <Select
            className={styles.inputDate}
            label={"Tipo de Quantidade"}
            name={"quantityType"}
            options={QUANTITY_TYPE}
            handleChange={this.handleOnChange}
          />

          <InputDate
              className={styles.inputDate}
              label={"Data da Cresta"}
              name={"CrestaDate"}
              handleChange={this.handleOnChange}
              defaultValue={this.state.form.CrestaDate}
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
    crestas: state.fieldBook.transfers,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    createCrest: (crest: NewCresta) => {
      dispatch(createCresta(crest));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateCrest);
