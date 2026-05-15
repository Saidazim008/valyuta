import { useState, useEffect, useCallback } from "react";
import "./home.css";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { FaArrowRightArrowLeft } from "react-icons/fa6";

const Home = () => {
  const [valyutalar, setValyutalar] = useState([
    { id: 1, nomi: "USD", tuliqNomi: "AQSH Dollari", sum: 12850, bayroq: "🇺🇸", klass: "fi fi-us" },
    { id: 2, nomi: "EUR", tuliqNomi: "Evro", sum: 13900, bayroq: "🇪🇺", klass: "fi fi-eu" },
    { id: 3, nomi: "RUB", tuliqNomi: "Rossiya Rubli", sum: 138, bayroq: "🇷🇺", klass: "fi fi-ru" },
    { id: 4, nomi: "GBP", tuliqNomi: "Britaniya Funti", sum: 16100, bayroq: "🇬🇧", klass: "fi fi-gb" },
    { id: 5, nomi: "TRY", tuliqNomi: "Turk Lirasi", sum: 370, bayroq: "🇹🇷", klass: "fi fi-tr" },
    { id: 6, nomi: "KZT", tuliqNomi: "Qozog'iston Tengesi", sum: 27, bayroq: "🇰🇿", klass: "fi fi-kz" },
    { id: 7, nomi: "CNY", tuliqNomi: "Xitoy Yuani", sum: 1780, bayroq: "🇨🇳", klass: "fi fi-cn" },
    { id: 8, nomi: "UZS", tuliqNomi: "O'zbekiston So'mi", sum: 1, bayroq: "🇺🇿", klass: "fi fi-uz" },
  ]);

  const [miqdor, setMiqdor] = useState(0);
  const [danValyuta, setDanValyuta] = useState("USD");
  const [gaValyuta, setGaValyuta] = useState("UZS");

  const getKurslar = useCallback(() => {
    fetch("https://cbu.uz/uz/arkhiv-kursov-valyut/json/")
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data)) {
          setValyutalar((oldValyutalar) => {
            return oldValyutalar.map((v) => {
              if (v.nomi === "UZS") return v;
              const apiData = data.find((item) => item.Ccy === v.nomi);
              return apiData ? { ...v, sum: parseFloat(apiData.Rate) } : v;
            });
          });
        }
      })
      .catch((err) => console.error("Markaziy Bank API xatosi:", err));
  }, []);

  useEffect(() => {
    getKurslar();
  }, [getKurslar]);

  const danObj = valyutalar.find((v) => v.nomi === danValyuta) || valyutalar[0];
  const gaObj = valyutalar.find((v) => v.nomi === gaValyuta) || valyutalar[7];

  const natija = (miqdor * danObj.sum) / gaObj.sum;

  // Strelka bosilganda valyutalarni almashtirish funksiyasi
  const almashtirish = () => {
    setDanValyuta(gaValyuta);
    setGaValyuta(danValyuta);
  };

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
            {/* Bayroq endi select ustini to'sib qo'ymaydi */}
            <span className={`currency-flag ${danObj.klass}`}></span>
            <select
              className="currency-select"
              value={danValyuta}
              onChange={(e) => setDanValyuta(e.target.value)}
            >
              {valyutalar.map((v) => (
                <option key={v.id} value={v.nomi}>
                  {v.nomi} — {v.tuliqNomi}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="arrow" onClick={almashtirish} title="Almashtirish">
          <FaArrowRightArrowLeft />
        </div>

        <div className="select-item">
          <label>Ga:</label>
          <div className="select-wrapper">
            <span className={`currency-flag ${gaObj.klass}`}></span>
            <select
              className="currency-select"
              value={gaValyuta}
              onChange={(e) => setGaValyuta(e.target.value)}
            >
              {valyutalar.map((v) => (
                <option key={v.id} value={v.nomi}>
                  {v.nomi} — {v.tuliqNomi}
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
          })}{" "}
          <span className="result-currency">{gaObj.nomi}</span>
        </h1>
        <p className="result-sub">Markaziy Bankning joriy rasmiy kursi asosida</p>
      </div>
    </div>
  );
};

export default Home;