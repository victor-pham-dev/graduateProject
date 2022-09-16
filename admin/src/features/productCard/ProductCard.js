import React from 'react';
import { Card, Badge,Col } from 'antd';
import './ProductCard.css'
import { Link } from 'react-router-dom';
import { EditOutlined, EyeOutlined } from '@ant-design/icons';
const { Meta } = Card;

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

function ProductCard(props) {
    const data = props.data;
    const removedUrl = removeMarkUrl(data.name);
    const cardimg = process.env.REACT_APP_SERVER_URL + "/file/"+ data.cardimg;

    return (
        <Col xl={{span:6}} lg={{span:6}}>
        <Badge.Ribbon text={data.status} color="red">
        
            <Card
                hoverable
                style={{ width: "100%",opacity: 0.9 }}
                cover={
                <img
                    style={{maxHeight: 234}}
                    alt={data.name}
                    src={cardimg}
                />
                }
                actions={[
                    <Link to={"/chi-tiet-san-pham/"+removedUrl+"/"+data._id }>
                        <EyeOutlined key="view" />
                    </Link>,
                    <Link to={"/edit-san-pham/"+removedUrl+"/"+data._id }>
                        <EditOutlined key="edit" />
                    </Link>
                  
                    
                ]}
            >
                <Meta
                title={data.name}
                />
                <h4 style={{color: "red"}}>{data.pricerange}</h4>
                <span style={{color: "red"}}>{data.sold} đã bán</span>
            </Card>
       
        </Badge.Ribbon>
        </Col>
    );
}

export default ProductCard;