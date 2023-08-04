import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // useLocation 추가
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
  height: 100%;
  margin: 0 20px;
  margin-top: 59px;
`;

const Capture = styled.img`
  border: 1.827px solid #55877e;
  border-radius: 3.015px;
  padding: 8px;
  width: 210px;
`;

const ActionWrapper = styled.div`
  border-radius: 6px;
  background: #b3dbd4;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  width: 295px;
  padding: 27px 25px;
  margin: 0 auto;
  margin-top: 32px;
`;

const ShareButton = styled.button`
  border-radius: 6px;
  border: none;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  width: 143px;
  height: 27px;
`;

const ShareBox = styled.div`
  border-radius: 6px;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  margin-top: 18px;
  width: 300px;
  height: 64px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  box-sizing: border-box;
  padding: 0 9.5px;
`;

const SocialIcon = styled.img`
  /* SocialIcon 스타일링 */
  width: 24px;
`;

const FaceBook = styled(SocialIcon)`
  /* FaceBook 스타일링 */
`;

const Insta = styled(SocialIcon)`
  /* Insta 스타일링 */
`;

const Message = styled(SocialIcon)`
  /* Message 스타일링 */
`;

const Share = () => {
  const [capturedImageUrl, setCapturedImageUrl] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.capturedImage) {
      setCapturedImageUrl(location.state.capturedImage);
    }
  }, [location.state]);

  const onClickBtn = () => {
    navigate(-1); // 바로 이전 페이지로 이동, '/main' 등 직접 지정도 당연히 가능
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
          {capturedImageUrl && (
            <Capture src={capturedImageUrl} alt="Captured" />
          )}
          <ActionWrapper>
            <ShareButton>공유</ShareButton>
            <ShareBox>
              <a href="https://www.facebook.com/" target="_blank">
                <FaceBook
                  src="images/페이스북.png"
                  alt="facebook"
                  width="24px"
                />
              </a>
              <a href="https://www.instagram.com/" target="_blank">
                <Insta src="images/인스타.png" alt="insta" width="24px" />
              </a>
              <a
                href="https://mail.google.com/mail/u/0/?hl=ko#inbox"
                target="_blank"
              >
                <Message src="images/문자.png" alt="message" width="24px" />
              </a>
            </ShareBox>
          </ActionWrapper>
        </Body>
      </BodyWrapper>
    </Container>
  );
};

export default Share;
