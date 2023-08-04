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
  flex: 1;
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
  margin-top: 50px;
  margin-bottom: 50px;
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

const InputBox = styled.div`
  position: relative;
  margin: auto;
  margin-top: 22px;
  width: 310px;
  height: 52px;
  background: #b3dbd4;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  border: none;
`;

const Input = styled.input`
  position: relative;
  align-items: center;
  width: 285px;
  height: 32px;
  background: #ffffff;
  border-radius: 6px;
  border: none;
  margin: auto;
  margin-top: 9px;

  &::placeholder {
    color: #b3dbd4;
    padding-left: 10px;
  }
  &:focus {
    border: none;
    outline: none;
  }
`;

const Select = styled.select`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  align-items: center;
  padding: 5px 10px;

  position: relative;
  width: 90px;
  height: 34px;

  //   background: #e7f5f3;
  border: 1px solid #b3dbd4;
  border-radius: 6px;

  flex-direction: row;

  margin-left: 5px;
  margin-right: 5px;
  margin-top: 9px;

  color: #b3dbd4;
`;

const Done = styled.button`
  position: relative;
  width: 140px;
  height: 35px;
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

const SignUpDetail = () => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  // 일자, 월, 년도 배열 생성
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const years = Array.from(
    { length: 100 },
    (_, i) => new Date().getFullYear() - i
  );

  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/Login`);
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
        <InputBox>
          <Input type="text" placeholder="이름" id="name"></Input>
        </InputBox>
        <InputBox>
          <Input type="text" placeholder="닉네임" id="nickname"></Input>
        </InputBox>
        <InputBox>
          <Input type="text" placeholder="아이디" id="id"></Input>
        </InputBox>
        <InputBox>
          <Input type="text" placeholder="비밀번호" id="pw"></Input>
        </InputBox>
        <InputBox>
          <Input type="phone" placeholder="전화번호" id="number"></Input>
        </InputBox>
        <InputBox>
          {/* 년도 드롭다운 */}
          <Select onChange={(e) => setYear(e.target.value)}>
            <option value="">년</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </Select>

          {/* 월 드롭다운 */}
          <Select onChange={(e) => setMonth(e.target.value)}>
            <option value="">월</option>
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </Select>

          {/* 일자 드롭다운 */}
          <Select onChange={(e) => setDay(e.target.value)}>
            <option value="">일</option>
            {days.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </Select>
        </InputBox>
        <Done onClick={onClick}>회원가입 완료</Done>
      </BodyWrapper>
    </Container>
  );
};

export default SignUpDetail;
