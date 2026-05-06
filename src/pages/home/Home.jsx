import { useState } from "react";
import "./home.css";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { FaArrowRightArrowLeft } from "react-icons/fa6";

const Home = () => {
  const valyutalar = [
    {
      id: 1,
      nomi: "USD",
      tuliqNomi: "AQSH Dollari",
      sum: 12800,
      bayroq: "🇺🇸",
      klass: "fi fi-us"
    },
    {
      id: 2,
      nomi: "EUR",
      tuliqNomi: "Evro",
      sum: 13500,
      bayroq: "🇪🇺",
      klass: "fi fi-eu"
    },
    {
      id: 3,
      nomi: "RUB",
      tuliqNomi: "Rossiya Rubli",
      sum: 145,
      bayroq: "🇷🇺",
      klass: "fi fi-ru"
    },
    {
      id: 4,
      nomi: "UZS",
      tuliqNomi: "O'zbekiston So'mi",
      sum: 1,
      bayroq: "🇺🇿",
      klass: "fi fi-uz"
    },
    {
      id: 5,
      nomi: "GBP",
      tuliqNomi: "Britaniya Funti",
      sum: 16200,
      bayroq: "🇬🇧",
      klass: "fi fi-gb"
    }
  ];

  const [miqdor, setMiqdor] = useState(0);
  const [danKurs, setDanKurs] = useState(12800);
  const [gaKurs, setGaKurs] = useState(1);

  const natija = (miqdor * danKurs) / gaKurs;

  return (
    <div className="converter-card">
      <h2 className="title">Valyuta Konvertori</h2>

      <div className="input-field">
        <label>Miqdorni kiriting:</label>
        <input
          type="number"
          min="0"
          className="amount-input"
          placeholder="Masalan: 100"
          onChange={(e) => setMiqdor(Number(e.target.value))}
        />
      </div>

      <div className="select-group">
        <div className="select-item">
          <label>Dan:</label>
          <div className="select-wrapper">
            <span className={valyutalar.find((v) => v.sum === danKurs)?.klass}></span>
            <select
              className="currency-select"
              onChange={(e) => setDanKurs(Number(e.target.value))}
            >
              {valyutalar.map((v) => (
                <option key={v.id} value={v.sum}>
                  {v.bayroq} {v.tuliqNomi}
                </option>
              ))}
            </select>
          </div>
        </div>

        <span className="arrow">
          <FaArrowRightArrowLeft />
        </span>

        <div className="select-item">
          <label>Ga:</label>
          <div className="select-wrapper">
            <span className={valyutalar.find((v) => v.sum === gaKurs)?.klass}></span>
            <select
              className="currency-select"
              defaultValue="1"
              onChange={(e) => setGaKurs(Number(e.target.value))}
            >
              {valyutalar.map((v) => (
                <option key={v.id} value={v.sum}>
                  {v.bayroq} {v.tuliqNomi}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="result-container">
        <p className="result-label">Hisoblangan natija:</p>
        <h1 className="result-value">
          {natija.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </h1>
        <p className="result-sub">Muvaffaqiyatli hisoblandi</p>
      </div>
    </div>
  );
};

export default Home;