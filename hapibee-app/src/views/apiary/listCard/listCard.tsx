import { connect } from "react-redux";
import { INITIAL_STATE } from "src/redux/reducer/initial-state";
import { Apiary } from "src/model/myTypes";
import { ReactComponent as ApiaryIcon } from 'src/icons/hapibee_apiary.svg';
import { ReactComponent as PendingIcon } from 'src/icons/statePending.svg';
import { ReactComponent as DeniedIcon } from 'src/icons/stateDenied.svg';
import { useNavigate } from "react-router-dom";
import styles from "./listCard.module.css";

type OwnProps = {
  list: Apiary[];
};

type Props = OwnProps &
  ReturnType<typeof mapStateToProps>;

const ApiaryCardList = (props: Props) => {
  // Create a history object using the useHistory hook
  const navigate = useNavigate();

  const handleCardClick = (item: Apiary) => {
    console.log("clicked ", item.id)
    // Navigate to the new route with the clicked item's ID
    navigate(`/apiario/atualizar-apiario/${item.id}`);
  };

  return (
    <div className={styles.list}>
      {props.list.map((item, index) => {
        if (typeof item.id != "undefined") {
          return (
            <div className={styles.card} key={index} onClick={() => handleCardClick(item)}>
              <div className={styles.left}>
                {item.isApproved === "APPROVED" ? (
                  <ApiaryIcon className={styles.icon} />
                ) : item.isApproved === "PENDING" ? (
                  <PendingIcon className={styles.iconPending} />
                ) : (
                  <DeniedIcon className={styles.iconDenied} />
                )}
              </div>
              <div className={styles.right}>
                <div className={styles.title}>
                  <span>{!item.name ? "ID" + item.id : item.name}</span>
                </div>
                <div className={styles.info}>
                  <span className={styles.infoTitle}>ID: </span>
                  <span>{item.id}</span>
                </div>
                <div className={styles.info}>
                  <span className={styles.infoTitle}>Número de colmeias: </span>
                  <span>{item.numberOfHives}</span>
                </div>
                <div className={styles.info}>
                  <span className={styles.infoTitle}>Objetivo da produção: </span>
                  <span>{item.productionGoal}</span>
                </div>
                <div className={styles.info}>
                  <span className={styles.infoTitle}>Tipo de produção: </span>
                  <span>{item.productionType}</span>
                </div>
                <div className={styles.info}>
                  <span className={styles.infoTitle}>Localização: </span>
                  <span>{item.location.place}, {item.location.municipality}, {item.location.parish}</span>
                </div>
                <div className={styles.info}>
                  <span className={styles.infoTitle}>Estado: </span>
                  <span>{item.isApproved}</span>
                </div>
              </div>
            </div>
          )
        } else {
          return null;
        }
      })}
    </div>
  )
}

const mapStateToProps = (state: typeof INITIAL_STATE) => {
  return {
    apiaries: state.apiaries.apiaries,
  };
};

export default connect(mapStateToProps)(ApiaryCardList);
