import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './index.module.css'

const FootballData = () => {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://v3.football.api-sports.io/standings', {
          headers: {
            'x-rapidapi-host': 'v3.football.api-sports.io',
            'x-rapidapi-key': '651fa392f68e5ff68951614e28303b28'
          },
          params: {
            league: '71', // ID da Brasileirão Série A
            season: '2024' // Temporada
          }
        });
        console.log(response.data); // Verifique a estrutura dos dados
        setTeams(response.data.response[0].league.standings[0]); // Ajuste conforme a estrutura dos dados
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Erro: {error.message}</div>;
  }

  if (!teams.length) {
    return <div>Carregando...</div>;
  }

  return (
    <div className={styles.containerTabela}>
      <h1 className={styles.titulo}>Classificação da Brasileirão Série A</h1>
      <table className={styles.tabela} >
        <thead>
        {teams.map((team) => (
          <tr key={team.team.id}>
            <th>{team.rank}. {team.team.name}</th>
            <img src={team.team.logo} alt={`Logotipo do ${team.team.name}`} width={25} height={25} />
            <th>Pontos: {team.points}</th>
            <th>Vitórias: {team.all.win}</th>
            <th>Empates: {team.all.draw}</th>
            <th>Derrotas: {team.all.lose}</th>
          </tr>
        ))}
        </thead>
      </table>
    </div>
  );
};

export default FootballData;
