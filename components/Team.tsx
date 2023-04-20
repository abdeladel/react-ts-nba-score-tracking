import * as React from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../App';

function Team({
  id,
  name,
  full_name,
  abbreviation,
  city,
  conference,
  division,
}) {
  const { selectedTeams, setSelectedTeams } = React.useContext(AppContext);

  const removeTeam = () =>
    setSelectedTeams(selectedTeams.filter((team) => team.id !== id));

  return (
    <div>
      <h2>{name}</h2>
      <button onClick={removeTeam}>x</button>
      <button>
        <Link to={`results/${id}`}>details</Link>
      </button>
    </div>
  );
}

export default Team;
