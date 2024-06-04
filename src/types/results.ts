type Results = {
    data: {
        status: number;
        segments: {
            team1: string;
            team2: string;
            score1: string;
            score2: string;
            flag1: string;
            flag2: string;
            time_completed: string;
            round_info: string;
            tournament_name: string;
            match_page: string;
            tournament_icon: string;
        }[]
    }
};

export default Results;