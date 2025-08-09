import PlayerComponent from './Player'; // Playerコンポーネントを読み込む
import { Player } from './App'; // AppからPlayerの型定義を読み込む

// Teamコンポーネントが受け取るpropsの型定義
type TeamProps = {
  score: number;
  player: Player[];
  onCorrectClick: (id: number) => void;
  onIncorrectClick: (id: number) => void;
};

// Teamコンポーネントの本体
function Team({ score, player, onCorrectClick, onIncorrectClick }: TeamProps) {
  return (
    <div className={`teams-container`}>
      <div className="players-container">
        {player.map(player => (
          <PlayerComponent
            player={player}
            onCorrectClick={onCorrectClick}
            onIncorrectClick={onIncorrectClick}
            score={score}
          />
        ))}
      </div>
      <div className={`team-score`}>{score}</div>
    </div>
  );
}

export default Team;