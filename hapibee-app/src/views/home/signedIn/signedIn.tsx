import PageTitle from 'src/components/pageTitle/pageTitle';
import { ReactComponent as HapiBeeIcon } from 'src/icons/hapibee.svg';
import styles from './signedIn.module.css';

export default function SignedIn() {
  return (
    <section className={styles.homeSignedIn}>
      <PageTitle
        title='Bem vindo ao HapiBee'
      />
      <HapiBeeIcon className={styles.logo} />
      {/* <div className={styles.bee}></div> */}
      <div className={styles.bug}>
        <div className={styles.bee1}>
          <div className={styles.eye}></div>
        </div>
        <div className={styles.bee2}>
          <div className={styles.wing}></div>
          <div className={styles.wing2}></div>
        </div>
        <div className={styles.black}></div>
      </div>
    </section>
  )
}