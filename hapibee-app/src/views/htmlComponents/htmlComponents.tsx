import { Component, FormEvent } from 'react';
import styles from './htmlComponents.module.css';
import Button from 'src/components/_nativeHTML/button/button';
import InputDate from 'src/components/_nativeHTML/inputs/inputDate';
import InputNumber from 'src/components/_nativeHTML/inputs/inputNumber';
import InputText from 'src/components/_nativeHTML/inputs/inputText';
import InputTextArea from 'src/components/_nativeHTML/inputs/inputTextArea';
import InputEmail from 'src/components/_nativeHTML/inputs/inputEmail';
import InputPassword from 'src/components/_nativeHTML/inputs/inputPassword';
import InputPhone from 'src/components/_nativeHTML/inputs/inputPhone';
import Select from 'src/components/_nativeHTML/inputs/select';
import SelectAutocomplete from 'src/components/_nativeHTML/inputs/selectAutocomplete';
import InputRadio from 'src/components/_nativeHTML/inputs/inputRadio';
import InputCheckbox from 'src/components/_nativeHTML/inputs/inputCheckbox';

const SELECT_VALUES = [
  { id: 1, value: "Item 1" },
  { id: 2, value: "Item 2" },
  { id: 3, value: "Item 3" },
];

type Props = {};

type State = {
  form: {
    number: number;
    numberPositive: number;
    text: string;
    description: string;
    email: string;
    password: string;
    passwordConfirmation: string;
    phone: number;
    date: string;
    selected: string | number;
    selectedAutocomplete: string | number;
    radioOnOff: boolean;
    radio1: boolean;
    radio2: boolean;
  }
  isReady: boolean;
};

class HtmlComponents extends Component<Props, State> {
  private initialStateForm = {
    number: 0,
    numberPositive: 0,
    text: "",
    description: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    phone: 0,
    date: new Date().toISOString().split('T')[0],
    selected: "",
    selectedAutocomplete: "",
    radioOnOff: false,
    radio1: true,
    radio2: false,
  };
  constructor(props: Props) {
    super(props);
    this.state = {
      form: this.initialStateForm,
      isReady: false,
    };
  };

  componentWillUnmount(): void {
    //optional reset component state values
    this.setState({ form: this.initialStateForm, isReady: false });
  };

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
    if (prevProps !== this.props) {
      //optional update element if props changed
      console.log("htmlComponents PROPS: ", this.props);
    }
    if (prevState !== this.state) {
      //optional update element if state changed
      console.log("htmlComponents STATE: ", this.state);
    }
  };

  handleOnChange = (name: string, newValue: string | number) => {
    this.setState({ form: { ...this.state.form, [name]: newValue } });
  };

  handleOnSelect = (name: keyof State["form"]) => {
    this.setState({ form: { ...this.state.form, [name]: !this.state.form[name] } })
  };

  handleOnSelectRadioOption = (name: keyof State["form"]) => {
    if (name === 'radio1' || name === 'radio2') {
      this.setState({
        form: {
          ...this.state.form,
          radio1: !this.state.form.radio1,
          radio2: !this.state.form.radio2
        }
      })
    } else {
      this.setState({
        form: {
          ...this.state.form,
          radio1: false,
          radio2: false
        }
      })
    }
  };

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.setState({ isReady: true });
  };

  resetForm() {
    this.setState({ form: this.initialStateForm, isReady: false });
    console.log("RESET state:", this.state.form);
  }

  render() {
    return (
      <div className={styles.container}>
        <form className={styles.formControl} onSubmit={this.handleSubmit}>
          <div className={styles.wrapper}>
            <InputNumber
              className={styles.inputNumber}
              label={"Number"}
              name={"number"}
              handleChange={this.handleOnChange}
              defaultValue={this.state.form.number}
            />
            <InputNumber
              className={styles.inputNumber}
              label={"Positive Number"}
              name={"numberPositive"}
              handleChange={this.handleOnChange}
              onlyPositive={true}
              defaultValue={this.state.form.numberPositive}
            />
            <InputText
              className={styles.inputText}
              label={"Text"}
              name={"text"}
              handleChange={this.handleOnChange}
              defaultValue={this.state.form.text}
            />
            <InputTextArea
              className={styles.inputText}
              label={"Description"}
              name={"description"}
              handleChange={this.handleOnChange}
              defaultValue={this.state.form.description}
            />
            <InputPhone
              className={styles.inputText}
              label={"Phone"}
              name={"phone"}
              handleChange={this.handleOnChange}
              defaultValue={this.state.form.phone}
            />
            <InputEmail
              className={styles.inputText}
              label={"Email"}
              name={"email"}
              handleChange={this.handleOnChange}
              defaultValue={this.state.form.email}
            />
            <InputPassword
              className={styles.inputText}
              label={"Password"}
              name={"password"}
              handleChange={this.handleOnChange}
              defaultValue={this.state.form.password}
            />
            <InputPassword
              className={styles.inputText}
              label={"Password confirmation"}
              name={"passwordConfirmation"}
              handleChange={this.handleOnChange}
              defaultValue={this.state.form.passwordConfirmation}
            />
            <InputDate
              className={styles.inputDate}
              label={"Date"}
              name={"date"}
              handleChange={this.handleOnChange}
              defaultValue={this.state.form.date}
            />
            <Select
              className={styles.inputDate}
              label={"Select"}
              name={"selected"}
              options={SELECT_VALUES}
              handleChange={this.handleOnChange}
            />
            <SelectAutocomplete
              className={styles.inputAutocomplete}
              label={"Select Autocomplete"}
              name={"selectedAutocomplete"}
              value={SELECT_VALUES}
              handleChange={this.handleOnChange}
            />
            <InputRadio
              className={styles.inputAutocomplete}
              label={"Radio on/off"}
              name={"radioOnOff"}
              handleChange={this.handleOnSelect}
              isChecked={this.state.form.radioOnOff}
            />
            <InputRadio
              className={styles.inputAutocomplete}
              label={"Radio"}
              name={"radio1"}
              handleChange={this.handleOnSelectRadioOption}
              value={"Radio oprion 1"}
              isChecked={this.state.form.radio1}
            />
            <InputRadio
              className={styles.inputAutocomplete}
              name={"radio2"}
              handleChange={this.handleOnSelectRadioOption}
              value={"Radio option 2"}
              isChecked={!this.state.form.radio1}
            />
            <InputCheckbox
              className={styles.inputAutocomplete}
              label={"Checkbox"}
              name={"checkbox"}
              handleChange={this.handleOnSelect}
              value={"Checkbox legend"}
            />
          </div>
          <div className={styles.btnWrapper}>
            <Button
              path={'/'}
              placeholder={'Homepage'}
              isSecondary={true}
            />
            <Button
              placeholder={'Submit'}
              isSubmit={true}
              isPrimary={true}
            />
          </div>
        </form>
        {!this.state.isReady ? null : (
          <div className={styles.submitedData}>{JSON.stringify(this.state.form)}</div>
        )}
      </div>
    )
  }
};

export default HtmlComponents;