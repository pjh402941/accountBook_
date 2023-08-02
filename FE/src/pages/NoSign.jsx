import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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

const Top = styled.div`
  position: relative;
  height: 46px;
  background: #55877e;
`;

const Back = styled.div`
  position: relative;
  margin-left: -90%;
  padding-top: 15px;
  cursor: pointer;
`;

const Logo = styled.div`
  position: relative;
  margin: auto;
  margin-top: 70px;
`;

const NoMember = styled.div`
  position: relative;
  margin: auto;
  margin-top: 30px;

  font-weight: bold;
  font-size: 20px;

  color: #55877e;
`;

const NameBox = styled.div`
  position: relative;
  margin: auto;
  margin-top: 35px;

  width: 240px;
  height: 80px;

  background: #b3dbd4;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
`;

const NameInput = styled.input`
  position: relative;

  align-items: center;
  width: 200px;
  height: 44px;
  background: #ffffff;
  border-radius: 6px;
  border: none;
  margin: auto;
  margin-top: 17px;

  &::placeholder {
    color: #b3dbd4;
    padding-left: 10px;
  }
  &:focus {
    border: none;
    outline: none;
  }
`;

const Check = styled.div`
  position: relative;
  margin-left: 186px;
  margin-top: -35px;
`;

const Done = styled.button`
  position: relative;
  width: 128px;
  height: 55px;
  background: #55877e;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  font-size: 12px;
  color: #ffffff;
  margin: auto;
  margin-top: 68px;
  border: none;
  cursor: pointer;
`;

const NoSign = () => {
  const navigate = useNavigate();
  const navigateToRecordstart_ds = () => {
    navigate("/Recordstart_ds");
  };
  const onClickBtn = () => {
    navigate(-1); // 바로 이전 페이지로 이동, '/main' 등 직접 지정도 당연히 가능
  };

  return (
    <Container>
      <BodyWrapper>
        <Top>
          <Back onClick={onClickBtn} width="16px">
            <img
              src={`${process.env.PUBLIC_URL}/images/back.png`}
              alt="back"
              width="16px"
            />
          </Back>
        </Top>
        <Logo>
          <img
            src={`${process.env.PUBLIC_URL}/images/logo.png`}
            alt="logo"
            width="338px"
            height="302px"
          />
        </Logo>
        <NoMember>비회원 로그인</NoMember>
        <NameBox>
          <NameInput type="text" placeholder="닉네임"></NameInput>
        </NameBox>
        <Done onClick={navigateToRecordstart_ds}>입력 완료</Done>
      </BodyWrapper>
    </Container>
  );
};

export default NoSign;
