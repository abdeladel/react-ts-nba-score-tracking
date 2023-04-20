import * as React from 'react';
import AppRoutes from './Routes';
import './style.css';

export const AppContext = React.createContext<{
  selectedTeams: Team[];
  setSelectedTeams: React.Dispatch<React.SetStateAction<Team[]>>;
}>({
  selectedTeams: [],
  setSelectedTeams: () => {},
});

const AppContextProvider = (props) => {
  const [selectedTeams, setSelectedTeams] = React.useState<Team[]>([]);

  return (
    <AppContext.Provider
      value={{
        selectedTeams,
        setSelectedTeams,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default function App() {
  return (
    <AppContextProvider>
      <AppRoutes />
    </AppContextProvider>
  );
}
