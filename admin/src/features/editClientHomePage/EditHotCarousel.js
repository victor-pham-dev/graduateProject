import { Button,Row,Col,Input,Modal, message ,Space} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import EditProductCard from './EditProductCard';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
const {Search} = Input;
function HotCarousel (props){

  const token= useSelector(state=>state.user.token);
  const [data,setData] = useState([]);
  const [itemKey,setItemKey] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType,setModalType] = useState('');
  const showModal = () => {
      setIsModalVisible(true);
  };
  
  const handleCancel = () => {
      setIsModalVisible(false);
  };
  useEffect(()=>{
    if(props.data){
      setData(props.data);
    }
     
  },[props])

  const [text,setText] = useState('')
  const [items,setItems] = useState([])
  const onSearch = value=>{
      setText(value)
  }
  const onChange = e=>{
      setText(e.target.value)
  }



  useEffect(()=>{
      const searching = async ()=>{
          if(text !== ''){
              const res = await axios.post(process.env.REACT_APP_SERVER_URL+"/product/search", {"text": text})
              if(res){
                setItems(res.data)
              }
          }
          
      }
      searching()
  },[text])

  const mapFoundItem = items.map((value,key)=>{
      const selectedItem = (value)=>{
        const cloneData = [...data];
        cloneData.push(value)
        setData(cloneData)
        handleCancel();
      }
      const selectedChangeItem = (value)=>{
        const cloneData = [...data];
        cloneData[itemKey] = value
        setData(cloneData)
        handleCancel();
      }
      const imgurl = process.env.REACT_APP_SERVER_URL +"/file/" +value.cardimg;
      const checkModalType = ()=>{
        if(modalType === 'add'){
          return(
            <Row key={key}  style={{padding: "5px"}}>
            <Col span={6}>
                <img style={{width: "100%"}} src={imgurl} alt={value.name} />
            </Col>
            <Col style={{padding: 12}} span={12} >{value.name}</Col>
            <Col style={{padding: 4}} span={4} >
              <Space>
                <Button type="primary" onClick={()=>selectedItem(value)}>Chọn</Button>
                
              </Space>
            </Col>
          
          </Row>
          )
        }else if(modalType === 'change'){
          return(
            <Row key={key}  style={{padding: "5px"}}>
            <Col span={6}>
                <img style={{width: "100%"}} src={imgurl} alt={value.name} />
            </Col>
            <Col style={{padding: 12}} span={12} >{value.name}</Col>
            <Col style={{padding: 6}} span={4} >
              <Space>
                
                <Button type="primary" onClick={()=>selectedChangeItem(value)}>Thay thế</Button>
              </Space>
            </Col>
          
          </Row>
          )
        }
      }
      return(
             <>{checkModalType()}</>
          )
      }
  )

  const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      arrow: true,
      autoplay: false,
      slidesToShow: 3,
      slidesToScroll: 3
    }
    const mapCard = data.map((value,key)=>{
      return(<div key={key}>
          <EditProductCard  data={value} cardkey={key} deleteItem={(cardkey)=>deleteItem(cardkey)} changeItem={(cardkey=>changeItem(cardkey))} />
        </div>)
    })
    const saveChange = ()=>{
      axios.post(process.env.REACT_APP_SERVER_URL + "/homepage/editproductcarousel",{"data": data,"id": props.id},{
        headers: {
          "x-access-token": token
        }
      })
      .then(res=>{
        if(res.status === 200){
          message.success("Cập nhật thành công")
        }else{
          message.error("Đã có lỗi xảy ra")
        }
      })
    }
    const addNew  =()=>{
      setIsModalVisible(true);
      setModalType("add")
    }
    //thêm item
    //xóa item
    const deleteItem = (cardkey)=>{
      let cloneData = [...data];
      cloneData.splice(cardkey,1)
      setData(cloneData)
    }
    //xóa thay đổi item
    const changeItem = (cardkey)=>{
      setItemKey(cardkey);
      setModalType("change")
      setIsModalVisible(true);
    }





    return (
      <div>
         <Modal title="Thay thế chọn nút |Thay thế|, thêm mới chọn nút |Thêm| " visible={isModalVisible} footer={null}  onCancel={handleCancel}>
                <Row justify='center' style={{margin: "10px"}}>
                    <Col span={24}>
                        <Search  placeholder="Nhập từ khóa tìm kiếm" onSearch={onSearch} onChange={e=>onChange(e)} value={text} enterButton />
                        <div   style={{position: "absolute",zIndex:3,width: "100%",background: "white"}}>
                            {mapFoundItem}
                        </div>
                    </Col>
                </Row>
            </Modal>
        <div>
        <Slider {...settings}>
        {mapCard}

          
      </Slider>
      </div>
      <Space style={{marginTop: 5}}> 
      <Button onClick={addNew} type="primary">
          Thêm Mới
      </Button>
      <Button onClick={saveChange} type="primary">
          Lưu thay đổi
      </Button>
      </Space>
     
    </div>
    );
  }

export default HotCarousel;