import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

export const kanbanApi = {
  // Boards
  getBoards: () => api.get('/boards'),
  createBoard: (name) => api.post('/boards', { name }),
  
  // Lists
  getLists: (boardId) => api.get(`/boards/${boardId}/lists`),
  createList: (boardId, name) => api.post(`/boards/${boardId}/lists`, { name }),
  
  // Cards
  getCards: (listId) => api.get(`/lists/${listId}/cards`),
  createCard: (listId, title) => api.post(`/lists/${listId}/cards`, { title }),
  updateCard: (cardId, updates) => api.put(`/cards/${cardId}`, updates),
  moveCard: (cardId, listId) => api.put(`/cards/${cardId}/move`, { list_id: listId }),
  
  // Tags & Members (Assuming we fetch them globally for the board or app)
  getTags: () => api.get('/tags'),
  getMembers: () => api.get('/members'),
};

export default api;
