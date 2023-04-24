declare type Team = {
  id: number;
  name: string;
  full_name: string;
  abbreviation: string;
  city: string;
  conference: string;
  division: string;
};

declare type Score = {
  id: number;
  home_team: Team;
  visitor_team: Team;
  home_team_score: number;
  visitor_team_score: number;
  season: number;
  postseason: boolean;
  date: string;
  time: string;
  period: number;
  status: string;
};
