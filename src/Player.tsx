import { Player } from './App'; // AppからPlayerの型定義を読み込む

// Playerコンポーネントが受け取るpropsの型定義
type PlayerProps = {
  player: Player;
  score: number;
  onCorrectClick: (id: number) => void;
  onIncorrectClick: (id: number) => void;
};

// Playerコンポーネントの本体
function PlayerComponent({ player, score, onCorrectClick, onIncorrectClick }: PlayerProps) {
  // 誤答数に応じた表示ラベルを計算
  let mistakeLabel = '・・';
  switch (player.mistakes) {
    case 1:
      mistakeLabel = '×・';
      break;
    default:
      if (player.mistakes >= 2) {
        mistakeLabel = 'Locked';
      }
      break;
  }

  // ロック状態・リーチ状態かどうかを判定
  const isLocked = player.mistakes >= 2;
  const isReach = (score * (player.points + 1) / player.points >= 200);

  // 画面に表示する内容
  return (
    <div className={`player team-${player.team}`}>
      <div className={`reach-indicator team-${player.team} ${isReach ? 'visible' : 'hidden'}`}>リーチ</div>
      <div className="player-name">{player.name}</div>
      <div className="player-points">{player.points}</div>
      <div className="player-mistakes">{mistakeLabel}</div>
      <div className="player-buttons">
        <button onClick={() => onCorrectClick(player.id)} disabled={isLocked}>○</button>
        <button onClick={() => onIncorrectClick(player.id)} disabled={isLocked}>×</button>
      </div>
    </div>
  );
}

export default PlayerComponent;