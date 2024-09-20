// monsters.js
const monsters = [
  {
    name: 'Goblin',
    type: 'normal',
    icon: 'goblin',
    level: 1,
    health: 15,
    healthMax: 15,
    healthRange: [1, 1],
    attack: [8, 12],
    defenseRange: [4, 6],
    defense: 8,
    defenseMax: 8,
    actions: ['attack', 'defense'],
    turns: 3,
    gold: [10, 20]
  },
  {
    name: 'Spider',
    type: 'normal',
    icon: 'spider',
    level: 1,
    health: 18,
    healthMax: 18,
    healthRange: [2, 4],
    attack: [3, 8],
    defenseRange: [1, 2],
    defense: 2,
    defenseMax: 2,
    actions: ['attack'],
    turns: 1,
    gold: [5, 15]
  },
  // {
  //   name: 'Skeleton',
  //   type: 'normal',
  //   icon: 'skeleton',
  //   level: 1,
  //   health: 15,
  //   healthMax: 15,
  //   healthRange: [1, 2],
  //   attack: [4, 8],
  //   defenseRange: [2, 5],
  //   defense: 15,
  //   defenseMax: 15,
  //   actions: ['attack'],
  //   turns: 2,
  //   gold: [15, 30]
  // },
  {
    name: 'Vampire',
    type: 'boss',
    icon: 'boss',
    level: 1,
    health: 25,
    healthMax: 25,
    healthRange: [8, 14],
    attack: [6, 10],
    defenseRange: [8, 10],
    defense: 10,
    defenseMax: 10,
    actions: ['attack', 'defense', 'health'],
    turns: 2,
    gold: [30, 50]
  }
];

export default monsters;
