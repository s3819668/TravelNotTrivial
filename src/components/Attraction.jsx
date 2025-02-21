import styled from 'styled-components';

const Thing = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #333333;
  padding: 15px;
  margin-bottom: 20px;
  position: relative;
  width: 16vw;
  border-radius: 1em;
`;

const Title = styled.h2`
  font-size: 1.5em;
  margin-bottom: 1vh;
  font-weight: bold;
  color: #ddd;
  width: 100%;
`;

const Time = styled.p`
  color: #bbb;
  font-size: 1.2em;
  margin-bottom: 1vh;
  width: 100%;
`;

const Content = styled.p`
  font-size: 1em;
  max-height: 10vh;
  overflow-y: scroll;
  background-color: #444;
  min-height: 10vh;
  border-radius: 1em;
  padding: 1em;
  width: 100%;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Remove = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 10%;
  font-size: 1.5em;
  cursor: pointer;
`;

const UploadPicture = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Img = styled.img`
  margin: 0;
  max-width: 12vw;
  max-height: 9vw;
  border-radius: 10%;
  opacity: 0.8;
`;

const Attraction = ({ title, time, content, imgURL, onRemove }) => {
  return (
    <Thing>
      <Title>{title}</Title>
      <Time>{time}</Time>
      <Content>{content}</Content>
      <Remove onClick={onRemove}>x</Remove>
      <UploadPicture>
        {imgURL && <Img src={imgURL} alt="imgURL" />}
      </UploadPicture>
    </Thing>
  );
};

export default Attraction;