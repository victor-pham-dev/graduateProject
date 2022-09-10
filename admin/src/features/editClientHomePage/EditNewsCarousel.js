import React, { useEffect, useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import  './style.css'
import { useSelector } from 'react-redux';
import {  message, Upload } from 'antd';
import axios from 'axios';

function NewsCarousel(props) {
    const token= useSelector(state=>state.user.token);
    const [data,setData] = useState([]);
    const [fileList, setFileList] = useState([]);
   
    useEffect(()=>{
        let propsdata = props.data;
        
        if(propsdata){
            setData(props.data);
            var newList= [];
            propsdata.map((value,key)=>{
            const newItem = {
                uid: key,
                name: "image.jpeg",
                status: 'done',
                url: process.env.REACT_APP_SERVER_URL + "/file/" + value,
                response: value
            }
            return newList.push(newItem)
        })
        setFileList(newList)
        }else{
            
        }
    
       
    },[props])

    const url = process.env.REACT_APP_SERVER_URL + "/file/singleupload"
    const prop = {
        name: "file",
        action: url,
          headers: {
              "x-access-token": token
          }
    }
    const onChange = ({ fileList: newFileList }) => {
      setFileList(newFileList)
  
    };
    useEffect(()=>{
        var urlList =[]
        fileList.forEach(item => {
            if(item.status === 'done'){
              urlList.push(item.response)
            }
        });
        setData(urlList);
        const update  = async ()=>{
            const res= await  axios.post(process.env.REACT_APP_SERVER_URL+"/homepage/editslider",{
                "data": urlList,
                "id": props.id
            },{
                headers: {"x-access-token": token}
            })
            if(res.status === 200){
               
            }else{
                message.error("Đã xảy ra lỗi")
            }
        }
        update();
    },[fileList,props.id,token])

    const onPreview = async file => {
        let src = file.url;
        if (!src) {
          src = await new Promise(resolve => {
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj);
            reader.onload = () => resolve(reader.result);
          });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
      };
    const mapData = data.map((value,key)=>{
        
        return(
            <div key={key}>
                <img style={{maxHeight: 280,width: "100%"}} src={process.env.REACT_APP_SERVER_URL+"/file/"+value} alt='Img' />
            </div>
        )
    })

    //tìm sp
    



    return (
            <>
            
            <Carousel className='newsCarousel'
                autoPlay={false}
                infiniteLoop={true}
                interval={4000}
                showStatus={false}
                showThumbs={false}
                showArrows={false}
            >
              {mapData}
            </Carousel>
            <Upload
            {...prop}
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
            onPreview={onPreview}
          >
            {fileList.length < 10 && '+ Upload'}
          </Upload>
          </>
    );
}

export default NewsCarousel;        