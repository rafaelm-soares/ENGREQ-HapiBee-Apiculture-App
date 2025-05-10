import { Component } from "react";
import styles from "./loader.module.css";

type Props = {
  classname?: string;
};

class Loader extends Component<Props> {
  render() {
    return (
      <div className={styles.loader}></div>
    );
  }
}

export default Loader;