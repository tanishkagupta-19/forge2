import React, { useState } from 'react';
import BoardList from './components/BoardList';
import BoardView from './components/BoardView';
import { initialData } from './data/mockData';

function App() {
  const [currentBoard, setCurrentBoard] = useState(null);
  const [data, setData] = useState(initialData);

  const handleCreateBoard = (name) => {
    const newBoard = {
      id: `b${Date.now()}`,
      name,
      createdAt: new Date().toISOString(),
    };
    
    // Add 3 default lists for new board
    const defaultLists = [
      { id: `l${Date.now()}-1`, boardId: newBoard.id, name: 'To-Do', position: 1 },
      { id: `l${Date.now()}-2`, boardId: newBoard.id, name: 'In Progress', position: 2 },
      { id: `l${Date.now()}-3`, boardId: newBoard.id, name: 'Done', position: 3 },
    ];
    
    setData(prev => ({
      ...prev,
      boards: [...prev.boards, newBoard],
      lists: [...prev.lists, ...defaultLists]
    }));
  };

  const handleAddList = (boardId, name) => {
    const boardLists = data.lists.filter(l => l.boardId === boardId);
    const position = boardLists.length > 0 ? Math.max(...boardLists.map(l => l.position)) + 1 : 1;
    
    const newList = {
      id: `l${Date.now()}`,
      boardId,
      name,
      position
    };
    
    setData(prev => ({
      ...prev,
      lists: [...prev.lists, newList]
    }));
  };

  const handleAddCard = (listId, title) => {
    const listCards = data.cards.filter(c => c.listId === listId);
    const position = listCards.length > 0 ? Math.max(...listCards.map(c => c.position)) + 1 : 1;
    
    const newCard = {
      id: `c${Date.now()}`,
      listId,
      title,
      description: '',
      position,
      tagIds: [],
      memberIds: [],
      dueDate: null
    };
    
    setData(prev => ({
      ...prev,
      cards: [...prev.cards, newCard]
    }));
  };

  const handleUpdateCard = (cardId, updates) => {
    setData(prev => ({
      ...prev,
      cards: prev.cards.map(c => c.id === cardId ? { ...c, ...updates } : c)
    }));
  };

  const handleMoveCard = (cardId, newListId) => {
    setData(prev => {
      const card = prev.cards.find(c => c.id === cardId);
      if (!card || card.listId === newListId) return prev;
      
      const targetListCards = prev.cards.filter(c => c.listId === newListId);
      const position = targetListCards.length > 0 ? Math.max(...targetListCards.map(c => c.position)) + 1 : 1;
      
      return {
        ...prev,
        cards: prev.cards.map(c => c.id === cardId ? { ...c, listId: newListId, position } : c)
      };
    });
  };

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="navbar-brand">
          <div className="navbar-logo">F2</div>
          <div className="navbar-title">Forge 2 Kanban</div>
        </div>
        <div className="navbar-actions">
          <button className="btn-icon btn-ghost" title="Search">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </button>
          <div className="avatar" style={{ backgroundColor: '#7c5cfc' }}>ME</div>
        </div>
      </nav>

      {currentBoard ? (
        <BoardView 
          board={currentBoard}
          lists={data.lists}
          cards={data.cards}
          tags={data.tags}
          members={data.members}
          onBack={() => setCurrentBoard(null)}
          onAddList={handleAddList}
          onAddCard={handleAddCard}
          onUpdateCard={handleUpdateCard}
          onMoveCard={handleMoveCard}
        />
      ) : (
        <BoardList 
          boards={data.boards}
          onSelectBoard={setCurrentBoard}
          onCreateBoard={handleCreateBoard}
        />
      )}
    </div>
  );
}

export default App;
