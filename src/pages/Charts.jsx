import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useParams } from "react-router-dom";

const Charts = () => {
  const { id } = useParams();
  const [datasets, setDatasets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}`
        );
        const data = await response.json();

        if (data.market_data && data.market_data.current_price) {
          const processedDatasets = [
            {
              label: data.name,
              data: [data.market_data.current_price.usd],
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ];

          setDatasets(processedDatasets);
        } else {
          console.error("Dados de preço não disponíveis.");
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Título do Gráfico",
      },
    },
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      {datasets.length > 0 ? (
        <Bar data={{ datasets }} options={options} />
      ) : (
        <p>Nenhum dado disponível para exibir.</p>
      )}
    </div>
  );
};

export default Charts;
