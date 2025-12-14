import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// Servicio API
const API_URL = 'http://localhost:3001';

const api = {
  getQuestions: async () => {
    const response = await fetch(`${API_URL}/questions`);
    return response.json();
  },
  getPlayers: async () => {
    const response = await fetch(`${API_URL}/players`);
    return response.json();
  },
  savePlayer: async (playerData) => {
    const response = await fetch(`${API_URL}/players`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(playerData)
    });
    return response.json();
  },
  updatePlayer: async (id, playerData) => {
    const response = await fetch(`${API_URL}/players/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(playerData)
    });
    return response.json();
  }
};

// Componente: Contador de Puntaje
const ScoreCounter = ({ score, total }) => (
  <div className="position-fixed top-0 end-0 m-4 p-3 bg-primary text-white rounded shadow" style={{ zIndex: 1000 }}>
    <h4 className="mb-0">Aciertos: {score}/{total}</h4>
  </div>
);

// Componente: Entrada del Jugador
const PlayerInput = ({ onStart, onViewHistory }) => {
  const [name, setName] = useState('');

  const handleStart = () => {
    if (name.trim()) {
      onStart(name.trim());
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleStart();
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg">
            <div className="card-body p-5">
              <h1 className="text-center mb-4 text-primary">🎯 Trivia de Cultura General</h1>
              <div className="mb-4">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="playerName"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ingresa tu nombre"
                />
              </div>
              <div className="d-grid gap-2">
                <button 
                  onClick={handleStart} 
                  className="btn btn-primary btn-lg"
                  disabled={!name.trim()}
                >
                  Comenzar Trivia
                </button>
                <button 
                  onClick={onViewHistory} 
                  className="btn btn-outline-secondary btn-lg"
                >
                  📊 Historial de participantes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente: Pregunta
const Question = ({ question, onAnswer, currentQuestion, totalQuestions }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState([]);

  // Mezclar opciones cuando cambia la pregunta
  useEffect(() => {
    const shuffled = [...question.options];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setShuffledOptions(shuffled);
    setSelectedOption(null);
    setShowResult(false);
  }, [question]);

  const handleOptionClick = (option) => {
    if (showResult) return;
    
    setSelectedOption(option);
    setShowResult(true);
    const isCorrect = option === question.correctAnswer;
    
    // 1 segundo si es correcto, 3 segundos si es incorrecto
    const delay = isCorrect ? 1000 : 3000;
    
    setTimeout(() => {
      onAnswer(isCorrect);
    }, delay);
  };

  const getOptionClass = (option) => {
    if (!showResult) return 'btn btn-outline-primary btn-lg w-100 mb-3 text-start';
    
    if (option === question.correctAnswer) {
      return 'btn btn-success btn-lg w-100 mb-3 text-start';
    }
    if (option === selectedOption && option !== question.correctAnswer) {
      return 'btn btn-danger btn-lg w-100 mb-3 text-start';
    }
    return 'btn btn-outline-secondary btn-lg w-100 mb-3 text-start';
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Pregunta {currentQuestion} de {totalQuestions}</h5>
            </div>
            <div className="card-body p-5">
              <h3 className="mb-4">{question.question}</h3>
              <div className="d-grid gap-2">
                {shuffledOptions.map((option, index) => (
                  <button
                    key={index}
                    className={getOptionClass(option)}
                    onClick={() => handleOptionClick(option)}
                    disabled={showResult}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {showResult && (
                <div className={`alert ${selectedOption === question.correctAnswer ? 'alert-success' : 'alert-danger'} mt-4`}>
                  {selectedOption === question.correctAnswer ? (
                    <><strong>¡Correcto!</strong> 🎉</>
                  ) : (
                    <><strong>Incorrecto.</strong> La respuesta correcta es: <strong>{question.correctAnswer}</strong></>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente: Resultados
const Results = ({ playerName, score, total, onRetry, onViewHistory }) => (
  <div className="container mt-5">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card shadow-lg text-center">
          <div className="card-body p-5">
            <h1 className="display-4 mb-4">🏆 Resultados</h1>
            <h2 className="text-primary mb-3">{playerName}</h2>
            <div className="display-1 text-success mb-4">
              {score}/{total}
            </div>
            <h4 className="mb-4">
              {score === total ? '¡Perfecto! 🌟' : 
               score >= total * 0.7 ? '¡Muy bien! 👏' : 
               score >= total * 0.5 ? 'Bien hecho 👍' : 
               '¡Sigue intentando! 💪'}
            </h4>
            <div className="d-grid gap-2">
              <button className="btn btn-primary btn-lg" onClick={onRetry}>
                🔄 Intentar de Nuevo
              </button>
              <button className="btn btn-outline-secondary btn-lg" onClick={onViewHistory}>
                📊 Ver Historial
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Componente: Historial de Participantes
const PlayerHistory = ({ onBack }) => {
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [exactScore, setExactScore] = useState('');
  const [maxScore, setMaxScore] = useState('');

  useEffect(() => {
    loadPlayers();
  }, []);

  const loadPlayers = async () => {
    const data = await api.getPlayers();
    setPlayers(data);
  };

  const filteredPlayers = players.filter(player => {
    const matchesName = player.name.toLowerCase().includes(searchTerm.toLowerCase());
    // Filtro exacto: verifica si el jugador tiene ese puntaje en algún intento
    const matchesExactScore = exactScore === '' || player.attempts.includes(parseInt(exactScore));
    // Filtro por puntaje máximo: verifica el puntaje máximo del jugador
    const matchesMaxScore = maxScore === '' || player.maxScore === parseInt(maxScore);
    return matchesName && matchesExactScore && matchesMaxScore;
  });

  const getMaxScorePlayer = () => {
    if (players.length === 0) return null;
    return players.reduce((max, player) => player.maxScore > max.maxScore ? player : max);
  };

  const maxScorePlayer = getMaxScorePlayer();

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h3 className="mb-0">📊 Historial de Participantes</h3>
          <button className="btn btn-light" onClick={onBack}>← Volver</button>
        </div>
        <div className="card-body p-4">
          <div className="row mb-4">
            <div className="col-md-4 mb-3 mb-md-0">
              <input
                type="text"
                className="form-control"
                placeholder="🔍 Buscar por nombre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <select
                className="form-select"
                value={maxScore}
                onChange={(e) => setMaxScore(e.target.value)}
              >
                <option value="">Puntaje máximo</option>
                <option value="10">Puntaje máximo: 10</option>
                <option value="9">Puntaje máximo: 9</option>
                <option value="8">Puntaje máximo: 8</option>
                <option value="7">Puntaje máximo: 7</option>
                <option value="6">Puntaje máximo: 6</option>
                <option value="5">Puntaje máximo: 5</option>
                <option value="4">Puntaje máximo: 4</option>
                <option value="3">Puntaje máximo: 3</option>
                <option value="2">Puntaje máximo: 2</option>
                <option value="1">Puntaje máximo: 1</option>
                <option value="0">Puntaje máximo: 0</option>
              </select>
            </div>
            <div className="col-md-4 mb-3 mb-md-0">
              <select
                className="form-select"
                value={exactScore}
                onChange={(e) => setExactScore(e.target.value)}
              >
                <option value="">Puntaje</option>
                <option value="10">10 puntos</option>
                <option value="9">9 puntos</option>
                <option value="8">8 puntos</option>
                <option value="7">7 puntos</option>
                <option value="6">6 puntos</option>
                <option value="5">5 puntos</option>
                <option value="4">4 puntos</option>
                <option value="3">3 puntos</option>
                <option value="2">2 puntos</option>
                <option value="1">1 punto</option>
                <option value="0">0 puntos</option>
              </select>
            </div>
          </div>

          {filteredPlayers.length === 0 ? (
            <div className="alert alert-info">No se encontraron participantes</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="table-light">
                  <tr>
                    <th>Participante</th>
                    <th>Puntaje Máximo</th>
                    <th>Mejor Intento</th>
                    <th>Total Intentos</th>
                    <th>Historial</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPlayers.map(player => (
                    <tr key={player.id} className={player.id === maxScorePlayer?.id ? 'table-warning' : ''}>
                      <td>
                        <strong>{player.name}</strong>
                        {player.id === maxScorePlayer?.id && ' 👑'}
                      </td>
                      <td><span className="badge bg-success fs-6">{player.maxScore}</span></td>
                      <td>Intento #{player.bestAttempt}</td>
                      <td>{player.attempts.length}</td>
                      <td>
                        <small className="text-muted">
                          {player.attempts.map((score, idx) => (
                            <span key={idx} className="badge bg-secondary me-1">
                              #{idx + 1}: {score}
                            </span>
                          ))}
                        </small>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Componente Principal
export default function App() {
  const [gameState, setGameState] = useState('input');
  const [playerName, setPlayerName] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [usedQuestionIds, setUsedQuestionIds] = useState([]);

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const startGame = async (name) => {
    setPlayerName(name);
    const allQuestions = await api.getQuestions();
    const availableQuestions = usedQuestionIds.length > 0 
      ? allQuestions.filter(q => !usedQuestionIds.includes(q.id))
      : allQuestions;
    
    const selectedQuestions = shuffleArray(availableQuestions).slice(0, 10);
    setQuestions(selectedQuestions);
    setUsedQuestionIds([...usedQuestionIds, ...selectedQuestions.map(q => q.id)]);
    setCurrentQuestionIndex(0);
    setScore(0);
    setGameState('playing');
  };

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      saveGameResult(isCorrect ? score + 1 : score);
    }
  };

  const saveGameResult = async (finalScore) => {
    const players = await api.getPlayers();
    const existingPlayer = players.find(p => p.name.toLowerCase() === playerName.toLowerCase());

    if (existingPlayer) {
      const newAttempts = [...existingPlayer.attempts, finalScore];
      const newMaxScore = Math.max(...newAttempts);
      const bestAttempt = newAttempts.indexOf(newMaxScore) + 1;

      await api.updatePlayer(existingPlayer.id, {
        ...existingPlayer,
        attempts: newAttempts,
        maxScore: newMaxScore,
        bestAttempt: bestAttempt
      });
    } else {
      await api.savePlayer({
        name: playerName,
        attempts: [finalScore],
        maxScore: finalScore,
        bestAttempt: 1
      });
    }

    setGameState('results');
  };

  const handleRetry = () => {
    startGame(playerName);
  };

  const handleViewHistory = () => {
    setGameState('history');
  };

  const handleBackToInput = () => {
    setGameState('input');
    setPlayerName('');
    setUsedQuestionIds([]);
  };

  return (
    <div className="min-vh-100 bg-light py-4">
      {gameState === 'input' && <PlayerInput onStart={startGame} onViewHistory={handleViewHistory} />}
      
      {gameState === 'playing' && questions.length > 0 && (
        <>
          <ScoreCounter score={score} total={questions.length} />
          <Question
            question={questions[currentQuestionIndex]}
            onAnswer={handleAnswer}
            currentQuestion={currentQuestionIndex + 1}
            totalQuestions={questions.length}
          />
        </>
      )}
      
      {gameState === 'results' && (
        <Results
          playerName={playerName}
          score={score}
          total={questions.length}
          onRetry={handleRetry}
          onViewHistory={handleViewHistory}
        />
      )}
      
      {gameState === 'history' && <PlayerHistory onBack={handleBackToInput} />}
    </div>
  );
}