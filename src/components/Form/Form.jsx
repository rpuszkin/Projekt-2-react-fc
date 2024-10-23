import { useState } from "react";
import "./Form.css";

function Form() {
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
    //loader.classList.remove("hidden");

    fetch(`${apiURL}${currency}/?format=json`)
      .then((response) => {
        if (!response.ok) {
          alert("Nie udało się pobrać danych.");
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
          //loader.classList.add("hidden");
          setResult(`to ${result} PLN.`);
          //resultDiv.style.color = "black";
        } else {
          setResult("wystąpił błąd, spróbu później");
        }
      })
      .catch((error) => {
        //loader.classList.add("hidden");
        setResult("Wystąpił błąd: " + error.message);
        //resultDiv.style.color = "red";
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
        <span className="result">{result}</span>
      </form>
    </main>
  );
}

export default Form;
