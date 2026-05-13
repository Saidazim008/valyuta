import { useState, useEffect, useCallback } from "react";
import "./home.css";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { FaArrowRightArrowLeft } from "react-icons/fa6";

const Home = () => {
  // Dastlabki (default) valyutalar ro'yxati
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

  // API'dan ma'lumot olish funksiyasi
  const getKurslar = useCallback(() => {
    fetch("https://cbu.uz/uz/arkhiv-kursov-valyut/json/")
      .then((res) => res.json())
      .then((data) => {
        setValyutalar((oldValyutalar) => {
          const newValues = oldValyutalar.map((v) => {
            if (v.nomi === "UZS") return v;
            const apiData = data.find((item) => item.Ccy === v.nomi);
            return apiData ? { ...v, sum: parseFloat(apiData.Rate) } : v;
          });

          // Sayt yuklanganda USD kursini avtomatik tanlash
          const currentUsd = newValues.find(v => v.nomi === "USD");
          if (currentUsd) setDanKurs(currentUsd.sum);

          return newValues;
        });
      })
      .catch((err) => console.error("API bilan bog'lanishda xato:", err));
  }, []);

  useEffect(() => {
    getKurslar();
  }, [getKurslar]);

  // Hisoblash formulasi
  const natija = (miqdor * danKurs) / gaKurs;

  // Joriy tanlangan valyutalarning klassini topish (bayroqlar uchun)
  const danKlass = valyutalar.find((v) => v.sum === danKurs)?.klass || "";
  const gaKlass = valyutalar.find((v) => v.sum === gaKurs)?.klass || "";

  return (
    <div className="converter-card">
      <h2 className="title">Valyuta Konvertori</h2>

      <div className="input-field">
        <label>Miqdorni kiriting:</label>
        <input
          type="number"
          className="amount-input"
          placeholder="Masalan: 100"
          value={miqdor || ""}
          onChange={(e) => setMiqdor(Number(e.target.value))}
        />
      </div>

      <div className="select-group">
        <div className="select-item">
          <label>Dan:</label>
          <div className="select-wrapper">
            <span className={danKlass}></span>
            <select
              className="currency-select"
              value={danKurs}
              onChange={(e) => setDanKurs(Number(e.target.value))}
            >
              {valyutalar.map((v) => (
                <option key={v.id} value={v.sum}>
                  {v.nomi} ({v.tuliqNomi})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="arrow">
          <FaArrowRightArrowLeft />
        </div>

        <div className="select-item">
          <label>Ga:</label>
          <div className="select-wrapper">
            <span className={gaKlass}></span>
            <select
              className="currency-select"
              value={gaKurs}
              onChange={(e) => setGaKurs(Number(e.target.value))}
            >
              {valyutalar.map((v) => (
                <option key={v.id} value={v.sum}>
                  {v.nomi} ({v.tuliqNomi})
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
        <p className="result-sub">Markaziy Bankning rasmiy kursi asosida</p>
      </div>
    </div>
  );
};

export default Home;