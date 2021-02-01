import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCartItems } from '../../actions/user_actions';
import UserLayout from '../../hoc/user';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faFrown from '@fortawesome/fontawesome-free-solid/faFrown';
import faSmile from '@fortawesome/fontawesome-free-solid/faSmile';


class UserCart extends Component {
  state = {
    loading: true,
    total: 0,
    showTotal: false,
    showSuccess: false
  }

  componentDidMount(){
    let cartItems = [];
    let user = this.props.user;

    if(user.userData.cart && user.userData.cart.length){
      user.userData.cart.forEach(item => {
        cartItems.push(item.id);
      });

      this.props
        .dispatch(getCartItems(cartItems, user.userData.cart))
        .then(() => {
          this.setState({loading: false});
        })

    } else {
      this.setState({
        loading: false,
        showTotal: false,
        showSuccess: false
      });
    }
  }

  render() {
    return (
      <UserLayout>
        <div>
          cart
        </div>
      </UserLayout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(UserCart);