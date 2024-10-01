import { useEffect, useState } from "react";
import { getCryptoList } from "../api";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [cryptos, setCryptos] = useState([]);

  useEffect(() => {
    const fetchCryptos = async () => {
      const data = await getCryptoList();
      setCryptos(data);
    };
    fetchCryptos();
  }, []);

  return (
    <div className="container">
      <h1 className="title">Top 10 Criptomoedas</h1>
      <div className="crypto-list">
        {cryptos.map((crypto) => (
          <div key={crypto.id} className="crypto-card">
            <img
              src={crypto.image}
              alt={crypto.name}
              className="crypto-image"
            />
            <h2 className="crypto-name">{crypto.name}</h2>
            <p className="crypto-price">
              Preço: ${crypto.current_price.toFixed(2)}
            </p>
            <p className="crypto-change">
              {crypto.price_change_percentage_24h.toFixed(2)}% nas últimas 24h
            </p>
            <div className="crypto-buttons">
              <Link to={`/details/${crypto.id}`} className="details-button">
                Ver Detalhes
              </Link>
              <Link to={`/charts/${crypto.id}`} className="charts-button">
                Ver Gráficos
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
