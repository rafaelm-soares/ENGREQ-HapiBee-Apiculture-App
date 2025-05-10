import { connect } from "react-redux";
import { INITIAL_STATE } from "src/redux/reducer/initial-state";
import { Cresta } from "src/model/myTypes";
// import { ReactComponent as ApiaryIcon } from 'src/icons/hapibee_apiary.svg';
import styles from "./crestCardList.module.css";
import { useNavigate } from "react-router-dom";

type OwnProps = {
  list: Cresta[];
};

type Props = OwnProps &
  ReturnType<typeof mapStateToProps>;

const CrestCardList = (props: Props) =>{
  // Create a history object using the useHistory hook
  const navigate = useNavigate();

  const handleCardClick = (item: Cresta) => {
    console.log("clicked ", item.id)
    // Navigate to the new route with the clicked item's ID
    navigate(`/caderno-de-campo/atualizar-cresta/${item.id}`);
  };
  
    return (
      <div className={styles.list}>
        {props.list.map((item, index) => {
          if (typeof item.id != "undefined") {
            return (
              <div className={styles.card} key={index} onClick={() => handleCardClick(item)}>
                {/* <div className={styles.left}>
                  <ApiaryIcon className={styles.icon} />
                </div> */}
                <div className={styles.right}>
                  <div className={styles.title}>
                    <span>Identificação: {item.id}</span>
                  </div>
                  <div className={styles.info}>
                    <span className={styles.infoTitle}>ID do apiário: </span>
                    <span>{item.apiaryID}</span>
                  </div>
                  <div className={styles.info}>
                    <span className={styles.infoTitle}>ID da colmeia: </span>
                    <span>{item.hiveID}</span>
                  </div>
                  <div className={styles.info}>
                    <span className={styles.infoTitle}>Data: </span>
                    <span>{item.CrestaDate}</span>
                  </div>
                  <div className={styles.info}>
                    <span className={styles.infoTitle}>Número de alças: </span>
                    <span>{item.nrOfBoards}</span>
                  </div>
                  <div className={styles.info}>
                    <span className={styles.infoTitle}>Produto: </span>
                    <span>{item.ProductType}</span>
                  </div>
                  <div className={styles.info}>
                    <span className={styles.infoTitle}>Quantidade: </span>
                    <span>{item.quantity} {item.quantityType}</span>
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
    crests: state.fieldBook.crestas,
  };
};

export default connect(mapStateToProps)(CrestCardList);
