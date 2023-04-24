import * as React from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

function Results() {
  const { teamCode } = useParams();
  const team: Team = useFetch(
    `https://free-nba.p.rapidapi.com/teams/${teamCode}`,
    null
  );
  const last12dates = [];
  const today = new Date();
  for (let i = 1; i <= 12; i++) {
    today.setDate(today.getDate() - 1);

    last12dates.push(today.toISOString().split('T')[0]);
  }
  const scores: Score[] = useFetch(
    `https://free-nba.p.rapidapi.com/games?page=0&${last12dates.join(
      '&dates[]='
    )}&per_page=12&team_ids[]=${teamCode}`,
    []
  );
  if (!team) return null;
  return (
    <div className="card">
      <h3>
        {team.full_name} [{team.abbreviation}]
      </h3>
      <p>
        {team.conference === 'East'
          ? 'Eastern conference'
          : 'Western conference'}
      </p>
      <hr />
      <p>Score of the last 12 days:</p>
      {scores.map((score) => (
        <p key={score.id}>
          <b>{score.home_team.abbreviation}</b>{' '}
          {`${score.home_team_score} - ${score.visitor_team_score}`}{' '}
          <b>{score.visitor_team.abbreviation}</b>
        </p>
      ))}
      <button id="backBtn" className="bg-green btn-lg">
        <Link to="/">{'<<'} Back to all team stats </Link>
      </button>
    </div>
  );
}
export default Results;
