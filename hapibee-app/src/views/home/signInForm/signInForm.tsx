import React, { Component } from 'react';
import { connect } from 'react-redux';

import { INITIAL_STATE } from 'src/redux/reducer/initial-state';
import Button from 'src/components/_nativeHTML/button/button';
import InputEmail from 'src/components/_nativeHTML/inputs/inputEmail';
import InputPassword from 'src/components/_nativeHTML/inputs/inputPassword';
import { AuthContext } from 'src/redux/contexts/authContext';
import { login } from 'src/redux/actions/action-user';
import PageTitle from 'src/components/pageTitle/pageTitle';

import styles from './signInForm.module.css';


type Props = ReturnType<typeof mapStateToProps>
  & ReturnType<typeof mapDispatchToProps>;

type State = {
  form: {
    email: string;
    password: string;
  };
  isValid: boolean;
};

class SignInForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      form: {
        email: '',
        password: '',
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
    this.props.login(this.state.form.email, this.state.form.password);
  };

  render() {
    return (
      <AuthContext.Consumer>
        {(authContext) => {
          //const { isAuthenticated } = authContext;

          return /* !isAuthenticated ? */ (
            <div className={styles.formWrapper}>
              <PageTitle
                title='Welcome to HapiBee'
              />
              <form className={styles.form} onSubmit={this.handleSubmit}>
                <InputEmail
                  label={'Email'}
                  name={'email'}
                  defaultValue={this.state.form.email}
                  handleChange={this.handleOnChange}
                />
                <InputPassword
                  label={'Password'}
                  name={'password'}
                  defaultValue={this.state.form.password}
                  handleChange={this.handleOnChange}
                />
                <Button
                  className={styles.submitBtn}
                  name={'signInSubmit'}
                  placeholder={'Sign In'}
                  isPrimary={true}
                  isDisabled={!this.state.isValid}
                  isSubmit={true}
                />
                <p className={styles.signUpText}>
                  {"Don't have an account?"}
                  <Button
                    className={styles.link}
                    name={'signUp'}
                    placeholder={'Sign up'}
                    path={'/sign-up'}
                    isSecondary={true}
                  />
                </p>
              </form>
            </div>
          )
        }}
      </AuthContext.Consumer>
    );
  }
}

const mapStateToProps = (state: typeof INITIAL_STATE) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    login: (email: string, password: string) =>
      dispatch(login(email, password)),
  };
};

export default (connect(mapStateToProps, mapDispatchToProps)(SignInForm));
