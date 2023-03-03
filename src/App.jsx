import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import ImgCripto from "./img/imagen-criptos.png";
import Form from "./components/Form";
import Result from "./components/Result";
import Spinner from "./components/Spinner";

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Image = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`;

const Heading = styled.h1`
  font-family: "Lato", sans-serif;
  color: #fff;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after {
    content: "";
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
    margin: 10px auto 0 auto;
  }
`;
function App() {
  const [coin, setCoin] = useState({});
  const [quote, setQuote] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (Object.keys(coin.length > 0)) {
      const cryptoApiResult = async () => {
        setLoading(true);
        setQuote({});
        const { cryptoCoin, currency } = coin;
        const URL = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoCoin}&tsyms=${currency}`;
        const res = await fetch(URL);
        const result = await res.json();

        if (
          result &&
          result.DISPLAY &&
          result.DISPLAY[cryptoCoin] &&
          result.DISPLAY[cryptoCoin][currency]
        ) {
          setQuote(result.DISPLAY[cryptoCoin][currency]);
        }
        setLoading(false);
      };

      cryptoApiResult();
    }
  }, [coin]);

  return (
    <Container>
      <Image src={ImgCripto} alt='Cripto img' />
      <div>
        <Heading>Cryptocurrency</Heading>
        <Form setCoin={setCoin} />
        {loading && <Spinner />}
        {quote.PRICE && <Result quote={quote} />}
      </div>
    </Container>
  );
}

export default App;
