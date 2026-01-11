
export type AppView = 'dashboard' | 'scholarships' | 'colleges' | 'essay' | 'opportunities';

export interface Scholarship {
  id: string;
  name: string;
  amount: string;
  deadline: string;
  description: string;
  link: string;
  provider: string;
}

export interface College {
  name: string;
  location: string;
  rank?: string;
  acceptanceRate?: string;
  description: string;
  website: string;
}

export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
  maps?: {
    uri: string;
    title: string;
  };
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  sources?: GroundingChunk[];
}
