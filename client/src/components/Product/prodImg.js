import React, { Component } from 'react';

class ProdImg extends Component {
  state = {
    lightbox: false,
    imagePos: 0,
    lightboxImages: [

    ]
  }

  componentDidMount(){
    if(this.props.detail.images.length){
      let lightboxImages = [];

      this.props.detail.images.forEach(item => {
        lightboxImages.push(item.url);
      });

      this.setState({lightboxImages});
    }
  }

  handleLightBox = () => {

  }

  showThumbs = () => (
    this.state.lightboxImages.map((item,i) => (
      i > 0 ?
        <div
          key={i}
          onClick={() => this.handleLightBox(i)}
          className="thumb"
          style={{
            background: `url(${item}) no-repeat`
          }}
        >

        </div>
      : null
    ))
  )

  renderImageCardImage = images => {
    if(images.length){
      return images[0].url;
    }

    return `/images/image_not_available.png`;
  }

  render() {
    const {detail} = this.props;
    
    return (
      <div className="product_image_container">
          <div className="main_pic">
            <div 
              style={{
                background: `url(${this.renderImageCardImage(detail.images)}) no-repeat`
              }}
              onClick={() => this.handleLightBox()}
            ></div>
          </div>
          <div className="main_thumbs">
            { this.showThumbs() }
          </div>
      </div>
    );
  }
}

export default ProdImg;