import { useState } from "react";
import "./Form.css";

function Form({ setIsLoading }) {
  const [isError, setIsError] = useState(false);
  const [result, setResult] = useState();
  const apiURL = "https://api.nbp.pl/api/exchangerates/rates/a/";

  const onSubmit = (event) => {
    event.preventDefault();
    const currency = event.target.currency.value;
    const amount = parseFloat(event.target.amount.value);

    if (isNaN(amount) || amount <= 0) {
      alert("Proszę wprowadzić poprawną kwotę.");
      return;
    }

    setResult("");
    setIsLoading(true);
    fetch(`${apiURL}${currency}/?format=json`)
      .then((response) => {
        if (!response.ok) {
          alert("Nie udało się pobrać danych.");
          setIsLoading(false);
        }
        return response.json();
      })
      .then((data) => {
        if (
          data &&
          Array.isArray(data.rates) &&
          data.rates.length > 0 &&
          data.rates[0].mid
        ) {
          const rate = data.rates[0].mid;
          const result = (amount * rate).toFixed(2);
          setIsError(false);

          setResult(`to ${result} PLN`);
        } else {
          setResult("wystąpił błąd, spróbuj później");
          setIsError(true);
        }
      })
      .catch((error) => {
        setResult("Wystąpił błąd: " + error.message);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <main>
      <form className="conventer" onSubmit={onSubmit}>
        <input
          type="number"
          className="amount"
          placeholder="Kwota"
          name="amount"
          step="0.01"
        />
        <select className="currency" name="currency">
          <option value="eur">EUR</option>
          <option value="usd">USD</option>
          <option value="chf">CHF</option>
        </select>

        <button type="submit" className="button">
          Przelicz
        </button>
        <span className={`result ${isError ? "error" : ""}`}>{result}</span>
      </form>
    </main>
  );
}

export default Form;
