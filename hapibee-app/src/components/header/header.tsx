import Button from 'src/components/_nativeHTML/button/button';
import styles from './header.module.css';

export default function Header() {
  return (
    <header className={styles.appHeader}>
      <Button
        className={styles.btn}
        placeholder={"HAPIBEE"}
        path={'/'}
      />
      <Button
        className={styles.btnOffline}
        placeholder={"Inicio"}
        path={'/apiario'}
      />
    </header>
  )
}
