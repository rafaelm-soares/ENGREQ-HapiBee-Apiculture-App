import classNames from 'classnames';
import styles from './pageTitle.module.css';

type OwnProps = {
  title: string;
  className?: string;
}

export default function PageTitle(props: OwnProps) {
  return (
    <h2 className={classNames(props.className, styles.title)}>
      {props.title}
    </h2>
  )
}