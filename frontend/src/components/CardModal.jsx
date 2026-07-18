import React, { useState } from 'react';

function CardModal({ card, list, allLists, allTags, allMembers, onClose, onSave, onMove }) {
  const [title, setTitle] = useState(card.title || '');
  const [description, setDescription] = useState(card.description || '');
  const [dueDate, setDueDate] = useState(card.dueDate ? card.dueDate.split('T')[0] : '');
  const [selectedTags, setSelectedTags] = useState(card.tagIds || []);
  const [selectedMembers, setSelectedMembers] = useState(card.memberIds || []);

  const toggleTag = (tagId) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter(id => id !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  const toggleMember = (memberId) => {
    if (selectedMembers.includes(memberId)) {
      setSelectedMembers(selectedMembers.filter(id => id !== memberId));
    } else {
      setSelectedMembers([...selectedMembers, memberId]);
    }
  };

  const handleSave = () => {
    onSave({
      title,
      description,
      dueDate: dueDate ? new Date(dueDate).toISOString() : null,
      tagIds: selectedTags,
      memberIds: selectedMembers
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Edit Card</h2>
          <button className="btn-icon btn-ghost" onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        
        <div className="modal-body">
          <div className="form-group">
            <label>Title</label>
            <input 
              className="input" 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
            />
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px', gap: '32px' }}>
            <div>
              <div className="form-group">
                <label>Description</label>
                <textarea 
                  className="textarea" 
                  value={description} 
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Add a more detailed description..."
                />
              </div>

              <div className="card-detail-section">
                <h4>Move to List</h4>
                <div className="move-card-options">
                  {allLists.map(l => (
                    <button 
                      key={l.id}
                      type="button"
                      className={`move-option ${l.id === list?.id ? 'current' : ''}`}
                      onClick={() => {
                        if (l.id !== list?.id) onMove(l.id);
                      }}
                    >
                      {l.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <div className="card-detail-section">
                <h4>Due Date</h4>
                <input 
                  type="date" 
                  className="input" 
                  value={dueDate}
                  onChange={e => setDueDate(e.target.value)}
                />
              </div>
              
              <div className="card-detail-section">
                <h4>Tags</h4>
                <div className="card-detail-tags">
                  {allTags.map(tag => (
                    <div 
                      key={tag.id}
                      className={`tag tag-option ${selectedTags.includes(tag.id) ? 'selected' : ''}`}
                      style={{ backgroundColor: tag.color, color: '#000' }}
                      onClick={() => toggleTag(tag.id)}
                    >
                      {tag.name}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="card-detail-section">
                <h4>Members</h4>
                <div className="card-detail-members">
                  {allMembers.map(member => {
                    const isSelected = selectedMembers.includes(member.id);
                    return (
                      <div 
                        key={member.id}
                        className={`member-chip ${isSelected ? 'assigned' : ''}`}
                        onClick={() => toggleMember(member.id)}
                      >
                        <div className="avatar avatar-sm" style={{ backgroundColor: member.color }}>
                          {member.initials}
                        </div>
                        {member.name}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="modal-footer">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSave}>Save Changes</button>
        </div>
      </div>
    </div>
  );
}

export default CardModal;
