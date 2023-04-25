import * as React from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { AppContext } from '../App';
import useFetch from '../hooks/useFetch';

function Results() {
  const { teamCode } = useParams();
  const { last12dates } = React.useContext(AppContext);
  const team: Team = useFetch(
    `https://free-nba.p.rapidapi.com/teams/${teamCode}`,
    null
  );
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
      <button className="bg-green btn-lg">
        <Link id="backBtn" to="/">
          {'<<'} Back to all team stats{' '}
        </Link>
      </button>
    </div>
  );
}
export default Results;
