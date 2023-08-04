import React, { useState, useRef } from "react";
import styled from "styled-components";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
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
  flex: 1;
  overflow: auto;
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
  bottom: 129px;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-top: 152px;
`;

const ImgUpload1 = styled.img`
  padding-bottom: 10px;
  overflow: auto;
  height: 72px;
  cursor: pointer;
`;
const ImgUpload2 = styled.img`
  padding-bottom: 10px;
  overflow: auto;
  height: 72px;
  cursor: pointer;
`;
const ImgUpload3 = styled.img`
  padding-bottom: 10px;
  overflow: auto;
  height: 72px;
  cursor: pointer;
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

const Footer = styled.footer`
  background: #55877e;
  height: 80px;
  width: 100%;
`;

const ToolBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  height: 100%;
  align-items: center;
  padding: 0 15px;
`;

const LayoutIcon = styled.img`
  /* LayoutIcon 스타일링 */
  cursor: pointer;
`;

const Write = () => {
  const navigate = useNavigate();
  const [mdinfo, setMD] = useState("");
  const [title, setTitle] = useState("");
  const imageInputRef1 = useRef(null);
  const imageInputRef2 = useRef(null);
  const imageInputRef3 = useRef(null);

  const getFormattedDate = () => {
    const today = moment().format("YYYY . MM . DD ddd");
    return today;
  };

  const getFormattedDate2 = () => {
    const today = moment().format("YYYY-MM-DD");
    return today;
  };

  const handleSubmitBoxClick = () => {
    navigate("/save");
  };

  const handleImageUpload = (event, imgRef) => {
    const file = event.target.files[0];
    console.log("Uploaded file:", file);

    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (imgRef && imgRef.current) {
        imgRef.current.src = reader.result;
      }
    };
    reader.readAsDataURL(file);

    event.target.value = "";
  };

  const stopPropagation = (event) => {
    event.stopPropagation();
  };

  const handleSubmitClick = async () => {
    try {
      // 폼에서 입력된 데이터로 새로운 포스트 객체를 생성합니다.
      const newPost = {
        title: title, // title은 포스트의 제목을 담는 상태 변수입니다.
        content: mdinfo, // mdinfo는 Markdown 내용을 담는 상태 변수입니다.

        // 필요에 따라 이미지 URL들을 배열로 추가할 수 있습니다. 예: images: [img1URL, img2URL, img3URL]
      };

      // axios를 사용하여 새로운 포스트를 서버로 보냅니다. HTTP POST 요청을 사용합니다.
      // 서버로 전송하기 전에 불필요한 순환 참조를 없애기 위해 이미지 업로드 부분을 제외하고 전송합니다.
      const { title, content } = newPost; // 이미지 관련 속성을 제외하고 가져옵니다.

      const response = await axios.post("https://127.0.0.1:8000/books", {
        title: title, // title은 포스트의 제목을 담는 상태 변수입니다.
        date: getFormattedDate2(),
        type_name: "Type1",
      });

      // 만약 포스트가 성공적으로 생성되었다면, 다른 페이지로 이동시킵니다.
      if (response.status === 201) {
        navigate("/save"); // "/success"를 원하는 성공 페이지의 URL로 바꿔주세요.
      } else {
        console.error("포스트 생성에 실패했습니다.");
        // 실패했을 경우에 대한 에러 처리 또는 사용자에게 에러 메시지를 보여줍니다.
      }
    } catch (error) {
      console.error("포스트 생성 중 에러 발생:", error);
      // 에러 처리 또는 사용자에게 에러 메시지를 보여줍니다.
    }
  };

  return (
    <Container id="write-component">
      <BodyWrapper>
        <Header>
          <BackButton
            onClick={() => navigate(-1)}
            src="images/뒤로가기.png"
            alt="back"
            width="16px"
          />
        </Header>
        <Body>
          <FormHeader>
            <Date>{getFormattedDate()}</Date>
            <SubmitBox onClick={handleSubmitBoxClick}>
              <SubmitIcon
                src="images/저장.png"
                alt="save"
                width="24px"
                onClick={handleSubmitBoxClick}
              />
              <SubmitButton type="submit" onClick={handleSubmitClick}>
                저장
              </SubmitButton>
            </SubmitBox>
          </FormHeader>
          <FormContent>
            <Title
              name="title"
              placeholder="제목을 입력하세요"
              maxLength="30"
              onChange={setTitle}
            />
            <Content name="content">
              <div className="markarea">
                <div data-color-mode="light">
                  <MDEditor value={mdinfo} onChange={setMD} height={300} />
                </div>
              </div>
              <ImgBox>
                <label htmlFor="imgUpload1">
                  <ImgUpload1
                    src="images/샘플.png"
                    width="72px"
                    ref={imageInputRef1}
                    onClick={(event) => {
                      stopPropagation(event);
                      imageInputRef1.current.click();
                    }}
                  />
                  <input
                    type="file"
                    id="imgUpload1"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(event) =>
                      handleImageUpload(event, imageInputRef1)
                    }
                  />
                </label>
                <label htmlFor="imgUpload2">
                  <ImgUpload2
                    src="images/샘플.png"
                    width="72px"
                    ref={imageInputRef2}
                    onClick={(event) => {
                      stopPropagation(event);
                      imageInputRef2.current.click();
                    }}
                  />
                  <input
                    type="file"
                    id="imgUpload2"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(event) =>
                      handleImageUpload(event, imageInputRef2)
                    }
                  />
                </label>
                <label htmlFor="imgUpload3">
                  <ImgUpload3
                    src="images/샘플.png"
                    width="72px"
                    ref={imageInputRef3}
                    onClick={(event) => {
                      stopPropagation(event);
                      imageInputRef3.current.click();
                    }}
                  />
                  <input
                    type="file"
                    id="imgUpload3"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(event) =>
                      handleImageUpload(event, imageInputRef3)
                    }
                  />
                </label>
              </ImgBox>
              <TotalBox>
                <TotalTag>Total</TotalTag>
                <Total>00won</Total>
              </TotalBox>
            </Content>
          </FormContent>
          <Bottom src="images/Bottom.png"></Bottom>
        </Body>
        <Footer>
          <ToolBox>
            <LayoutIcon
              src="images/레이아웃 양식.png"
              alt="layout"
              width="24px"
              onClick={() => navigate("/Writeform1")}
            />
          </ToolBox>
        </Footer>
      </BodyWrapper>
    </Container>
  );
};

export default Write;
