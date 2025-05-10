import { Component } from "react";
import { connect } from "react-redux";
import { INITIAL_STATE } from "src/redux/reducer/initial-state";
import PageTitle from "src/components/pageTitle/pageTitle";
import InputNumber from "src/components/_nativeHTML/inputs/inputNumber";
import Select from 'src/components/_nativeHTML/inputs/select';
import { HiveSplit } from "src/model/myTypes";
import styles from "./createHiveSplit.module.css";
import Button from "src/components/_nativeHTML/button/button";
import GoBack from "src/components/_nativeHTML/goBack";
import { updateHiveSplit } from "src/redux/actions/action-hivesplit";
import {productionType, reproductionManagement} from 'src/model/enum';
import {reproductionQueen} from 'src/model/enum';
import {quantityType} from 'src/model/enum';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import InputText from "src/components/_nativeHTML/inputs/inputText";
import InputDate from "src/components/_nativeHTML/inputs/inputDate";

type OwnProps = {
  hive: HiveSplit;
};

type Props = OwnProps & ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

type State = {
  form: {
    id?: number,
    apiary: number,
    hiveOrigID: number,
    listOfHiveDestID: number[],
    reproductionQueen: string,
    reproductionManagement: string,
    hiveSplitDate: string,
    productionType: string,
    quantitiy: number,
    quantityType: string
  };
}

class UpdateHiveSplit extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    
    this.state = {
      form: {
        id : this.props.hive.id,
        apiary: this.props.hive.apiary,
        hiveOrigID: this.props.hive.hiveOrigID,
        listOfHiveDestID: this.props.hive.listOfHiveDestID,
        reproductionQueen: this.props.hive.reproductionQueen,
        reproductionManagement: this.props.hive.reproductionManagement,
        hiveSplitDate: this.props.hive.hiveSplitDate,
        productionType: this.props.hive.productionType,
        quantitiy: this.props.hive.quantitiy,
        quantityType: this.props.hive.quantityType
      }
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
    return isValid;
  };

  handleOnChange = (name: string, newValue: string | number) => {
    name = name as keyof State['form'];
    this.setState({ form: { ...this.state.form, [name]: newValue, }, });
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.updateHiveSplit(this.state.form);
  };

  handleDateChange = (date: Date) => {
    if (date) {
      this.setState({
        form: {
          ...this.state.form,
          hiveSplitDate: format(date, 'yyyy/MM/dd'), // Format the date to a string
        },
      });
    }
  };

  render() {

    return (
      <div className={styles.formWrapper}>
        <div className={styles.header}>
          <PageTitle
            title='Atualizar Desdobramento'
          />
          <GoBack />
        </div>
        <form className={styles.form} onSubmit={this.handleSubmit}>
        <div className={styles.general}>
            <InputNumber
              label={'Desdobramento ID'}
              name={'id'}
              defaultValue={this.state.form.id}
              handleChange={this.handleOnChange}
            />
          </div>
          <div className={styles.general}>
            <InputNumber
              label={'Apiário ID'}
              name={'apiaryID'}
              defaultValue={this.state.form.apiary}
              handleChange={this.handleOnChange}
            />
          </div>
          <div className={styles.general}>
            <InputNumber
              label={'Colmeia Original'}
              name={'hiveOrigID'}
              defaultValue={this.state.form.hiveOrigID}
              handleChange={this.handleOnChange}
            />
             <InputText
              label={'Colmeias nº'}
              name={'listOfHiveDestID'}
              defaultValue={this.state.form.listOfHiveDestID.join(', ')}
              handleChange={this.handleOnChange}
            />
            </div>
            <div className={styles.general}>
              <Select
                className={styles.inputDate}
                label={"Rainha"}
                name={"reproductionQueen"}
                options={Object.values(reproductionQueen)
                  .filter(value => typeof value === 'string')
                  .map(value => ({
                    value,
                    label: value,
                  }))}
                handleChange={this.handleOnChange}
              />
              <Select
                className={styles.inputDate}
                label={"Enxames"}
                name={"reproductionManagement"}
                options={Object.values(reproductionManagement)
                  .filter(value => typeof value === 'string')
                  .map(value => ({
                    value,
                    label: value,
                  }))}
                handleChange={this.handleOnChange}
              />
            </div>
            <div className={styles.general}>
            <InputDate
              className={styles.inputDate}
              label={"Data do desdobramento"}
              name={"hiveSplitDate"}
              handleChange={this.handleOnChange}
              defaultValue={this.state.form.hiveSplitDate}
            />
            </div>
            <Select
              className={styles.inputDate}
              label={"Tipo de produção"}
              name={"productionType"}
              options={Object.values(productionType)
                .filter(value => typeof value === 'string')
                .map(value => ({
                  value,
                  label: value,
                }))}
              handleChange={this.handleOnChange}
            />
            <div className={styles.general}>
              <InputNumber
                label={'Quantidade'}
                name={'quantitiy'}
                defaultValue={this.state.form.quantitiy}
                handleChange={this.handleOnChange}
              />
              <Select
                className={styles.inputDate}
                label={"Tipo de Quantidade"}
                name={"quantityType"}
                options={Object.values(quantityType)
                  .filter(value => typeof value === 'string')
                  .map(value => ({
                    value,
                    label: value,
                  }))}
                handleChange={this.handleOnChange}
              />
            </div>
            <Button
              className={styles.submitBtn}
              placeholder={'Guardar'}
              isPrimary={true}
              isSubmit={true}
            />
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state: typeof INITIAL_STATE) => {
  return {
    hivesplits: state.hivesplits,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    updateHiveSplit: (hivesplit: HiveSplit) => {
      dispatch(updateHiveSplit(hivesplit));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateHiveSplit);
