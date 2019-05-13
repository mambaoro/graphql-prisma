module.exports = {
  users: [
    {
      id: '47fdh31',
      name: 'Mamadou',
      email: 'mam.me@gmail.com',
      age: 26,
    },
    {
      id: '74bgv78',
      name: 'Kahina',
      email: 'kahina@gmail.com',
      age: 31,
    },
    {
      id: '63fmh14',
      name: 'Arsène',
      email: 'firmin@gmail.com',
      age: 32,
    },
  ],
  posts: [
    {
      id: '12cbn36',
      title: 'UI frameworks for Web Apps',
      body: 'React, Vue, Angular',
      published: true,
      userId: '63fmh14',
    },
    {
      id: '74vby47',
      title: 'State management',
      body: 'Apollo Client, Unstated, Redux',
      published: false,
      userId: '74bgv78',
    },
    {
      id: '72wxc13',
      title: 'Database for Web Apps',
      body: 'MongoDB, Postgres, MySQL',
      published: true,
      userId: '63fmh14',
    },
  ],
  comments: [
    {
      id: '26wxq231',
      text: 'I live in Fontenay sous bois',
      userId: '74bgv78',
      post: '74vby47',
    },
    {
      id: '54gbu129',
      text: "I'm a employee and I work in the 16th arrondissement of Paris",
      userId: '74bgv78',
      post: '12cbn36',
    },
    {
      id: '73opm147',
      text: "I'm work at a grocery store and live in Fontenay sous bois",
      userId: '63fmh14',
      post: '72wxc13',
    },
    {
      id: '58gdr36',
      text: "I'm a React developer",
      userId: '47fdh31',
      post: '72wxc13',
    },
  ],
};
