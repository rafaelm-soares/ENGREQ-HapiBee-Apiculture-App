import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from 'src/components/header/header';
import Sidebar from 'src/components/sidebar/sidebar';
import { INITIAL_STATE } from 'src/redux/reducer/initial-state';
import { connect } from 'react-redux';

type Props = ReturnType<typeof mapStateToProps>;

function LayoutAuthenticated(props: Props) {
  return (
    <React.Fragment>
      <Sidebar />
      <div className={`main authenticated ${props.isSidebarDesktopOpen ? 'sidebarDesktopOpen' : ''}`}>
        <Header />
        <Outlet />
      </div>
    </React.Fragment>
  )
};

const mapStateToProps = (state: typeof INITIAL_STATE) => {
  return {
    isSidebarDesktopOpen: state.settings.isSidebarDesktopOpen,
  };
};

export default connect(mapStateToProps)(LayoutAuthenticated);
