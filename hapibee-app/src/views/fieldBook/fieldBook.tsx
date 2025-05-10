import { Component } from "react";
import Button from "src/components/_nativeHTML/button/button";
import PageTitle from "src/components/pageTitle/pageTitle";
import styles from "./fieldBook.module.css";


class FieldBook extends Component {

  render() {
    return (
      <div className={styles.container}>
        <PageTitle
          title={"Caderno de campo"}
        />
        <div className={styles.btnContainer}>
          <Button
            className={styles.btn}
            placeholder={"Inspeções"}
            path={"/caderno-de-campo/inspecoes"}
          />
          <Button
            className={styles.btn}
            placeholder={"Transumância"}
            path={"/caderno-de-campo/transumancias"}
          />
          <Button
            className={styles.btn}
            placeholder={"Cresta"}
            path={"/caderno-de-campo/cresta"}
          />
          <Button
            className={styles.btn}
            placeholder={"Desdobramentos"}
            path={"/caderno-de-campo/desdobramento"}
          />
        </div>
      </div>
    )
  }
}

export default (FieldBook);
