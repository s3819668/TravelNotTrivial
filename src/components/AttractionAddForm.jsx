import { useState, useRef,  } from 'react';
import styled from 'styled-components';

const FloatingForm = styled.form`
  z-index: 10;
  width: 15vw;
  position: fixed;
  font-size: 1.2em;
  top: 20px;
  right: 20px;
  background-color: #333333;
  border: 1px solid #ddd;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bolder;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  box-sizing: border-box;
  background: #ddd;
  border-radius: 5px;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  box-sizing: border-box;
  background: #ddd;
  border-radius: 5px;
`;

const UploadPicture = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.15em dashed #ddd;
  min-height: 6vw;
  text-align: center;
  line-height: 5vh;
  font-weight: bold;
  cursor: pointer;
`;

const UploadMask = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  background-color: #B99362;
  &:hover {
    color: #000000;
    font-weight: bold;
    opacity: 0.7;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Img = styled.img`
  margin: 0;
  max-width: 8vw;
  max-height: 6vw;
`;

const Btns = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  margin: 5px;
  margin-top: 10%;
  background-color: #B99362;
  padding: 9px 14px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9em;
  font-weight: bold;
  color: #444444;
  &:hover {
    background-color: #DBB584;
  }
`;
const RegionCommon = styled.div`
  color:#e2a75a;  
`

const AttractionAddForm = ({ onAddAttraction }) => {
  const [newAttraction, setNewAttraction] = useState({
    title: '',
    time: '',
    content: '',
    yymmdd: '',
    selectedFile: null,
    selectedFileUrl: null,
  });
  const [uploadMessage, setUploadMessage] = useState('上傳圖片');
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddAttraction({ ...newAttraction });
    setNewAttraction({
        title: "",
        content: "",
        selectedFile: null,
        selectedFileUrl: null,
        yymmdd: newAttraction.yymmdd,
    });
};
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewAttraction((prev) => ({
          ...prev,
          selectedFileUrl: e.target.result,
        }));
      };
      reader.readAsDataURL(file);
      setNewAttraction((prev) => ({
        ...prev,
        selectedFile: file,
      }));
      setUploadMessage('');
    }
  };

  return (
    <RegionCommon>
      <FloatingForm onSubmit={handleSubmit}>
        <Label htmlFor="title">標題：</Label>
        <Input
          type="text"
          id="title"
          value={newAttraction.title}
          onChange={(e) => setNewAttraction({ ...newAttraction, title: e.target.value })}
          // required
        />

        <Label htmlFor="date">日期：</Label>
        <Input
          type="date"
          id="date"
          value={newAttraction.yymmdd}
          onChange={(e) => setNewAttraction({ ...newAttraction, yymmdd: e.target.value })}
          // required
        />

        <Label htmlFor="time">時間：</Label>
        <Input
          type="time"
          id="time"
          value={newAttraction.time}
          onChange={(e) => setNewAttraction({ ...newAttraction, time: e.target.value })}
          // required
        />

        <Label htmlFor="content">內容：</Label>
        <Textarea
          id="content"
          rows="3"
          value={newAttraction.content}
          onChange={(e) => setNewAttraction({ ...newAttraction, content: e.target.value })}
          // required
        ></Textarea>
        <UploadPicture onClick={triggerFileInput}>
          {uploadMessage}
          <UploadMask>上傳圖片</UploadMask>
          <input
            type="file"
            id="fileInput"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileUpload}
          />
          {newAttraction.selectedFileUrl && <Img src={newAttraction.selectedFileUrl} alt="Selected" />}
        </UploadPicture>
        <Btns>
          <Button type="reset" onClick={() => setNewAttraction({
            title: '',
            time: '',
            content: '',
            yymmdd: '',
            selectedFile: null,
            selectedFileUrl: null,
          })}>清除</Button>
          <Button type="submit">新增</Button>
        </Btns>
      </FloatingForm>
    </RegionCommon>
  );
};

export default AttractionAddForm;