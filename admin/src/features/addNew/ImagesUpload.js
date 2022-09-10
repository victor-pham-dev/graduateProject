import React, { useEffect, useState } from 'react';
import { Upload } from 'antd';
import { useSelector } from 'react-redux';
function ImagesUpload (prop) {
    const token = useSelector(state=>state.user.token)
    const [fileList, setFileList] = useState([]);
  const url = process.env.REACT_APP_SERVER_URL + "/file/singleupload"
  const props = {
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
      prop.getImgData(urlList)

     
  },[fileList])


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
  
  return (
   
      <Upload
        {...props}
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
      >
        {fileList.length < 10 && '+ Upload'}
      </Upload>
   
  );
};


export default ImagesUpload;