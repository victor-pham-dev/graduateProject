import React from 'react';
import { Card, Badge, } from 'antd';
import './EditProductCard.css'
import { EditOutlined,DeleteOutlined  } from '@ant-design/icons';
const { Meta } = Card;


function ProductCard(props) {
    const data = props.data;
    const cardkey = props.cardkey;
    const cardimg = process.env.REACT_APP_SERVER_URL + "/file/"+ data.cardimg;

    return (
       
        <Badge.Ribbon text={data.status} color="red">
        
            <Card
                hoverable
                style={{ maxWidth: 280,opacity: 0.9 }}
                cover={
                <img
                    style={{width: "100%"}}
                    alt={data.name}
                    src={cardimg}
                />
                }
                actions={[
                    
                    <DeleteOutlined key="delete" onClick={()=>props.deleteItem(cardkey)} />
                    ,
                
                    <EditOutlined key="edit" onClick={()=>props.changeItem(cardkey)} />
                  
                    
                ]}
            >
                <Meta
                title={data.name}
                />
                <h4 style={{color: "red"}}>{data.pricerange}</h4>
            </Card>
       
        </Badge.Ribbon>
       
    );
}

export default ProductCard;