import * as React from 'react';
import { AppContext } from '../App';
import useFetch from '../hooks/useFetch';
import Team from './Team';

function Home() {
  const allTeams  = useFetch('https://free-nba.p.rapidapi.com/teams', 
     [],
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
    if (!alreadyAdded) setSelectedTeams([...selectedTeams, team]);
  };

  return (
    <React.Fragment>
      <select onChange={handleChange}>
        {allTeams.map((team) => (
          <option key={team.id} value={team.id}>
            {team.name}
          </option>
        ))}
      </select>
      <button onClick={addTeam}>Track team</button>
      {selectedTeams.map((team) => (
        <Team key={team.id} {...team} />
      ))}
    </React.Fragment>
  );
}
export default Home;
