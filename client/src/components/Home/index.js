import React, { Component } from 'react';
import {connect} from 'react-redux';
import {
  getProductsBySell, 
  getProductsByArrival 
} from '../../actions/products_actions';

import HomeSlider from './home_slider';
import HomePromotion from './home_promotion';
import CardBlock from '../utils/card_block';


class Home extends Component {

  componentDidMount(){
    this.props.dispatch(getProductsBySell());
    this.props.dispatch(getProductsByArrival());
  }

  render() {
    return (
      <div>
        <HomeSlider />
        <CardBlock 
          title="Best Selling guitars" 
          list={this.props.products.bySell} 
        />
        <HomePromotion />
        <CardBlock 
          title="New Arrivals" 
          list={this.props.products.byArrival} 
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products
  };
}


export default connect(mapStateToProps)(Home);