import { Component, createContext } from "react";
import { connect } from "react-redux";
import { INITIAL_STATE } from "src/redux/reducer/initial-state";
import { getCookie } from "src/redux/contexts/cookies";

interface AuthContextInterface {
  isAuthenticated: boolean;
};

export const AuthContext = createContext<AuthContextInterface>({
  isAuthenticated: false,
});

type OwnProps = { children: JSX.Element };

type Props = OwnProps & ReturnType<typeof mapStateToProps>;

type State = AuthContextInterface;

class AuthProvider extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isAuthenticated: getCookie("hapibee") !== "" ? true : false,
    };
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (prevProps.user !== this.props.user) {
      this.setState({
        isAuthenticated: getCookie("hapibee") !== "" ? true : false,
      });
    }
  }

  render() {
    return (
      <AuthContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

const mapStateToProps = (state: typeof INITIAL_STATE) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(AuthProvider);
