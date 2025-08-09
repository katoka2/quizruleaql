import React, { useState, useEffect } from 'react';
import Team from './Team'; // Teamコンポーネントを読み込む
import './App.css';

// プレイヤーの型定義
export type Player = {
  id: number;
  name: string;
  points: number;
  mistakes: number;
  team: 'A' | 'B';
};

// アプリケーションの本体
function App() {
  // 全プレイヤーのデータをstateで管理
  const initialState: Player[] =[
    { id: 1, name: '1枠', points: 1, mistakes: 0, team: 'A' },
    { id: 2, name: '2枠', points: 1, mistakes: 0, team: 'A' },
    { id: 3, name: '3枠', points: 1, mistakes: 0, team: 'A' },
    { id: 4, name: '4枠', points: 1, mistakes: 0, team: 'A' },
    { id: 5, name: '5枠', points: 1, mistakes: 0, team: 'A' },
    { id: 6, name: '1枠', points: 1, mistakes: 0, team: 'B' },
    { id: 7, name: '2枠', points: 1, mistakes: 0, team: 'B' },
    { id: 8, name: '3枠', points: 1, mistakes: 0, team: 'B' },
    { id: 9, name: '4枠', points: 1, mistakes: 0, team: 'B' },
    { id: 10, name:'5枠', points: 1, mistakes: 0, team: 'B' },
  ];

  const [history, setHistory] = useState<Player[][]>([initialState]);
  const currentPlayers = history[history.length - 1];

  // 各チームの情報をstateで管理（スコア）
  const [teamA, setTeamA] = useState({ score: 1 });
  const [teamB, setTeamB] = useState({ score: 1 });

  // Historyデータが変更されるたびに、スコアとリーチを再計算する
  useEffect(() => {
    // チームごとのプレイヤーをフィルタリング
    const teamAPlayers = currentPlayers.filter(p => p.team === 'A');
    const teamBPlayers = currentPlayers.filter(p => p.team === 'B');

    // チームスコアを計算
    let teamAScore = teamAPlayers.reduce((acc, p) => acc * p.points, 1);
    let teamBScore = teamBPlayers.reduce((acc, p) => acc * p.points, 1);
    if (teamAScore > 200) {teamAScore = 200};
    if (teamBScore > 200) {teamBScore = 200};

    // 計算結果をstateにセット
    setTeamA({ score: teamAScore });
    setTeamB({ score: teamBScore });

  }, [currentPlayers]); // currentPlayersが変更されたらこの中身が実行される

  // 正解した時の処理
  const handleCorrect = (playerId: number) => {
    const newPlayers = currentPlayers.map(p =>
      p.id === playerId ? { ...p, points: p.points + 1 } : p
    );
    setHistory([...history, newPlayers]);
  };

  // 誤答した時の処理
  const handleIncorrect = (playerId: number) => {
    const mistakenPlayer = currentPlayers.find(p => p.id === playerId);
    if (!mistakenPlayer) return;

    const opponentTeam = mistakenPlayer.team === 'A' ? 'B' : 'A';

    const newPlayers = currentPlayers.map(p => {
      // 誤答した本人
      if (p.id === playerId) {
        return { ...p, points: 1, mistakes: p.mistakes + 1 };
      }
      // 相手チーム（ロック解除処理）
      if (p.team === opponentTeam && p.mistakes >= 2) {
        return { ...p, mistakes: 1 };
      }
      // それ以外
      return p;
    });
    setHistory([...history, newPlayers]);
  };

  // Undo処理
  const handleUndo = () => {
    if (history.length < 2) return;
    setHistory(history.slice(0, -1));
  };

  // 画面に表示する内容
  return (
    <body>
      <header>
        <h1>クイズアプリ</h1>
        <button onClick={handleUndo} disabled={history.length < 2}>↩</button>
      </header>
      <div className="teams-container team-A">
        <Team
        score={teamA.score}
        player={currentPlayers.filter(p => p.team === 'A')}
        onCorrectClick={handleCorrect}
        onIncorrectClick={handleIncorrect}
        />
      </div>
      <div className="teams-container team-B">
        <Team
        score={teamB.score}
        player={currentPlayers.filter(p => p.team === 'B')}
        onCorrectClick={handleCorrect}
        onIncorrectClick={handleIncorrect}
        />
      </div>
    </body>
  );
}

export default App;