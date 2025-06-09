export interface TeamInfo {
  name: string;
  shortname: string;
  img: string;
}

export interface Match {
  id: string;
  name: string;
  matchType: string;
  status: string;
  venue: string;
  date: string;
  dateTimeGMT: string;
  teams: string[];
  teamInfo: TeamInfo[];
  score: Score[];
  tossWinner: string;
  tossChoice: string;
  matchWinner: string;
  series_id: string;
  scorecard: any[];
  matchStarted: boolean;
  matchEnded: boolean;
  fantasyEnabled?: boolean;
  bbbEnabled?: boolean;
  hasSquad?: boolean;
}

export interface Series {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  odi: number;
  t20: number;
  test: number;
  squads: number;
  matches: number;
  showMatches?: boolean;
  matchList?: Match[];
}

export interface Score {
  r: number;
  w: number;
  o: number;
  inning: string;
}

export interface ApiResponse<T> {
  data: T;
  reason?: string;
  status?: string;
} 