import React, { Component } from 'react';
import { connect } from 'react-redux';

import { INITIAL_STATE } from 'src/redux/reducer/initial-state';
import Button from 'src/components/_nativeHTML/button/button';
import InputEmail from 'src/components/_nativeHTML/inputs/inputEmail';
import InputPassword from 'src/components/_nativeHTML/inputs/inputPassword';
import PageTitle from 'src/components/pageTitle/pageTitle';
import InputText from 'src/components/_nativeHTML/inputs/inputText';
import { NewUser } from 'src/model/myTypes';
import { signUp } from 'src/redux/actions/action-user';

import styles from './signUpForm.module.css';
import InputNumber from 'src/components/_nativeHTML/inputs/inputNumber';


type Props = ReturnType<typeof mapStateToProps>
  & ReturnType<typeof mapDispatchToProps>;

type State = {
  form: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
    postalNumber: string;
    postal: string;
    officialBeekeeperID?: string;
    nif?: number;
  };
  isValid: boolean;
};

class SignUpForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      form: {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        address: '',
        postalNumber: '',
        postal: '',
        officialBeekeeperID: '',
        nif: undefined,
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
    if (this.state.form.firstName === '' || this.state.form.lastName === '' ||
      this.state.form.email === '' || this.state.form.password === '' ||
      this.state.form.phoneNumber === '') {
      isValid = false;
    }
    this.setState({ isValid: isValid });
  };

  handleOnChange = (name: string, newValue: string) => {
    name = name as keyof State['form'];
    this.setState({
      form: {
        ...this.state.form,
        [name]: newValue,
      },
    });
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //console.log(this.state.form);
    this.props.signUp(this.state.form);
  };

  render() {
    return (
      <div className={styles.formWrapper}>
        <PageTitle
          title='Registo no HapiBee'
        />
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <div className={styles.identification}>
            <InputText
              label={'Nome*'}
              name={'firstName'}
              defaultValue={this.state.form.firstName}
              handleChange={this.handleOnChange}
            />
            <InputText
              label={'Apelido*'}
              name={'lastName'}
              defaultValue={this.state.form.lastName}
              handleChange={this.handleOnChange}
            />
            <InputText
              label={'Telefone/Telemóvel*'}
              name={'phoneNumber'}
              defaultValue={this.state.form.phoneNumber}
              handleChange={this.handleOnChange}
            />
          </div>
          <InputText
            label={'Morada'}
            name={'address'}
            defaultValue={this.state.form.address}
            handleChange={this.handleOnChange}
          />
          <div className={styles.postal}>
            <InputText
              label={'Código postal'}
              name={'postalNumber'}
              defaultValue={this.state.form.postalNumber}
              handleChange={this.handleOnChange}
            />
            <InputText
              name={'postal'}
              defaultValue={this.state.form.postal}
              handleChange={this.handleOnChange}
            />
          </div>
          <div className={styles.beekeeper}>
            <InputText
              label={'ID de apicultor'}
              name={'officialBeekeeperID'}
              defaultValue={this.state.form.officialBeekeeperID}
              handleChange={this.handleOnChange}
            />
            <InputNumber
              label={'NIF'}
              name={'nif'}
              defaultValue={this.state.form.nif}
              handleChange={this.handleOnChange}
            />
          </div>
          <div className={styles.credentials}>
            <InputEmail
              label={'Email*'}
              name={'email'}
              defaultValue={this.state.form.email}
              handleChange={this.handleOnChange}
            />
            <InputPassword
              label={'Password*'}
              name={'password'}
              defaultValue={this.state.form.password}
              handleChange={this.handleOnChange}
            />
          </div>
          <Button
            className={styles.submitBtn}
            name={'signUpSubmit'}
            placeholder={'Registar'}
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
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    signUp: (user: NewUser) =>
      dispatch(signUp(user)),
  };
};

export default (connect(mapStateToProps, mapDispatchToProps)(SignUpForm));
