import * as React from 'react';
import { AppContext } from '../App';
import useFetch from '../hooks/useFetch';
import Team from './Team';

function Home() {
  const allTeams: Team[] = useFetch(
    'https://free-nba.p.rapidapi.com/teams',
    []
  );

  const [selectedTeamId, setSelectedTeamId] = React.useState<number>(null);
  const { selectedTeams, setSelectedTeams } = React.useContext(AppContext);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTeamId(parseInt(event.target.value));
  };

  const addTeam = () => {
    if (!selectedTeamId) return;
    const alreadyAdded = !!selectedTeams.find(
      (team) => team.id === selectedTeamId
    );
    const team = allTeams.find((team) => team.id === selectedTeamId);
    if (!alreadyAdded) setSelectedTeams([team, ...selectedTeams]);
  };

  return (
    <React.Fragment>
      <select onChange={handleChange} id="teamSelect">
        <option>select a team</option>
        {allTeams.map((team) => (
          <option key={team.id} value={team.id}>
            {team.full_name}
          </option>
        ))}
      </select>
      <button id="trackBtn" onClick={addTeam}>
        Track team
      </button>
      <div className="card-container">
        {selectedTeams.map((team) => (
          <Team key={team.id} {...team} />
        ))}
      </div>
    </React.Fragment>
  );
}
export default Home;
