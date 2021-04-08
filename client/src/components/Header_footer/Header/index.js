import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { logoutUser } from '../../../actions/user_actions';
import SideDrawer from '../SideDrawer/SideDrawer';

import IconButton from '@material-ui/core/IconButton';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faBars from '@fortawesome/fontawesome-free-solid/faBars';

class Header extends Component {
  state = {
    page: [
      {
        name: 'Home',
        linkTo: '/',
        public: true,
      },
      {
        name: 'Guitars',
        linkTo: '/shop',
        public: true,
      },
    ],
    user: [
      {
        name: 'My Cart',
        linkTo: '/user/cart',
        public: false,
      },
      {
        name: 'My Account',
        linkTo: '/user/dashboard',
        public: false,
      },
      {
        name: 'Log In',
        linkTo: '/register_login',
        public: true,
      },
      {
        name: 'Log out',
        linkTo: '/user/logout',
        public: false,
      },
    ],
    drawerOpen: false,
  };

  toggleDrawer = (value) => {
    this.setState({
      drawerOpen: value,
    });
  };

  logOutHandler = () => {
    this.props.dispatch(logoutUser()).then((response) => {
      if (response.payload.success) {
        this.props.history.push('/');
      }
    });
  };

  defaultLink = (item, i) =>
    item.name === 'Log out' ? (
      <div
        className="log_out_link"
        key={i}
        onClick={() => this.logOutHandler()}
      >
        {item.name}
      </div>
    ) : (
      <Link to={item.linkTo} key={i}>
        {item.name}
      </Link>
    );

  cartLink = (item, i) => {
    const user = this.props.user.userData;

    return (
      <div className="cart_link" key={i}>
        <Link to={item.linkTo} style={{ position: 'relative' }}>
          <span>{user.cart ? user.cart.length : 0}</span>
          {item.name}
        </Link>
      </div>
    );
  };

  showLinks = (linksList) => {
    let list = [];

    if (this.props.user.userData) {
      linksList.forEach((item) => {
        if (!this.props.user.userData.isAuth) {
          if (item.public === true) {
            list.push(item);
          }
        } else {
          if (item.name !== 'Log In') {
            list.push(item);
          }
        }
      });
    }

    return list.map((item, i) => {
      if (item.name !== 'My Cart') {
        return this.defaultLink(item, i);
      } else {
        return this.cartLink(item, i);
      }
    });
  };

  render() {
    return (
      <header className="bck_b_light">
        <div className="container menu-container">
          <div className="left logo-wrapper">
            <div className="logo">
              <Link to="/" style={{ margin: 0 }}>
                DevGUITARS
              </Link>
            </div>
          </div>
          <div className="right">
            <div className="top">{this.showLinks(this.state.user)}</div>
            <div className="bottom">{this.showLinks(this.state.page)}</div>
            <div className="side_drawer_wrapper">
              <IconButton
                aria-label="Menu"
                color="inherit"
                onClick={() => this.toggleDrawer(true)}
                className="side_drawer_btn"
              >
                <FontAwesomeIcon icon={faBars} />
              </IconButton>

              <SideDrawer
                open={this.state.drawerOpen}
                onClose={(value) => this.toggleDrawer(value)}
                showLinksUser={() => this.showLinks(this.state.user)}
                showLinksPage={() => this.showLinks(this.state.page)}
              />
            </div>
          </div>
        </div>
      </header>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(withRouter(Header));
