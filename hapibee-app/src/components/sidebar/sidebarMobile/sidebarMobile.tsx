import classnames from 'classnames';
import { Component } from 'react';

import styles from './sidebarMobile.module.css';

import SidebarDesktop from 'src/components/sidebar/sidebarDesktop/sidebarDesktop';
import { Navlink } from 'src/components/sidebar/sidebar';
import { ReactComponent as MenuIcon } from 'src/icons/menu.svg';
import { NavLink } from 'react-router-dom';
import Button from 'src/components/_nativeHTML/button/button';


type OwnProps = {
  className: string;
  navlinks: Navlink[];
  navlinksFooter?: Navlink[];
};

type Props = OwnProps;

type State = {
  isOpenSidebar: boolean;
  isOpenModalAdd: boolean;
};

class SidebarMobile extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isOpenSidebar: false,
      isOpenModalAdd: false,
    };
  }

  handleOpenSidebar = () => {
    this.setState({ isOpenSidebar: !this.state.isOpenSidebar });
  };

  toggleModal = () => {
    this.setState({
      ...this.state,
      isOpenModalAdd: !this.state.isOpenModalAdd,
    });
  };

  toggleOpen = () => {
    this.setState({ isOpenSidebar: false });
  };

  renderMobileSidebarClosed() {
    const apiary = this.props.navlinks[0];
    const fieldBook = this.props.navlinks[2];
    const crest = this.props.navlinks[7];
    const newNavlinks = [apiary, fieldBook, crest];

    return (
      <div className={styles.sidebarMobile}>
        {newNavlinks.map((view, index) => (
          <NavLink to={view.path} key={index}
            className={({ isActive }) => (isActive ? classnames(styles.active, styles.navLink) : styles.navLink)}
          >
            <span className={styles.icon}>{view.icon}</span>
            <label className={styles.label}>{view.name}</label>
          </NavLink >
        ))}
        <div className={styles.openCloseBtn} onClick={this.handleOpenSidebar} >
          <MenuIcon className={styles.icon} />
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className={classnames(styles.sidebarMob, this.props.className)}>
        {this.state.isOpenSidebar && (
          <Button
            className={styles.optionsOpen}
            placeholder={"x"}
            onClick={this.toggleOpen}
          />
        )}
        {this.state.isOpenSidebar ? (
          <>
            <div className={styles.overlay}></div>
            <SidebarDesktop
              myClassName={styles.sidebarDesktopMobileView}
              navlinks={this.props.navlinks}
              isMobileMaximized={this.state.isOpenSidebar}
              navlinksFooter={this.props.navlinksFooter}
            />
          </>
        ) : (
          this.renderMobileSidebarClosed()
        )}
      </div>
    );
  }
}

export default SidebarMobile;
