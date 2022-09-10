import { Badge, Card, Col, Divider, Row } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const {Meta}=Card;
const removeMarkUrl = (str) => {
    str = str.toLowerCase();     
    str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
    str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
    str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
    str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
    str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
    str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
    str = str.replace(/(đ)/g, 'd');
    str = str.replace(/([^0-9a-z-\s])/g, '');
    str = str.replace(/(\s+)/g, '-');
    str = str.replace(/^-+/g, '');
    str = str.replace(/-+$/g, '');
    return str;
}

function SameProduct(props) {
    const [data,setData] = useState([])
    useEffect(()=>{
        const getData = async ()=>{
            const category = await props.category;
            const id = await props.id;
            const res = await axios.get(process.env.REACT_APP_SERVER_URL+"/product/same/"+category+"/"+id)
            if(res){
                setData(res.data)
            }
        }
        if(props.id){
            getData()
        }
       
    },[props.category,props.id])
    const map = data.map((value,key)=>{
       
        if(value){
            const imgurl = process.env.REACT_APP_SERVER_URL + "/file/" + value.cardimg;
            const removedUrl = removeMarkUrl(value.name);
            return(
                <Col key={key} span={24}>
                <Badge.Ribbon text={value.status} color="red">
                <Link to={"/chi-tiet-san-pham/"+removedUrl+"/"+value._id }>     
                    <Card
                        hoverable
                        style={{ width: "100%",opacity: 0.9 }}
                        cover={
                        <img
                            alt={value.name}
                            src={imgurl}
                        />
                        }
                    >
                        <Meta
                        title={value.name}
                        />
                        <h4 style={{color: "red"}}>{value.pricerange}</h4>
                    </Card>
                </Link>  
                </Badge.Ribbon>
                </Col>
            )
        }else{
            return null;
        }
    })
    
    
    return (
        <Row style={{padding: "5px"}} gutter={[10,10]}>
       
                <Divider orientation='left'>Có thể bạn cũng thích</Divider>
                {map}
         </Row>
    );
}

export default SameProduct;