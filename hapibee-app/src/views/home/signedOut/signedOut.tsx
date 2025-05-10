import { Component } from 'react';
import SignInForm from 'src/views/home/signInForm/signInForm';
import { ReactComponent as HapiBeeIcon } from 'src/icons/hapibee.svg';
import styles from './signedOut.module.css';

class HomeSignedOut extends Component {
  render() {
    return (
      <section className={styles.homeSignedOut}>
        <HapiBeeIcon className={styles.logo} />
        <SignInForm />
      </section>
    )
  }
};

export default HomeSignedOut;