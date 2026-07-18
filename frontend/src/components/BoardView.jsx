import React, { useState } from 'react';
import CardModal from './CardModal';

function BoardView({ board, lists, cards, tags, members, onBack, onUpdateCard, onAddCard, onAddList, onMoveCard }) {
  const [editingCard, setEditingCard] = useState(null);
  const [newListNames, setNewListNames] = useState({});
  const [newCardNames, setNewCardNames] = useState({});

  const handleAddList = (e) => {
    e.preventDefault();
    if (newListNames['new']?.trim()) {
      onAddList(board.id, newListNames['new'].trim());
      setNewListNames({ ...newListNames, 'new': '' });
    }
  };

  const handleAddCard = (e, listId) => {
    e.preventDefault();
    if (newCardNames[listId]?.trim()) {
      onAddCard(listId, newCardNames[listId].trim());
      setNewCardNames({ ...newCardNames, [listId]: '' });
    }
  };

  const boardLists = lists.filter(l => l.boardId === board.id).sort((a, b) => a.position - b.position);

  return (
    <div className="board-view">
      <div className="board-header">
        <div className="board-header-left">
          <button className="back-btn" onClick={onBack}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Boards
          </button>
          <h1>{board.name}</h1>
        </div>
        <div className="board-header-right">
          <div className="avatar-stack">
            {members.slice(0, 3).map(m => (
              <div key={m.id} className="avatar avatar-sm" style={{ backgroundColor: m.color }} title={m.name}>
                {m.initials}
              </div>
            ))}
            {members.length > 3 && (
              <div className="avatar avatar-sm" style={{ backgroundColor: 'var(--bg-surface)' }}>
                +{members.length - 3}
              </div>
            )}
          </div>
          <button className="btn btn-secondary btn-sm" style={{ borderRadius: '100px' }}>Share</button>
        </div>
      </div>

      <div className="columns-container">
        {boardLists.map(list => {
          const listCards = cards.filter(c => c.listId === list.id).sort((a, b) => a.position - b.position);
          
          return (
            <div key={list.id} className="list-column">
              <div className="list-header">
                <div className="list-header-left">
                  <h3>{list.name}</h3>
                  <span className="list-count">{listCards.length}</span>
                </div>
                <button className="btn-icon btn-ghost">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                </button>
              </div>
              
              <div className="list-cards">
                {listCards.map(card => {
                  const cardTags = tags.filter(t => (card.tagIds || []).includes(t.id));
                  const cardMembers = members.filter(m => (card.memberIds || []).includes(m.id));
                  
                  const isOverdue = card.dueDate && new Date(card.dueDate) < new Date();
                  
                  return (
                    <div 
                      key={card.id} 
                      className={`card-item ${isOverdue ? 'overdue' : ''}`}
                      onClick={() => setEditingCard(card)}
                    >
                      {cardTags.length > 0 && (
                        <div className="card-tags">
                          {cardTags.map(tag => (
                            <span key={tag.id} className="tag" style={{ backgroundColor: tag.color, color: '#000' }}>
                              {tag.name}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <div className="card-title">{card.title}</div>
                      
                      <div className="card-footer">
                        <div className="card-footer-left">
                          {card.dueDate && (
                            <div className={`card-due ${isOverdue ? 'overdue' : ''}`}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                              {new Date(card.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                            </div>
                          )}
                          {card.description && (
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                          )}
                        </div>
                        
                        {cardMembers.length > 0 && (
                          <div className="avatar-stack">
                            {cardMembers.map(m => (
                              <div key={m.id} className="avatar avatar-sm" style={{ backgroundColor: m.color }} title={m.name}>
                                {m.initials}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="list-footer">
                <form onSubmit={(e) => handleAddCard(e, list.id)}>
                  {newCardNames[list.id] !== undefined ? (
                    <div>
                      <input
                        autoFocus
                        className="inline-input"
                        placeholder="Card title..."
                        value={newCardNames[list.id] || ''}
                        onChange={(e) => setNewCardNames({...newCardNames, [list.id]: e.target.value})}
                        onBlur={() => {
                          if (!newCardNames[list.id]) {
                            const newNames = {...newCardNames};
                            delete newNames[list.id];
                            setNewCardNames(newNames);
                          }
                        }}
                      />
                    </div>
                  ) : (
                    <button type="button" className="add-card-btn" onClick={() => setNewCardNames({...newCardNames, [list.id]: ''})}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                      Add Card
                    </button>
                  )}
                </form>
              </div>
            </div>
          );
        })}

        <div className="add-list-column">
          <form onSubmit={handleAddList}>
            {newListNames['new'] !== undefined ? (
              <div className="list-column" style={{ padding: '16px' }}>
                <input
                  autoFocus
                  className="input"
                  placeholder="List title..."
                  value={newListNames['new'] || ''}
                  onChange={(e) => setNewListNames({...newListNames, 'new': e.target.value})}
                  style={{ marginBottom: '12px' }}
                />
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button type="submit" className="btn btn-primary btn-sm">Save List</button>
                  <button type="button" className="btn btn-ghost btn-sm" onClick={() => {
                    const newNames = {...newListNames};
                    delete newNames['new'];
                    setNewListNames(newNames);
                  }}>Cancel</button>
                </div>
              </div>
            ) : (
              <button type="button" className="add-list-btn" onClick={() => setNewListNames({...newListNames, 'new': ''})}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                Add another list
              </button>
            )}
          </form>
        </div>
      </div>

      {editingCard && (
        <CardModal
          card={editingCard}
          list={lists.find(l => l.id === editingCard.listId)}
          allLists={boardLists}
          allTags={tags}
          allMembers={members}
          onClose={() => setEditingCard(null)}
          onSave={(updates) => {
            onUpdateCard(editingCard.id, updates);
            setEditingCard(null);
          }}
          onMove={(newListId) => {
            onMoveCard(editingCard.id, newListId);
            setEditingCard(null);
          }}
        />
      )}
    </div>
  );
}

export default BoardView;
