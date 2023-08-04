import React, { useState, useEffect } from "react";
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

const TitleBox = styled.div`
  position: relative;
  margin: 0 auto;
  margin-top: 80px;
  background: #55877e;
  width: 120px;
  height: 44px;
  background: #55877e;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
`;

const Title = styled.div`
  position: relative;
  padding-top: 10px;
  margin-left: 7px;
  color: #ffffff;
  width: 80px;
  height: 24px;
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
`;

const Person = styled.div`
  position: relative;
  margin-left: 84px;
  margin-top: -23.5px;
`;

const AgreeBox = styled.div`
  position: relative;
  margin: auto;
  margin-top: 80px;
  width: 344px;
  height: 228px;
  background: #e8f3f1;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
`;

const Agree = styled.div`
  position: relative;
  margin: auto;
  top: 22px;
  margin-top: 25px;
  width: 310px;
  height: 44px;
  background: #b3dbd4;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  border: none;
`;

const Check = styled.input`
  cursor: pointer;
  position: relative;
  margin-left: -266px;
  margin-top: 10.5px;
  appearance: none;

  width: 1.5rem;
  height: 1.5rem;
  border: 1.5px solid gainsboro;
  border-radius: 0.35rem;

  &:checked {
    border-color: transparent;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: #c2c2c2;
  }
`;

const AgreeText = styled.div`
  position: relative;
  width: 236px;
  height: 21px;
  font-size: 12px;
  font-weight: bold;
  color: #214a43;
  text-align: left;
  margin-top: -29.5px;
  margin-left: 44.5px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 6px;
  line-height: 20px;
  background: #ffffff;
`;

const AllAgree = styled.div`
  position: relative;
  margin: auto;
  top: 22px;
  margin-top: 22px;
  width: 310px;
  height: 52px;
  background: #b3dbd4;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  border: none;
`;

const Check2 = styled.input`
  cursor: pointer;
  position: relative;
  appearance: none;
  margin-left: -266px;
  margin-top: 14px;
  padding-top: 14.5px;

  width: 1.5rem;
  height: 1.5rem;
  border: 1.5px solid gainsboro;
  border-radius: 0.35rem;

  &:checked {
    border-color: transparent;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: #c2c2c2;
  }
`;

const AgreeText2 = styled.div`
  position: relative;
  width: 236px;
  height: 29px;
  font-size: 12px;
  font-weight: bold;
  color: #214a43;
  text-align: left;
  line-height: 28px;
  margin-top: -33px;
  margin-left: 44.5px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 6px;
  background: #ffffff;
`;

const Done = styled.button`
  cursor: pointer;
  position: relative;
  width: 145px;
  height: 35px;
  background: #55877e;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  font-weight: bold;
  font-size: 12px;
  color: #ffffff;
  margin: auto;
  margin-top: 68px;
  border: none;
`;

const SignUp = () => {

  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/SignUpDetail`);
  };

  const onClickBtn = () => {
    navigate(-1); // 바로 이전 페이지로 이동, '/main' 등 직접 지정도 당연히 가능
  };

  const [allCheck, setAllCheck] = useState(false);
  const [ageCheck, setAgeCheck] = useState(false);
  const [useCheck, setUseCheck] = useState(false);
  const [marketingCheck, setMarketingCheck] = useState(false);

  const allBtnEvent = () => {
    if (allCheck === false) {
      setAllCheck(true);
      setAgeCheck(true);
      setUseCheck(true);
      setMarketingCheck(true);
    } else {
      setAllCheck(false);
      setAgeCheck(false);
      setUseCheck(false);
      setMarketingCheck(false);
    }
  };

  const ageBtnEvent = () => {
    if (ageCheck === false) {
      setAgeCheck(true);
    } else {
      setAgeCheck(false);
    }
  };

  const useBtnEvent = () => {
    if (useCheck === false) {
      setUseCheck(true);
    } else {
      setUseCheck(false);
    }
  };

  const marketingBtnEvent = () => {
    if (marketingCheck === false) {
      setMarketingCheck(true);
    } else {
      setMarketingCheck(false);
    }
  };

  useEffect(() => {
    if (ageCheck === true && useCheck === true && marketingCheck === true) {
      setAllCheck(true);
    } else {
      setAllCheck(false);
    }
  }, [ageCheck, useCheck, marketingCheck]);

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
        <TitleBox>
          <Title>회원가입</Title>
          <Person>
            <img
              src={`${process.env.PUBLIC_URL}/images/person.png`}
              alt="person"
              width="24px"
            />
          </Person>
        </TitleBox>
        <AgreeBox>
          <Agree>
            <Check
              type="checkbox"
              name="terms"
              checked={useCheck}
              onChange={useBtnEvent}
            />
            <AgreeText>[필수] 서비스 이용약관 동의</AgreeText>
          </Agree>
          <Agree>
            <Check
              type="checkbox"
              name="collect"
              checked={ageCheck}
              onChange={ageBtnEvent}
            />
            <AgreeText>[필수] 개인정보 수집 및 이용 동의</AgreeText>
          </Agree>
          <Agree>
            <Check
              type="checkbox"
              name="marketing"
              checked={marketingCheck}
              onChange={marketingBtnEvent}
            />
            <AgreeText>[선택] 마케팅 정보 수신 동의</AgreeText>
          </Agree>
        </AgreeBox>
        <AllAgree>
          <Check2
            type="checkbox"
            name="all"
            checked={allCheck}
            onChange={allBtnEvent}
          />
          <AgreeText2>전체 동의</AgreeText2>
        </AllAgree>
        <Done onClick={onClick}>가입하기</Done>
      </BodyWrapper>
    </Container>
  );
};
export default SignUp;
