import classnames from 'classnames';
import { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import styles from './sidebarDesktop.module.css';
import { Navlink } from 'src/components/sidebar/sidebar';
import { sidebarDesktopOpenClose } from 'src/redux/actions/action-frontend';
import { INITIAL_STATE } from 'src/redux/reducer/initial-state';
import { ReactComponent as MenuIcon } from 'src/icons/menu.svg';
import { ReactComponent as MenuExpandedIcon } from 'src/icons/menuExpanded.svg';

type OwnProps = {
  myClassName?: string;
  navlinks: Navlink[];
  navlinksFooter?: Navlink[];
  isMobileMaximized?: boolean;
}

type Props = OwnProps
  & ReturnType<typeof mapStateToProps>
  & ReturnType<typeof mapDispatchToProps>;

type State = {
  isSidebarOpen: boolean;
  isActive: boolean;
};

class SidebarDesktop extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isSidebarOpen: this.props.isSidebarDesktopOpen,
      isActive: false,
    };
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>): void {
    if (prevState.isSidebarOpen !== this.state.isSidebarOpen) {
      this.props.sidebarDesktopOpenClose(this.state.isSidebarOpen);
    }
  }

  //MISSING: format open to align left and show label
  handleOpenSidebar = (): void => {
    this.setState({ isSidebarOpen: !this.state.isSidebarOpen });
  };

  render() {
    return (
      <div
        className={classnames(
          this.props.myClassName,
          !this.props.isMobileMaximized && styles.sidebarDesktop,
          this.props.isMobileMaximized && styles.mobileMaximized,
          this.state.isSidebarOpen ? styles.sidebarDesktopOpened : styles.sidebarDesktopClosed
        )}
      >
        <div className={styles.sidebarHeader}>
          <div className={styles.openCloseBtn} onClick={this.handleOpenSidebar} >
            {this.state.isSidebarOpen ? (
              <MenuExpandedIcon className={styles.iconExpanded} />
            ) : (
              <MenuIcon className={styles.icon} />
            )}
          </div>
        </div>
        <div className={styles.sidebarLinks}>
          {this.props.navlinks.map((view, index) => (
            <NavLink to={view.path} key={index}
              className={({ isActive }) => (isActive ? classnames(styles.active, styles.navLink) : styles.navLink)}
            >
              <span className={styles.icon}>{view.icon}</span>
              <label className={styles.label}>{view.name}</label>
            </NavLink >
          ))}
        </div>
        <div className={styles.sidebarLinks}>
          {this.props.navlinksFooter?.map((view, index) => (
            <NavLink to={view.path} key={index}
              className={({ isActive }) => (isActive ? classnames(styles.active, styles.navLink) : styles.navLink)}
            >
              <span className={styles.icon}>{view.icon}</span>
              <label className={styles.label}>{view.name}</label>
            </NavLink >
          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: typeof INITIAL_STATE) => {
  return {
    isSidebarDesktopOpen: state.settings.isSidebarDesktopOpen,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    sidebarDesktopOpenClose: (isSidebarDesktopOpen: boolean) => {
      dispatch(sidebarDesktopOpenClose(isSidebarDesktopOpen));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SidebarDesktop);