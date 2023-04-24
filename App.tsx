import * as React from 'react';
import AppRoutes from './Routes';
import './style.css';

export const AppContext = React.createContext<{
  selectedTeams: Team[];
  setSelectedTeams: React.Dispatch<React.SetStateAction<Team[]>>;
  last12dates: string[];
}>({
  selectedTeams: [],
  setSelectedTeams: () => {},
  last12dates: [],
});

const AppContextProvider = (props) => {
  const [selectedTeams, setSelectedTeams] = React.useState<Team[]>([]);
  const last12dates = [];
  const today = new Date();
  for (let i = 1; i <= 12; i++) {
    today.setDate(today.getDate() - 1);

    last12dates.push(today.toISOString().split('T')[0]);
  }
  return (
    <AppContext.Provider
      value={{
        selectedTeams,
        setSelectedTeams,
        last12dates,
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
