import * as React from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../App';
import useFetch from '../hooks/useFetch';

const uniqueKey = () => Math.random().toString();

function Team({ id, full_name, abbreviation, conference }: Team) {
  const { last12dates, selectedTeams, setSelectedTeams } =
    React.useContext(AppContext);

  const scores: Score[] = useFetch(
    `https://free-nba.p.rapidapi.com/games?page=0&${last12dates.join(
      '&dates[]='
    )}&per_page=12&team_ids[]=${id}`,
    []
  );

  const removeTeam = () =>
    setSelectedTeams(selectedTeams.filter((team) => team.id !== id));

  const {
    result,
    scored,
    conceded,
  }: { result: boolean[]; scored: number; conceded: number } = scores.reduce(
    (acc, score) => {
      if (score.home_team.id === id)
        return {
          result: [
            ...acc.result,
            score.home_team_score > score.visitor_team_score,
          ],
          scored: acc.scored + score.home_team_score,
          conceded: acc.conceded + score.visitor_team_score,
        };
      else
        return {
          result: [
            ...acc.result,
            score.home_team_score < score.visitor_team_score,
          ],
          scored: acc.scored + score.visitor_team_score,
          conceded: acc.conceded + score.home_team_score,
        };
    },
    { result: [], scored: 0, conceded: 0 }
  );

  return (
    <div className="card">
      <div className="team-name">
        <h3>
          {full_name} [{abbreviation}]
        </h3>
        <button
          id={`remove${abbreviation}`}
          className="clear"
          onClick={removeTeam}
        >
          &times;
        </button>
      </div>
      <p>
        {conference === 'East' ? 'Eastern conference' : 'Western conference'}
      </p>
      <hr />
      <div className="team-name">
        <div>
          <span>Score of the last 12 days:</span>
          <ul>
            {result.map((win) => (
              <li
                key={uniqueKey()}
                className={`game-result bg-${win ? 'green' : 'red'}`}
              >
                {win ? 'W' : 'L'}
              </li>
            ))}
          </ul>
          <p>
            Avg points scored:{' '}
            <b>{Math.floor(scored / (result.length || 1))}</b>
          </p>
          <p>
            Avg points conceded:{' '}
            <b>{Math.floor(conceded / (result.length || 1))}</b>
          </p>
        </div>
        <img
          alt={`${full_name}'s logo`}
          src={`https://interstate21.com/nba-logos/${abbreviation}.png`}
          width="150px"
        />
      </div>
      <button className="bg-green">
        <Link id={`results${abbreviation}`} to={`results/${id}`}>
          See game results {'>>'}
        </Link>
      </button>
    </div>
  );
}

export default Team;
