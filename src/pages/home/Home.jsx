import { useState, useEffect } from "react";
import "./home.css";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { FaArrowRightArrowLeft } from "react-icons/fa6";

const Home = () => {
  // Eng kerakli valyutalar ro'yxati kengaytirildi
  const [valyutalar, setValyutalar] = useState([
    { id: 1, nomi: "USD", tuliqNomi: "AQSH Dollari", sum: 12800, bayroq: "🇺🇸", klass: "fi fi-us" },
    { id: 2, nomi: "EUR", tuliqNomi: "Evro", sum: 13500, bayroq: "🇪🇺", klass: "fi fi-eu" },
    { id: 3, nomi: "RUB", tuliqNomi: "Rossiya Rubli", sum: 145, bayroq: "🇷🇺", klass: "fi fi-ru" },
    { id: 4, nomi: "GBP", tuliqNomi: "Britaniya Funti", sum: 16200, bayroq: "🇬🇧", klass: "fi fi-gb" },
    { id: 5, nomi: "TRY", tuliqNomi: "Turk Lirasi", sum: 400, bayroq: "🇹🇷", klass: "fi fi-tr" },
    { id: 6, nomi: "KZT", tuliqNomi: "Qozog'iston Tengesi", sum: 28, bayroq: "🇰🇿", klass: "fi fi-kz" },
    { id: 7, nomi: "CNY", tuliqNomi: "Xitoy Yuani", sum: 1800, bayroq: "🇨🇳", klass: "fi fi-cn" },
    { id: 8, nomi: "UZS", tuliqNomi: "O'zbekiston So'mi", sum: 1, bayroq: "🇺🇿", klass: "fi fi-uz" },
  ]);

  const [miqdor, setMiqdor] = useState(0);
  const [danKurs, setDanKurs] = useState(12800);
  const [gaKurs, setGaKurs] = useState(1);

  useEffect(() => {
    fetch("https://cbu.uz/uz/arkhiv-kursov-valyut/json/")
      .then((res) => res.json())
      .then((data) => {
        const yangilangan = valyutalar.map((v) => {
          if (v.nomi === "UZS") return v;
          const apiValyuta = data.find((item) => item.Ccy === v.nomi);
          return apiValyuta ? { ...v, sum: Number(apiValyuta.Rate) } : v;
        });
        setValyutalar(yangilangan);

        // Boshlang'ich kursni bankdan kelgan USD kursiga yangilab qo'yamiz
        const liveUsd = yangilangan.find(v => v.nomi === "USD");
        if (liveUsd) setDanKurs(liveUsd.sum);
      })
      .catch((err) => console.log("Xatolik:", err));
  }, []);

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
              value={danKurs}
              onChange={(e) => setDanKurs(Number(e.target.value))}
            >
              {valyutalar.map((v) => (
                <option key={v.id} value={v.sum}>
                  {v.bayroq} {v.nomi}
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
              value={gaKurs}
              onChange={(e) => setGaKurs(Number(e.target.value))}
            >
              {valyutalar.map((v) => (
                <option key={v.id} value={v.sum}>
                  {v.bayroq} {v.nomi}
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
        <p className="result-sub">Markaziy Bankning rasmiy kursi</p>
      </div>
    </div>
  );
};

export default Home;