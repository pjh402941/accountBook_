import React, { useState } from "react";
import styled from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";
import "./Calendarstyle.css";

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
  position: relative;
  height: 46px;
  background: #55877e;
`;

const Backbutton = styled.div`
  position: relative;
  margin-left: -90%;
  padding-top: 15px;
  cursor: pointer;
`;

const Topclip = styled.div`
  width: 14px;
  height: 36px;
  flex-shrink: 0;
  margin: 0 auto;
  margin-top: -35px;
  margin-left: 90px;
  fill: #b3dbd4;
  stroke-width: 0.5px;
  stroke: #55877e;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

const Topgreenbox = styled.div`
  display: inline-flex;
  padding: 10px;
  align-items: flex-start;
  gap: 10px;

  width: 190px;
  height: 30px;
  margin: 0 auto;
  margin-top: 40px;
  border-radius: 6px;
  background: #55877e;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

const Toptitletext = styled.div`
  color: #fff;
  text-align: center;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  width: 300px;
  margin: 0 auto;
  margin-left: -115px;
`;

const Celendericon = styled.div`
  color: #fff;
  text-align: center;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin: 0 auto;
  margin-top: 2px;
`;

const Calendarbox = styled.div`
  width: 300px;
  padding: 12px 26px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 11px;
  margin: 0 auto;
  margin-top: 40px;
  border-radius: 6px;
  background: #2a534c;
`;

const SelectBtn = styled.button`
  display: inline-flex;
  padding: 6px 36px;
  align-items: flex-start;
  gap: 10px;
  margin: 0 auto;
  margin-top: 30px;
  border-radius: 6px;
  background: #55877e;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border: none;
  cursor: pointer;
`;

const SelectText = styled.div`
  color: #fff;
  text-align: center;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

function ReactCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const formatDate = (date) => {
    return date.toLocaleString("ko-KR", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const style = {};
  return (
    <div>
      <Calendar
        locale="kr"
        onChange={handleDateChange}
        value={selectedDate}
        onClickDay={handleDateChange}
        calendarType={"US"}
      />
      <p style={{ color: "white" }}>선택한 날짜 : {formatDate(selectedDate)}</p>
    </div>
  );
}

const Dayselect = () => {
  const navigate = useNavigate();
  const navigateTowrite = () => {
    navigate("/write");
  };

  const onClickBtn = () => {
    navigate(-1); // 바로 이전 페이지로 이동, '/main' 등 직접 지정도 당연히 가능
  };

  return (
    <Container>
      <BodyWrapper>
        <Topbar>
          <Backbutton onClick={onClickBtn}>
            <img
              src={`${process.env.PUBLIC_URL}/images/back.png`}
              alt="back"
              width="16px"
            />
          </Backbutton>
        </Topbar>
        <Topgreenbox>
          <Topclip>
            <img
              src={`${process.env.PUBLIC_URL}/images/topclip.png`}
              alt="topclip"
            />
          </Topclip>
          <Toptitletext>나의 가계부 달력</Toptitletext>
          <Celendericon>
            <img
              src={`${process.env.PUBLIC_URL}/images/celender2.png`}
              alt="celender2"
            />
          </Celendericon>
        </Topgreenbox>

        <Calendarbox>
          <ReactCalendar></ReactCalendar>
        </Calendarbox>

        <SelectBtn onClick={navigateTowrite}>
          <SelectText>날짜 선택</SelectText>
        </SelectBtn>
      </BodyWrapper>
    </Container>
  );
};
export default Dayselect;
