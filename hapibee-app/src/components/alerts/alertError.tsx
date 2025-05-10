import { Component } from "react";
import styles from './basicConfigs.module.css';

type OwnProps = {
  title: string;
  body: string;
};

type Props = OwnProps;

class BasicConfigs extends Component<Props> {
  // https://docs.sentry.io/platforms/react-native/

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.alert}>
          <h5 className={styles.librariesHeader}>{this.props.title}</h5>
          <div>{this.props.body}</div>
        </div>
      </div>
    )
  }
}

export default BasicConfigs;