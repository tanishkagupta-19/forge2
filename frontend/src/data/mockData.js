export const initialData = {
  boards: [
    {
      id: 'b1',
      name: 'Forge 2 Qualifier Build',
      createdAt: '2026-07-17T10:00:00Z',
    },
    {
      id: 'b2',
      name: 'Agentic Workflows',
      createdAt: '2026-07-16T08:00:00Z',
    }
  ],
  lists: [
    { id: 'l1', boardId: 'b1', name: 'To-Do', position: 1 },
    { id: 'l2', boardId: 'b1', name: 'In Progress', position: 2 },
    { id: 'l3', boardId: 'b1', name: 'Done', position: 3 },
  ],
  cards: [
    {
      id: 'c1',
      listId: 'l1',
      title: 'Scaffold Laravel API',
      description: 'Create models, migrations, and routes for Kanban boards, lists, and cards.',
      position: 1,
      dueDate: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
      tagIds: ['t1', 't3'],
      memberIds: ['m1']
    },
    {
      id: 'c2',
      listId: 'l2',
      title: 'Design Premium Frontend',
      description: 'Use dark theme with glassmorphism and modern typography.',
      position: 1,
      dueDate: new Date(Date.now() - 3600000).toISOString(), // Overdue
      tagIds: ['t2'],
      memberIds: ['m2']
    },
    {
      id: 'c3',
      listId: 'l3',
      title: 'Setup Hermes + OpenClaw',
      description: 'Configure agents, memory, skills, and Slack channels.',
      position: 1,
      dueDate: new Date(Date.now() - 86400000).toISOString(),
      tagIds: ['t4'],
      memberIds: ['m1', 'm2']
    }
  ],
  tags: [
    { id: 't1', name: 'Backend', color: 'var(--tag-blue)' },
    { id: 't2', name: 'Frontend', color: 'var(--tag-purple)' },
    { id: 't3', name: 'API', color: 'var(--tag-teal)' },
    { id: 't4', name: 'Agents', color: 'var(--tag-orange)' },
    { id: 't5', name: 'Bug', color: 'var(--tag-red)' },
  ],
  members: [
    { id: 'm1', name: 'Ayush', initials: 'AY', color: '#ff6b6b' },
    { id: 'm2', name: 'Tanishka', initials: 'TA', color: '#2ed573' },
  ]
};
