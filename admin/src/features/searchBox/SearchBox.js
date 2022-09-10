import { Col, Input, Row } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const {Search} = Input;
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
function SearchBox(props) {
    
    const [text,setText] = useState('')
    const [data,setData] = useState([])
    const onSearch = value=>{
        setText(value)
    }
    const onChange = e=>{
        setText(e.target.value)
    }

   const resetTextonClick = ()=>{
       setText('')
   }

    useEffect(()=>{
        if(text === ''){
            setData([])
        }
        const searching = async ()=>{
            if(text !== ''){
                const res = await axios.post(process.env.REACT_APP_SERVER_URL+"/product/search", {"text": text})
                if(res){
                    setData(res.data)
                }
            }
            
        }
        searching()
    },[text])
    const mapFoundItem = data.map((value,key)=>{
        const imgurl = process.env.REACT_APP_SERVER_URL +"/file/" +value.cardimg;
        const removedUrl = removeMarkUrl(value.name);
        if(props.type === "edit"){
            return(
                <Link  key={key} to={"/edit-san-pham/"+removedUrl+"/"+value._id }>
                    <Row style={{padding: "5px"}}>
                        <Col span={6}>
                            <img style={{width: "100%"}} src={imgurl} alt={value.name} />
                        </Col>
                        <Col style={{padding: 6}} span={18}>{value.name}</Col>

                    </Row>
                </Link>
                )
            
        }else  {
            return null
        }
       
        })
    return (
        <Row justify='center' style={{margin: "10px"}}>
            <Col xl={{span: 8}} lg={{span: 8}} md={{span: 16}} sm={{span: 18}} xs={{span: 24}}>
                <Search  placeholder="Nhập từ khóa tìm kiếm" onSearch={onSearch} onChange={e=>onChange(e)} value={text} enterButton />
                <div  onClick={resetTextonClick} style={{position: "absolute",zIndex:3,width: "100%",background: "white"}}>
                    {mapFoundItem}
                </div>
            </Col>
        </Row>
    );
}

export default SearchBox;      