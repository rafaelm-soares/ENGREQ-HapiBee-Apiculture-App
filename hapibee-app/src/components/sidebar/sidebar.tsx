import { Component } from 'react';
import styles from './sidebar.module.css';
import { ReactComponent as AccountIcon } from 'src/icons/account.svg';
import { ReactComponent as LogoutIcon } from 'src/icons/logout.svg';
import { ReactComponent as ApiaryIcon } from 'src/icons/hapibee_apiary.svg';
import { ReactComponent as HapiBeeIcon } from 'src/icons/hapibee.svg';
import { ReactComponent as FieldBookIcon } from 'src/icons/hapibee_fieldBook.svg';
import { ReactComponent as HiveIcon } from 'src/icons/hapibee_hive.svg';
import { ReactComponent as TransferIcon } from 'src/icons/hapibee_transfer.svg';
// import { ReactComponent as HomeIcon } from 'src/icons/home.svg';
import { ReactComponent as SplitIcon } from 'src/icons/split.svg';
import { ReactComponent as InspectIcon } from 'src/icons/inspect.svg';
import { ReactComponent as Declarations } from 'src/icons/hapibee_declaration.svg';
import SidebarDesktop from './sidebarDesktop/sidebarDesktop';
import { debounce } from 'lodash';
import SidebarMobile from './sidebarMobile/sidebarMobile';

export interface Navlink {
  name: string,
  icon: string | JSX.Element,
  path: string,
};

const NAVLINKS = [
  /* {
    name: "Página Principal",
    icon: <HomeIcon className={styles.logo} />,
    path: "/",
  }, */
  {
    name: "Apiário",
    icon: <ApiaryIcon className={styles.logo} />,
    path: "/apiario",
  },
  {
    name: "Colmeias",
    icon: <HiveIcon className={styles.logo} />,
    path: "/colmeias",
  },
  {
    name: "Caderno de campo",
    icon: <FieldBookIcon className={styles.logo} />,
    path: "/caderno-de-campo",
  },
  {
    name: "Inspeções",
    icon: <InspectIcon className={styles.lineLogo} />,
    path: "/caderno-de-campo/inspecoes",
  },
  {
    name: "Transumância",
    icon: <TransferIcon className={styles.logo} />,
    path: "/caderno-de-campo/transumancias",
  },
  {
    name: "Cresta",
    icon: <HapiBeeIcon className={styles.logo} />,
    path: "/caderno-de-campo/cresta",
  },
  {
    name: "Desdobramento",
    icon: <SplitIcon className={styles.logo} />,
    path: "/caderno-de-campo/desdobramento",
  },
  {
    name: "Declarações",
    icon: <Declarations className={styles.logo} />,
    path: "/declaracoes",
  },
];

const NAVLINKS_FOOTER = [
  {
    name: "Conta",
    icon: <AccountIcon className={styles.logo} />,
    path: "/my-account",
  },
  {
    name: "Autenticação",
    icon: <LogoutIcon className={styles.logo} />,
    path: "/sign-in",
  },
];

type Props = {};

type State = {
  isMobile: boolean;
};

class Sidebar extends Component<Props, State> {
  private checkIsMobileDebounced: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      isMobile: this.isMobile(),
    };
    this.checkIsMobileDebounced = debounce(() => {
      this.setState({ isMobile: this.isMobile() });
    }, 100);
  };

  componentDidMount(): void {
    window.addEventListener('resize', this.checkIsMobileDebounced);
  };

  componentWillUnmount() {
    // remove the event handler for normal unmounting
    window.removeEventListener('resize', this.checkIsMobileDebounced);
  };

  isMobile(): boolean {
    return window.innerWidth <= 769
  };

  render() {
    if (this.state.isMobile) {
      return (
        <SidebarMobile className={styles.mobile} navlinks={NAVLINKS} navlinksFooter={NAVLINKS_FOOTER} />
      )
    } else {
      return (
        <SidebarDesktop myClassName={styles.desktop} navlinks={NAVLINKS} navlinksFooter={NAVLINKS_FOOTER} />
      )
    }
  }
}

export default Sidebar;