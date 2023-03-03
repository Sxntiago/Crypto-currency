import React, { useState } from "react";
import styled from "@emotion/styled";
import useSelect from "../hooks/useSelect";
import { coin } from "../data/currency.js";
import { useEffect } from "react";
import Error from "./Err";

const InputSubmit = styled.input`
  background-color: #9497ff;
  border: none;
  width: 100%;
  padding: 10px;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 5px;
  margin-top: 20px;
  cursor: pointer;

  &:hover {
    background-color: #7a7dfe;
  }
`;

const Form = ({ setCoin }) => {
  const [crypto, setCrypto] = useState([]);
  const [err, setErr] = useState(false);
  const [currency, SelectCurrency] = useSelect("Choose your currency", coin);
  const [cryptoCoin, SelectCryptoCoin] = useSelect("Choose Crypto", crypto);

  useEffect(() => {
    const api = async () => {
      const URL =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=15&tsym=USD";
      const res = await fetch(URL);
      const result = await res.json();

      const cryptoArray = result.Data.map((crypto) => {
        const object = {
          id: crypto.CoinInfo.Name,
          name: crypto.CoinInfo.FullName,
        };
        return object;
      });
      setCrypto(cryptoArray);
    };
    api();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if ([currency, cryptoCoin].includes("")) {
      setErr(true);
      return;
    }
    setErr(false);
    setCoin({ currency, cryptoCoin });
  };
  return (
    <>
      {err && <Error>All the fields are required</Error>}
      <form onSubmit={handleSubmit}>
        <SelectCurrency />
        <SelectCryptoCoin />
        <InputSubmit type='submit' value='Quote' />
      </form>
    </>
  );
};

export default Form;
