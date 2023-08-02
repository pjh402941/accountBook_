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
  overflow: auto;
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
  width: 110px;
  height: 44px;
  background: #55877e;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
`;

const Title = styled.div`
  position: relative;
  padding-top: 10px;
  margin-left: 3px;
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
  margin-left: 65px;
  margin-top: -23.5px;
`;

const LoginInput = styled.form`
  position: relative;
  margin: auto;
  margin-top: 80px;
  width: 328px;
  height: 190px;
  background: #b3dbd4;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
`;

const IdPwInput = styled.input`
  position: relative;
  margin: auto;
  align-items: center;
  width: 300px;
  height: 68px;
  background: #ffffff;
  border-radius: 6px;
  border: none;
  margin-top: 17px;

  &::placeholder {
    color: #b3dbd4;
    padding-left: 10px;
  }
  &:focus {
    outline: none;
    border: none;
  }
`;

const LoginBox = styled.button`
  position: relative;
  margin: auto;
  margin-top: 50px;
  width: 300px;
  height: 60px;
  background: #55877e;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  border: none;
  font-size: 12px;
  color: #ffffff;
  cursor: pointer;
`;

const Join = styled.div`
  position: relative;
  margin: auto;
  margin-top: 20px;
  background: #b3dbd4;
  width: 200px;
  height: 15px;
  font-size: 12px;
  color: #ffffff;
  cursor: pointer;
`;

const Login = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/SignUp`);
  };

  const onClickBtn = () => {
    navigate(-1); // 바로 이전 페이지로 이동, '/main' 등 직접 지정도 당연히 가능
  };

  const [loginId, setLoginId] = useState("");
  const [loginPw, setLoginPw] = useState("");
  const [loginButtonDisabled, setLoginButtonDisabled] = useState(true);

  const handleLoginIdChange = (e) => {
    const value = e.target.value;
    setLoginId(value);
    updateLoginButtonState(value, loginPw);
  };

  const handleLoginPwChange = (e) => {
    const value = e.target.value;
    setLoginPw(value);
    updateLoginButtonState(loginId, value);
  };

  const updateLoginButtonState = (id, pw) => {
    setLoginButtonDisabled(id.length === 0 || pw.length === 0);
  };

  const handleLogin = () => {
    navigate(`/Recordstart_ag`);
  };

  return (
    <Container>
      <BodyWrapper>
        <Top>
          <Back onClick={onClickBtn}>
            <img
              src={`${process.env.PUBLIC_URL}/images/back.png`}
              alt="back"
              width="16px"
            />
          </Back>
        </Top>
        <TitleBox>
          <Title>로그인</Title>
          <Person>
            <img
              src={`${process.env.PUBLIC_URL}/images/person.png`}
              alt="person"
              width="24px"
            />
          </Person>
        </TitleBox>
        <LoginInput>
          <IdPwInput
            type="text"
            placeholder="아이디"
            value={loginId}
            onChange={handleLoginIdChange}
          ></IdPwInput>
          <IdPwInput
            type="password"
            placeholder="비밀번호"
            value={loginPw}
            onChange={handleLoginPwChange}
          ></IdPwInput>
        </LoginInput>
        <LoginBox onClick={handleLogin} disabled={loginButtonDisabled}>
          로그인
        </LoginBox>
        <Join onClick={onClick}>아직 회원이 아니신가요? 회원가입</Join>
      </BodyWrapper>
    </Container>
  );
};
export default Login;
