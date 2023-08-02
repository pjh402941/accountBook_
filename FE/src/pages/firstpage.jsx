import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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
  background-color: #f5f0e4;
  height: 46px;
  box-sizing: border-box;
  padding-top: 13px;
`;

const Backbutton = styled.div`
  position: absolute;
  left: 13px;
`;

const Mainimg = styled.div`
  position: relative;
  margin: auto;
  margin-top: 70px;
`;

const Box1 = styled.div`
  border-radius: 6px;
  background: #b3dbd4;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  width: 80px;
  margin: 0 auto;
  margin-top: 30px;
  display: flex;
  padding: 18px 95px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

const Logintext = styled.div`
  display: flex;
  width: 70px;
  height: 20px;
  flex-direction: column;
  justify-content: center;

  color: #214a43;
  text-align: center;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Box2 = styled.div`
  border-radius: 6px;
  background: #b3dbd4;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  width: 80px;
  margin: 0 auto;
  margin-top: 40px;
  display: flex;
  padding: 18px 95px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

const Jointext = styled.div`
  display: flex;
  width: 70px;
  height: 20px;
  flex-direction: column;
  justify-content: center;

  color: #214a43;
  text-align: center;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Box3 = styled.div`
  border-radius: 6px;
  background: #b3dbd4;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  width: 80px;
  margin: 0 auto;
  margin-top: 40px;
  display: flex;
  padding: 18px 95px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

const Nonmemblogintext = styled.div`
  display: flex;
  width: 80px;
  height: 20px;
  flex-direction: column;
  justify-content: center;

  color: #214a43;
  text-align: center;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const Firstpage = () => {
  const navigate = useNavigate();
  const navigateTologinpage = () => {
    navigate("/login");
  };

  const navigateTosignup = () => {
    navigate("/signup");
  };

  const navigateTonosign = () => {
    navigate("/NoSign");
  };

  const onClickBtn = () => {
    navigate(-1); // 바로 이전 페이지로 이동, '/main' 등 직접 지정도 당연히 가능
  };

  return (
    <Container>
      <BodyWrapper>
        <Topbar></Topbar>

        <Mainimg>
          <img
            src={`${process.env.PUBLIC_URL}/images/logo.png`}
            alt="logo"
            width="338px"
            height="302px"
          />
        </Mainimg>

        <Box1 onClick={navigateTologinpage}>
          <Logintext>로그인</Logintext>
        </Box1>
        <Box2 onClick={navigateTosignup}>
          <Jointext>회원가입</Jointext>
        </Box2>
        <Box3 onClick={navigateTonosign}>
          <Nonmemblogintext>비회원 로그인</Nonmemblogintext>
        </Box3>
      </BodyWrapper>
    </Container>
  );
};
export default Firstpage;
