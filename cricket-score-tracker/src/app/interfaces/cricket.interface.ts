export interface TeamInfo {
  name: string;
  shortname: string;
  img: string;
}

export interface Score {
  r: number;
  w: number;
  o: number;
  inning: string;
}

export interface Player {
  id: string;
  name: string;
  altnames?: string[];
}

export interface BattingStats {
  batsman: Player;
  dismissal?: string;
  bowler?: Player;
  catcher?: Player;
  'dismissal-text': string;
  r: number;
  b: number;
  '4s': number;
  '6s': number;
  sr: number;
}

export interface BowlingStats {
  bowler: Player;
  o: number;
  m: number;
  r: number;
  w: number;
  nb: number;
  wd: number;
  eco: number;
}

export interface CatchingStats {
  catcher: Player;
  stumped: number;
  runout: number;
  catch: number;
  cb: number;
  lbw: number;
  bowled: number;
}

export interface InningStats {
  batting: BattingStats[];
  bowling: BowlingStats[];
  catching: CatchingStats[];
  extras: {
    r: number;
    b: number;
  };
  totals: Record<string, any>;
  inning: string;
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
  scorecard: InningStats[];
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

export interface ApiResponse<T> {
  data: T;
  reason?: string;
  status?: string;
} 