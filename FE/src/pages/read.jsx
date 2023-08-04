import React, { useState, useRef } from "react";
import styled from "styled-components";
import MDEditor from "@uiw/react-md-editor";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  text-align: center;
  background-color: #f5f0e4;
  overflow: auto;
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
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
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
  margin-top: 59px;
`;
const Clip1 = styled.img`
  width: 46px;
  position: absolute;
  top: 82px;
`;
const Clip3 = styled.img`
  width: 46px;
  position: absolute;
  top: 163px;
  left: 40%;
`;

const FormHeader = styled.div`
  border-radius: 6px;
  background: #55877e;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  height: 76px;
  box-sizing: border-box;
  padding: 8px 13px 8px 10px;
`;
const SubmitIcon = styled.div`
  width: 236px;
  height: 52px;
  border-radius: 6px;
  background: #55877e;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  margin: 0 auto;
  margin-top: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
`;
const SubmitImage = styled.img``;

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

const UpdateBox = styled.div`
  box-sizing: border-box;
  float: right;
  width: 20%;
  height: 56px;
  background-color: white;
  border-radius: 6px;
  font-family: Inter;
  display: flex;
  justify-content: center;
  margin-top: 3px;
`;

const UpdateButton = styled.button`
  background-color: white;
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

const FormContentWrapper = styled.div`
  /* FormContentWrapper 스타일링 */
`;

const FormContent = styled.div`
  box-sizing: border-box;
  height: 80%;
  border-radius: 6px;
  background: #b3dbd4;
  padding: 8px 5px;
  margin-top: 10px;
  box-shadow: 2px 0 8px #b8b5ac, -2px 0 8px #b8b5ac;
`;

const Bottom = styled.img`
  width: 100%;
  margin-top: -5px;
  filter: drop-shadow(0px 4px 3px #b8b5ac);
`;

const Title = styled.input`
  border-radius: 6px;
  background: #fff;
  border: none;
  width: 95%;
  height: 39px;
  margin: 0;
  text-align: center;
  font-family: "Inter", sans-serif;
  ::placeholder {
    font-family: "Inter", sans-serif;
    color: #b3dbd4;
  }
  &:focus {
    outline: none;
  }
`;

const Content = styled.div`
  width: 95%;
  height: 560px;
  border-radius: 6px;
  margin: auto;
  margin-top: 30px;
  background-color: white;
  font-family: "Inter", sans-serif;
  -ms-overflow-style: none;
  padding-bottom: 23px;
`;

const ImgBox = styled.div`
  margin: 0 auto;
  height: auto;
  width: 70%;
  border-radius: 6px;
  border: 2px solid #55877e;
  display: flex;
  justify-content: space-between;
  align-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 20px 17px 10px 17px;
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-top: 152px;
`;

const ImgUpload1 = styled.img`
  padding-bottom: 10px;
  overflow: auto;
  height: 72px;
`;
const ImgUpload2 = styled.img`
  padding-bottom: 10px;
  overflow: auto;
  height: 72px;
`;
const ImgUpload3 = styled.img`
  padding-bottom: 10px;
  overflow: auto;
  height: 72px;
`;

const TotalBox = styled.div`
  margin: 0 auto;
  height: auto;
  width: 79%;
  border-radius: 6px;
  border: 2px solid #55877e;
  display: flex;
  justify-content: space-between;
  align-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  box-sizing: border-box;
  padding: 11px 65px;
  position: absolute;
  z-index: 1;
  bottom: 115px;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-top: 281px;
`;

const TotalTag = styled.div``;

const Total = styled.div``;

const Read = () => {
  const navigate = useNavigate();
  const [capturedImage, setCapturedImage] = useState(null);
  const captureContainerRef = useRef(null); // Ref 생성

  const handleSubmitBoxClick = () => {
    // Ref를 사용하여 캡처할 요소를 선택
    const captureContainer = captureContainerRef.current;

    if (!captureContainer) {
      console.error("캡처할 요소를 찾을 수 없습니다.");
      return;
    }

    // 페이지 캡처 실행
    html2canvas(captureContainer).then((canvas) => {
      // 캡처한 이미지를 데이터 URL로 변환하여 상태에 저장
      setCapturedImage(canvas.toDataURL("image/png"));
      // 페이지 저장 화면으로 이동
      navigate("/save", {
        state: { capturedImage: canvas.toDataURL("image/png") },
      });
    });
  };

  const handleUpdateBoxClick = () => {
    navigate("/write");
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
          <form>
            <Clip1 src="images/clip1.png"></Clip1>
            <FormHeader>
              <Date>2023 . 05 . 15 MON</Date>
              <UpdateBox onClick={handleUpdateBoxClick}>
                <UpdateButton>수정하기</UpdateButton>
              </UpdateBox>
            </FormHeader>
            <Clip3 src="images/clip3.png"></Clip3>
            <FormContentWrapper ref={captureContainerRef}>
              <FormContent>
                <Title name="title" />
                <Content name="content">
                  <div
                    className="markdownDiv"
                    data-color-mode="light"
                    style={{ padding: 15 }}
                  >
                    <MDEditor.Markdown
                      style={{ padding: 10 }}
                      height={300}
                      // source={mkdStr}
                    />
                  </div>
                  <ImgBox>
                    <ImgUpload1 src="images/샘플.png" width="72px"></ImgUpload1>
                    <ImgUpload2 src="images/샘플.png" width="72px"></ImgUpload2>
                    <ImgUpload3 src="images/샘플.png" width="72px"></ImgUpload3>
                  </ImgBox>
                  <TotalBox>
                    <TotalTag>Total</TotalTag>
                    <Total>00won</Total>
                  </TotalBox>
                </Content>
              </FormContent>
            </FormContentWrapper>
          </form>
          <Bottom src="images/Bottom.png"></Bottom>
          <SubmitIcon
            onClick={handleSubmitBoxClick}
            src="images/저장.png"
            alt="save"
            width="24px"
          >
            <SubmitImage src="images/이미지0.png" width="24px"></SubmitImage>
            이미지로 저장 / 공유하기
          </SubmitIcon>
        </Body>
      </BodyWrapper>
    </Container>
  );
};

export default Read;
