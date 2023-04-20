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

    last12dates.push(today);
  }
  const scores: Team = useFetch(
    `https://free-nba.p.rapidapi.com/games?page=0&dates[]=2022-12-06&dates[]=2022-12-05&dates[]=2022-12-04${teamCode}&per_page=12&team_ids[]=${teamCode}`,
    null
  );
  debugger;
  if (!team) return null;
  return (
    <div>
      <h3>
        {team.full_name} [{team.abbreviation}]
      </h3>
      <p>{team.conference}</p>
      <hr />
      <p>Score of the last 12 days</p>

      <Link to="/">return</Link>
    </div>
  );
}
export default Results;
