import React, { Component } from 'react';
import Slider from "react-slick";

class SlideImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
          nav1: null,
          nav2: null,
        };
      }
    componentDidMount() {
        this.setState({
          nav1: this.slider1,
          nav2: this.slider2
        });
      }
    
    render() {

      var urls = this.props.urls;
      const mapImg = urls.map((value,key)=>{
        const imgurl  = process.env.REACT_APP_SERVER_URL + "/file/" + value;
        if(value){
          return ( <div key={key} >
             <img  style={{width: "100%"}} src={imgurl} alt="Ảnh sản phẩm" />
            </div>
          )}else{
            return null;
          }
      })


      const mapImgItem = urls.map((value,key)=>{
        if(value){
          const imgurl  = process.env.REACT_APP_SERVER_URL + "/file/" + value;
          return(
            <div key={key} className='navSliderItem'>
              <img style={{width: "100%"}} src={imgurl} alt="Ảnh sản phẩm" />
            </div>
          )
        }else{return null;}
      })
        return (
            <div>
            <Slider arrows={false}
              asNavFor={this.state.nav2}
              ref={slider => (this.slider1 = slider)}
            >
            {mapImg}
            </Slider>
            
            <Slider className='navslider'
              asNavFor={this.state.nav1}
              ref={slider => (this.slider2 = slider)}
              slidesToShow={urls.length}
              swipeToSlide={true}
              focusOnSelect={true}
              infinite={false}
            >
              {mapImgItem}
            </Slider>
          </div>
        );
    }
}

export default SlideImage;