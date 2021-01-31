import React, { Component } from "react";
import { connect } from "react-redux";
import PageTop from "../utils/page_top";
import {
  getProductDetails,
  clearProductDetails,
} from "../../actions/products_actions";
import ProdNfo from './prodNfo';
import ProdImg from './prodImg';
import { addToCart } from '../../actions/user_actions';



class Product extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;

    this.props.dispatch(getProductDetails(id))
      .then(response => {
        if(
          !this.props.products.productDetails || 
          !this.props.products.productDetails.product
        ){
          this.props.history.push('/');
        }
      });
  }

  componentWillUnmount(){
    this.props.dispatch(clearProductDetails());
  }

  addToCartHandler = id => {
    this.props.dispatch(addToCart(id));
  }

  render() {
    const productDetails = this.props.products.productDetails;

    return (
      <div>
        <PageTop title="Product details" />
        <div className="container">
          {
             productDetails && productDetails.product ? 
              <div className="product_detail_wrapper">
                <div className="left">
                  <div style={{
                    width: '500px'
                  }}>
                    <ProdImg
                      detail={this.props.products.productDetails.product}
                    />
                  </div>
                </div>
                <div className="right">
                  <ProdNfo 
                    addToCart={(id) => this.addToCartHandler(id)}
                    detail={this.props.products.productDetails.product} 
                    />
                </div>
              </div>
            : 'Loading'
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { products: state.products };
};

export default connect(mapStateToProps)(Product);
