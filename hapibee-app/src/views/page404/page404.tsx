import { Component } from "react";
import Button from "src/components/_nativeHTML/button/button";
import { ReactComponent as HapiBeeIcon } from 'src/icons/hapibee.svg';
import styles from "./page404.module.css";

class Page404 extends Component {
  render() {
    return (
      <div className={styles.container}>
        <HapiBeeIcon className={styles.logo} />
        <h1 className={styles.title}>Oh no!</h1>
        <p className={styles.text}>
          {"The page you're looking for can't be found."}
        </p>
        <Button
          className={styles.btn}
          path={"/"}
          placeholder={"Back to homepage"}
          isPrimary={true}
        />
      </div>
    );
  }
}

export default Page404;
