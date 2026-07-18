import React, { useState } from 'react';

function BoardList({ boards, onSelectBoard, onCreateBoard }) {
  const [newBoardName, setNewBoardName] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = (e) => {
    e.preventDefault();
    if (newBoardName.trim()) {
      onCreateBoard(newBoardName.trim());
      setNewBoardName('');
      setIsCreating(false);
    }
  };

  return (
    <div className="boards-page">
      <div className="boards-header">
        <h1>Your Workspaces</h1>
        <p>Manage your projects and collaborate with your team</p>
      </div>

      <div className="boards-grid">
        {boards.map(board => (
          <div key={board.id} className="board-card" onClick={() => onSelectBoard(board)}>
            <h3>{board.name}</h3>
            <div className="board-card-meta">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                {new Date(board.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}

        {isCreating ? (
          <form className="board-card board-card-new" onSubmit={handleCreate} style={{ display: 'block', padding: '20px' }}>
            <h3 style={{ marginBottom: '12px' }}>New Board</h3>
            <input
              autoFocus
              className="input"
              value={newBoardName}
              onChange={(e) => setNewBoardName(e.target.value)}
              placeholder="Board name..."
              style={{ marginBottom: '12px' }}
            />
            <div style={{ display: 'flex', gap: '8px' }}>
              <button type="submit" className="btn btn-primary btn-sm">Create</button>
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => setIsCreating(false)}>Cancel</button>
            </div>
          </form>
        ) : (
          <div className="board-card board-card-new" onClick={() => setIsCreating(true)}>
            <div className="plus-icon">+</div>
            <span>Create New Board</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default BoardList;
