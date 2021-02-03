import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCartItems } from '../../actions/user_actions';
import UserLayout from '../../hoc/user';
import UserProductBlock from '../utils/User/product_block';
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
          if(this.props.user.cartDetails.length){
           this.calculateTotal(this.props.user.cartDetails);
          }
        })

    } else {
      this.setState({
        loading: false,
        showTotal: false,
        showSuccess: false
      });
    }
  }

  calculateTotal = cartDetails => {
    let total = 0;

    cartDetails.forEach(item => {
      total += (parseInt(item.price,10) * parseInt(item.quantity,10))
    });

    this.setState({
      total, 
      showTotal: true
    })
  }

  removeFromCart = id => {
    console.log(`Remove ${id}`);
  }

  showNoItemMessage = () => (
    <div className="cart_no_items">
      <FontAwesomeIcon icon={faFrown} />
      <div>
        You have no items
      </div>
    </div>
  )

  render() {
    return (
      <UserLayout>
        <div>
          <h1>My cart</h1>
          <div className="user_cart">
            <UserProductBlock
              products={this.props.user}
              type="cart"
              removeItem={id => this.removeFromCart(id)}
            />
            { this.state.showTotal ?
              <div>
                <div className="user_cart_sum">
                  <div>
                    Total amount: $ {this.state.total}
                  </div>
                </div>
              </div>
            : 
              this.state.showSuccess ? 
                <div className="cart_success">
                  <FontAwesomeIcon icon={faSmile} />
                  <div>
                    THANK YOU !
                  </div>
                  <div>
                    Your order is now complete
                  </div>
                </div>
              : this.showNoItemMessage()
            }
          </div>

          {
            this.state.showTotal ?
              <div className="paypal_button_container">
                Paypal
              </div>
            : null
          }

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