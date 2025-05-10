import { useNavigate } from 'react-router-dom';
import Button from "./button/button";

type Props = {
  className?: string;
}

const PreviousPageButton = (props: Props) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // This navigates back one step in the history
  };

  return (
    <Button
      className={props.className}
      placeholder={"Voltar"}
      onClick={handleGoBack}
      isSecondary={true}
    />
  );

}

export default PreviousPageButton;