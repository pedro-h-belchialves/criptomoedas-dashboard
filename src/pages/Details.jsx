import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCryptoDetails } from "../api";
import "./Details.css";

const Details = () => {
  const { id } = useParams();
  const [crypto, setCrypto] = useState(null);

  useEffect(() => {
    const fetchCryptoDetails = async () => {
      const data = await getCryptoDetails(id);
      setCrypto(data);
    };
    fetchCryptoDetails();
  }, [id]);

  return (
    <div className="container">
      {crypto ? (
        <div className="crypto-details">
          <div className="details-header">
            <img src={crypto.image.large} alt={crypto.name} />
            <h1>
              {crypto.name} ({crypto.symbol.toUpperCase()})
            </h1>
          </div>
          <div className="details-info">
            <p>
              <strong>Preço Atual:</strong> $
              {crypto.market_data.current_price.usd}
            </p>
            <p>
              <strong>Market Cap:</strong> $
              {crypto.market_data.market_cap.usd.toLocaleString()}
            </p>
            <p>
              <strong>Supply Total:</strong>{" "}
              {crypto.market_data.total_supply?.toLocaleString() || "N/A"}
            </p>
          </div>
          <div className="details-buttons">
            <Link to={`/charts/${crypto.id}`} className="charts-button">
              Ver Gráficos
            </Link>
          </div>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};

export default Details;
