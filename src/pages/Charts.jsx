import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Link, useParams } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { getCryptoList } from "../api";

// registra os componentes no Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

//pagina de graficos
const Charts = () => {
  //STATES
  const { id } = useParams();
  const [datasets, setDatasets] = useState([]);
  const [lable, setLable] = useState([]);
  const [loading, setLoading] = useState(true);

  //Requisição dos dados
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const fetchCryptos = async () => {
          const datasets = await getCryptoList();
          setLable(datasets.find((data) => data.id === id).name);

          const processedDatasets = datasets.map((data) => {
            return {
              label: data.name,
              data: [data.current_price],
              backgroundColor:
                id === data.id
                  ? "rgba(75, 192, 192, 0.2)"
                  : "rgba(000, 000, 000, 0.2)",
              borderColor:
                id === data.id
                  ? "rgba(75, 192, 192, 1)"
                  : "rgba(000, 000, 000, 0.5)",
              borderWidth: 1,
            };
          });

          setDatasets(processedDatasets);
        };
        fetchCryptos();
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
        text: `Preço Atual de ${datasets[0]?.label}`,
      },
    },
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <Link to="/">Voltar</Link>
      <h1>{lable}</h1>
      {datasets ? (
        <Bar
          data={{
            labels: ["Preço Atual"], // Label para o preço atual
            datasets: datasets, // Dataset dinâmico carregado da API
          }}
          options={options}
        />
      ) : (
        <p>Nenhum dado disponível para exibir.</p>
      )}
    </div>
  );
};

export default Charts;
