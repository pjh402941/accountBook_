import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import html2canvas from "html2canvas";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  text-align: center;
  background-color: #f5f0e4;
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
`;

const ActionWrapper = styled.div`
  border-radius: 6px;
  background: #b3dbd4;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  width: 295px;
  height: 179px;
  padding: 13px 17px;
  margin: 0 auto;
  margin-top: 32px;
  cursor: pointer; /* Add cursor style to indicate it's clickable */
`;

const SaveBox = styled.div`
  justify-content: center;
  border-radius: 6px;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  height: 84px;
  cursor: pointer; /* Add cursor style to indicate it's clickable */
`;

const SaveIcon = styled.img`
  /* SaveIcon 스타일링 */
`;

const SaveText = styled.p`
  margin-left: 11px;
  font-family: "Inter", sans-serif;
  font-size: 12px;
`;

const ShareBox = styled.div`
  justify-content: center;
  border-radius: 6px;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  height: 84px;
  margin-top: 11px;
`;

const ShareIcon = styled.img`
  /* ShareIcon 스타일링 */
`;

const ShareText = styled.p`
  margin-left: 11px;
  font-family: "Inter", sans-serif;
  font-size: 12px;
`;

const Save = () => {
  const [popup, setPopup] = useState(false);
  const location = useLocation();
  const [capturedImage, setCapturedImage] = useState(null); // capturedImage 상태 선언

  const navigate = useNavigate();
  useEffect(() => {
    if (location.state && location.state.capturedImage) {
      setCapturedImage(location.state.capturedImage);
    }
  }, [location.state]);

  const showPopup = () => {
    setPopup(true);
    setTimeout(() => {
      setPopup(false);
    }, 3000);
  };

  const handleShareBoxClick = () => {
    // Link 컴포넌트를 사용하여 /share 경로로 이동하고 capturedImage를 상태로 전달합니다.
    navigate("/share", { state: { capturedImage: capturedImage } });
  };

  // 사용자가 이미지를 저장하는 함수
  const handleSaveImage = () => {
    // 캡처한 이미지를 Blob 형태로 변환합니다.
    fetch(capturedImage)
      .then((res) => res.blob())
      .then((blob) => {
        // Blob을 URL 객체로 생성합니다.
        const url = URL.createObjectURL(blob);

        // 새로운 링크 엘리먼트를 만들고 이미지 URL을 할당합니다.
        const link = document.createElement("a");
        link.href = url;

        // 다운로드될 파일의 이름을 설정합니다.
        link.download = "captured_image.png";

        // 링크를 클릭하여 이미지를 다운로드합니다.
        link.click();

        // 다운로드가 완료되면 URL 객체를 해제합니다.
        URL.revokeObjectURL(url);
      });
  };

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
          {capturedImage && <Capture src={capturedImage} width="191px" />}
          <ActionWrapper onClick={showPopup}>
            <SaveBox onClick={() => handleSaveImage()}>
              {" "}
              {/* 이 부분을 수정 */}
              {/* handleSaveImage 함수를 즉시 호출하도록 수정 */}
              <SaveIcon src="images/저장.png" alt="save" width="24px" />
              <SaveText>이미지로 저장</SaveText>
            </SaveBox>
            <ShareBox onClick={handleShareBoxClick}>
              {/* handleShareBoxClick 함수를 즉시 호출하도록 수정 */}
              <ShareIcon src="images/공유.png" alt="share" width="24px" />
              <ShareText>공유하기</ShareText>
            </ShareBox>
          </ActionWrapper>
        </Body>
        {/* 팝업을 조건부로 렌더링합니다. */}
        {popup && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              background: "#B3DBD4",
              boxSizing: "border-box",
              padding: "60px ",
              borderRadius: "6px",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              width: "361px",
              height: "203px",
              color: "white",
              fontSize: "16px",
            }}
          >
            <img
              src="images/팝업.png"
              width="48px"
              height="48px"
              style={{ marginBottom: "16px" }}
            />
            이미지로 저장되었습니다!
          </div>
        )}
      </BodyWrapper>
    </Container>
  );
};

export default Save;
