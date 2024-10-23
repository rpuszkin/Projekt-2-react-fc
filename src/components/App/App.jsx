import "./App.css";

function App() {
  return (
    <>
      <header className="header">
        <img src="media/logo.png" alt="logo" className="logo" />
        <h1 className="title">Przelicznik walut</h1>
      </header>
      <main className="converter-container">
        <div id="loader" className="loader hidden">
          Ładowanie...
        </div>
        <form id="form" className="conventer">
          <input
            type="number"
            id="amount"
            className="amount"
            placeholder="Kwota"
            step="0.01"
          />
          <select id="currency" className="currency">
            <option value="eur">EUR</option>
            <option value="usd">USD</option>
            <option value="chf">CHF</option>
          </select>

          <button type="submit" id="convertBtn" className="button">
            Przelicz
          </button>
          <span id="result" className="result"></span>
        </form>
      </main>
    </>
  );
}

export default App;
