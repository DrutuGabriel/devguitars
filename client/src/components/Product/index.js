import React, { Component } from "react";
import { connect } from "react-redux";
import PageTop from "../utils/page_top";
import {
  getProductDetails,
  clearProductDetails,
} from "../../actions/products_actions";
import ProdNfo from './prodNfo';

class Product extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;

    this.props.dispatch(getProductDetails(id));
  }

  componentWillUnmount(){
    this.props.dispatch(clearProductDetails());
  }

  addToCartHandler = id => {
    
  }

  render() {
    return (
      <div>
        <PageTop title="Product details" />
        <div className="container">
          {
            this.props.products.productDetails ? 
              <div className="product_detail_wrapper">
                <div className="left">
                  Images
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
