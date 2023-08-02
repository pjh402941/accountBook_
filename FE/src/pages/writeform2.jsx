import React, { useCallback, useState, useEffect } from "react";
import styled from "styled-components";

import { useNavigate } from "react-router-dom";
import moment from "moment";

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

const Header = styled.header`
  position: relative;
  height: 46px;
  background: #55877e;
`;

const BackButton = styled.img`
  position: relative;
  margin-left: -90%;
  padding-top: 15px;
  cursor: pointer;
`;

const Body = styled.div`
  height: 77%;
  margin: 0 20px;
  margin-top: 19px;
`;

const FormHeader = styled.div`
  border-radius: 6px;
  background: #55877e;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  height: 76px;
  box-sizing: border-box;
  padding: 8px 13px 8px 10px;
`;

const Date = styled.div`
  display: inline-block;
  box-sizing: border-box;
  width: 70%;
  height: 60px;
  background-color: white;
  float: left;
  padding: 21px;
  border-radius: 6px;
  text-align: center;
  font-family: "Inter", sans-serif;
  font-size: 14px;
  font-weight: 700;
`;

const SubmitBox = styled.div`
  display: inline-block;
  box-sizing: border-box;
  float: right;
  width: 20%;
  height: 56px;
  margin-top: 3px;
  background-color: white;
  border-radius: 6px;
  padding: 16px 2%;
  font-family: Inter;
  cursor: pointer;
`;
const SubmitIcon = styled.img`
  float: left;
`;

const SubmitButton = styled.button`
  background-color: white;
  float: right;
  border: none;
  color: #214a43;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  padding: 0;
  top: 10px;
  margin-top: 4px;
  font-family: "Inter", sans-serif;
`;

const FormContent = styled.div`
  position: relative;
  height: 480px;
  border-radius: 6px;
  background: #b3dbd4;
  padding: 8px 5px;
  margin-top: 15px;
  box-shadow: 2px 0 8px #b8b5ac, -2px 0 8px #b8b5ac;
`;
const Bottom = styled.img`
  width: 100%;
  margin-top: -3px;
  filter: drop-shadow(0px 4px 3px #b8b5ac);
`;

const Footer = styled.footer`
  background: #55877e;
  height: 80px;
  width: 100%;
  position: absolute;
  bottom: 0;
`;

const ToolBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  height: 100%;
  align-items: center;
  padding: 0 15px;
`;

const SelectBox = styled.div`
  position: relative;
  width: 100px;
  height: 470px;
  margin-left: 7px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-top: 5px;
`;

const Select = styled.select`
  position: relative;
  border-radius: 6px;
  background-color: white;
  width: 80px;
  height: 44px;
  text-align: center;
  font-family: "Inter", sans-serif;
  border: none;
  color: #214a43;
`;

const Line2 = styled.img`
  position: relative;
  height: 478px;
  margin-top: -600px;
  top: -10px;
  margin-left: -140px;
`;

const WhiteBoxArea = styled.div`
  // position: relative;
  width: 100px;
  height: 470px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-top: -491.5px;
`;

const WhiteBox = styled.div`
  position: relative;
  width: 220px;
  height: 44px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin-left: 114px;
  background: #ffffff;
  border-radius: 6px;
`;

const Input = styled.input`
  width: 90px;
  height: 20px;
  width: 90px;
  height: 20px;

  border: none;

  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  line-height: 10px;
  text-align: center;

  color: #214a43;

  &::placeholder {
    color: #214a43;
  }
`;

const LayoutIcon = styled.img`
  /* LayoutIcon 스타일링 */
  cursor: pointer;
`;

const Writeform2 = () => {
  const navigate = useNavigate();

  const onClickBtn = () => {
    navigate(-1); // 바로 이전 페이지로 이동, '/main' 등 직접 지정도 당연히 가능
  };

  const handleSubmitBoxClick = () => {
    navigate("/save");
  };

  // 날짜를 형식에 맞게 포맷하여 가져오는 함수
  const getFormattedDate = () => {
    const today = moment().format("YYYY . MM . DD ddd");
    return today;
  };

  return (
    <Container>
      <BodyWrapper>
        <Header>
          <BackButton
            onClick={onClickBtn}
            src="images/뒤로가기.png"
            alt="back"
            width="16px"
          />
        </Header>
        <Body>
          <form>
            <FormHeader>
              <Date>{getFormattedDate()}</Date>
              <SubmitBox onClick={handleSubmitBoxClick}>
                <SubmitIcon
                  onClick={handleSubmitBoxClick}
                  src="images/저장.png"
                  alt="save"
                  width="24px"
                ></SubmitIcon>
                <SubmitButton onClick={handleSubmitBoxClick} type="submit">
                  저장
                </SubmitButton>
              </SubmitBox>
            </FormHeader>
            <FormContent>
              <SelectBox>
                <Select>
                  <option disabled hidden selected>
                    카테고리
                  </option>
                  <option value="1">식비</option>
                  <option value="2">쇼핑</option>
                  <option value="3">교통비</option>
                  <option value="4">기타</option>
                </Select>
                <Select>
                  <option disabled hidden selected>
                    카테고리
                  </option>
                  <option value="1">식비</option>
                  <option value="2">쇼핑</option>
                  <option value="3">교통비</option>
                  <option value="4">기타</option>
                </Select>
                <Select>
                  <option disabled hidden selected>
                    카테고리
                  </option>
                  <option value="1">식비</option>
                  <option value="2">쇼핑</option>
                  <option value="3">교통비</option>
                  <option value="4">기타</option>
                </Select>
                <Select>
                  <option disabled hidden selected>
                    카테고리
                  </option>
                  <option value="1">식비</option>
                  <option value="2">쇼핑</option>
                  <option value="3">교통비</option>
                  <option value="4">기타</option>
                </Select>
                <Select>
                  <option disabled hidden selected>
                    카테고리
                  </option>
                  <option value="1">식비</option>
                  <option value="2">쇼핑</option>
                  <option value="3">교통비</option>
                  <option value="4">기타</option>
                </Select>
                <Select>
                  <option disabled hidden selected>
                    카테고리
                  </option>
                  <option value="1">식비</option>
                  <option value="2">쇼핑</option>
                  <option value="3">교통비</option>
                  <option value="4">기타</option>
                </Select>
                <Select>
                  <option disabled hidden selected>
                    카테고리
                  </option>
                  <option value="1">식비</option>
                  <option value="2">쇼핑</option>
                  <option value="3">교통비</option>
                  <option value="4">기타</option>
                </Select>
                <Select>
                  <option disabled hidden selected>
                    카테고리
                  </option>
                  <option value="1">식비</option>
                  <option value="2">쇼핑</option>
                  <option value="3">교통비</option>
                  <option value="4">기타</option>
                </Select>
              </SelectBox>
              <Line2 src="images/Line 9.png"></Line2>
              <WhiteBoxArea>
                <WhiteBox>
                  <Input placeholder="소비 내역"></Input>
                  <Input placeholder="금액" type="number"></Input>
                </WhiteBox>
                <WhiteBox>
                  <Input placeholder="소비 내역"></Input>
                  <Input placeholder="금액" type="number"></Input>
                </WhiteBox>
                <WhiteBox>
                  <Input placeholder="소비 내역"></Input>
                  <Input placeholder="금액" type="number"></Input>
                </WhiteBox>
                <WhiteBox>
                  <Input placeholder="소비 내역"></Input>
                  <Input placeholder="금액" type="number"></Input>
                </WhiteBox>
                <WhiteBox>
                  <Input placeholder="소비 내역"></Input>
                  <Input placeholder="금액" type="number"></Input>
                </WhiteBox>
                <WhiteBox>
                  <Input placeholder="소비 내역"></Input>
                  <Input placeholder="금액" type="number"></Input>
                </WhiteBox>
                <WhiteBox>
                  <Input placeholder="소비 내역"></Input>
                  <Input placeholder="금액" type="number"></Input>
                </WhiteBox>
                <WhiteBox>
                  <Input placeholder="소비 내역"></Input>
                  <Input placeholder="금액" type="number"></Input>
                </WhiteBox>
              </WhiteBoxArea>
            </FormContent>
          </form>
          <Bottom src="images/Bottom.png"></Bottom>
        </Body>
        <Footer>
          <ToolBox>
            <LayoutIcon
              src="images/레이아웃 양식.png"
              alt="layout"
              width="24px"
            />
          </ToolBox>
        </Footer>
      </BodyWrapper>
    </Container>
  );
};

export default Writeform2;
