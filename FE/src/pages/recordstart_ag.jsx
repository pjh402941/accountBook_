import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  text-align: center;
  background-color: #f5f0e4;
  -ms-overflow-style: none;
  font-family: "Inter", sans-serif;

  /* 미디어 쿼리 적용 */
  @media (hover: hover) {
    width: 390px;
    margin: 0 auto;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

const BodyWrapper = styled.div`
  flex: 1; /* 남은 공간을 채우도록 설정 */
  overflow: auto; /* 스크롤이 있는 경우 내용을 스크롤합니다. */
`;

const Topbar = styled.div`
  position: relative;
  height: 46px;
  background: #55877e;
`;

const Backbutton = styled.div`
  position: relative;
  margin-left: -90%;
  padding-top: 15px;
  cursor: pointer;
`;

const Mainimg = styled.div`
  position: relative;
  margin: auto;
  margin-top: 70px;
`;

const Bottombox = styled.div`
  display: inline-flex;
  padding: 20px 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 300px;
  height: 250px;
  margin: auto;
  margin-top: 20px;
  border-radius: 6px;
  background: #b3dbd4;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

const Listtext = styled.div`
  display: flex;
  margin-top: -30px;
  width: 300px;
  height: 50px;
  flex-direction: column;
  justify-content: center;
  color: #214a43;
  text-align: center;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const Whitebox1 = styled.div`
  display: flex;
  width: 200px;
  height: 70px;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  border-radius: 6px;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

const Celenderimg = styled.div`
  display: flex;
  width: 24px;
  height: 24px;
  padding: 0px 1px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  gap: 10px;
`;

const Readingtext = styled.div`
  display: flex;
  width: 100px;
  height: 46px;
  flex-direction: column;
  justify-content: center;
  margin-left: 60px;
  margin-top: -33px;
  color: #214a43;
  text-align: center;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Whitebox2 = styled.div`
  display: flex;
  justify-content: center;

  display: flex;
  width: 200px;
  height: 70px;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  border-radius: 6px;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

const Writeimg = styled.div`
  display: flex;
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
`;

const Writingtext = styled.div`
  display: flex;
  width: 100px;
  height: 46px;
  flex-direction: column;
  justify-content: center;
  margin-left: 60px;
  margin-top: -33px;
  color: #214a43;
  text-align: center;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const Recordstart_ag = () => {
  
  const navigate = useNavigate();
  const navigateToRead = () => {
    navigate("/read");
  };
  const navigateToWrite = () => {
    navigate("/Dayselect");
  };

  const onClickBtn = () => {
    navigate(-1); // 바로 이전 페이지로 이동, '/main' 등 직접 지정도 당연히 가능
  };

  return (
    <Container>
      <BodyWrapper>
        <Topbar>
          <Backbutton onClick={onClickBtn}>
            <img
              src={`${process.env.PUBLIC_URL}/images/back.png`}
              alt="back"
              width="16px"
            />
          </Backbutton>
        </Topbar>

        <Mainimg>
          <img
            src={`${process.env.PUBLIC_URL}/images/logo.png`}
            alt="logo"
            width="338px"
            height="302px"
          />
        </Mainimg>

        <Bottombox>
          <Listtext>목록</Listtext>
          <Whitebox1>
            <Celenderimg>
              <img
                src={`${process.env.PUBLIC_URL}/images/celender.png`}
                alt="celender"
              />
            </Celenderimg>
            <Readingtext onClick={navigateToRead}>가계부 열람</Readingtext>
          </Whitebox1>
          <Whitebox2>
            <Writeimg>
              <img
                src={`${process.env.PUBLIC_URL}/images/write.png`}
                alt="write"
              />
            </Writeimg>
            <Writingtext onClick={navigateToWrite}>가계부 작성</Writingtext>
          </Whitebox2>
        </Bottombox>
      </BodyWrapper>
    </Container>
  );
};
export default Recordstart_ag;
