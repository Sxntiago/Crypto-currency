import React from "react";
import styled from "@emotion/styled";

const Quote = styled.div`
  color: #fff;
  font-family: "Lato", sans-serif;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 30px;
`;

const Img = styled.img`
  width: 120px;
  display: block;
`;
const QuoteText = styled.p`
  font-size: 18px;
  span {
    font-weight: 700;
  }
`;
const QuotePrice = styled.span`
  font-size: 24px;
  span {
    font-weight: 700;
  }
`;

const Result = ({ quote }) => {
  const { PRICE, HIGHDAY, LOWDAY, IMAGEURL, LASTUPDATE, CHANGEPCT24HOUR } =
    quote;
  return (
    <Quote>
      <Img
        src={`https://cryptocompare.com/${IMAGEURL}`}
        alt='img of each crypto by api'
      />
      <div>
        <QuotePrice>
          The Price is:<span>{PRICE}</span>
        </QuotePrice>
        <QuoteText>
          The highest price of the day:<span>{HIGHDAY}</span>
        </QuoteText>
        <QuoteText>
          The lowest price of the day:<span>{LOWDAY}</span>
        </QuoteText>
        <QuoteText>
          Last update:<span>{LASTUPDATE}</span>
        </QuoteText>
        <QuoteText>
          Variation of the last 24 hours:<span>{CHANGEPCT24HOUR}</span>
        </QuoteText>
      </div>
    </Quote>
  );
};

export default Result;
