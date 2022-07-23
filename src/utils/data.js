export const userRatings = [
  {
    id: 0,
    dateRated: "10-11-2022",
    userRating: 9,
    musicVideo: {
      id: 0,
      title: "Thriller",
      artist: "Michael Jackson",
      releaseYear: "1982",
      genres: ["Pop"],
      image:
        "https://res.cloudinary.com/dh1kdvvlx/image/upload/v1657580808/maxresdefault_w7q8cp.jpg",
      credits: {
        director: "John Landis",
        directorPhotography: "Robert Paynter",
        cast: [
          {
            id: 0,
            name: "Michael Jackson",
          },
          {
            id: 1,
            name: "Ola Ray",
          },
        ],
      },
      rateScore: 10,
      votesNumber: 218877,
      duration: "13 min 43 sec",
    },
  },
  {
    id: 1,
    dateRated: "10-12-2022",
    userRating: 8,
    musicVideo: {
      id: 1,
      title: "Take On Me",
      artist: "A-ha",
      releaseYear: "1985",
      genres: ["Synth-Pop", "New Wave"],
      image:
        "https://res.cloudinary.com/dh1kdvvlx/image/upload/v1658447878/Music-videos-info/Screenshot_2022-07-22_at_01.39.32_pwpe05.png",
      credits: {
        director: "Steve Barron",
        cast: [
          {
            id: 2,
            name: "Morten Harket",
          },
          {
            id: 3,
            name: "Philip Jackson",
          },
          {
            id: 4,
            name: "Bunty Bailey",
          },
        ],
      },
      rateScore: 9,
      votesNumber: 117777,
      duration: "4 min 4 sec",
    },
  },
];

export const userLists = [
  {
    id: 0,
    name: "Best 80's Videos (Top 10)",
    dateCreated: '04-24-2022',
    lastModified: '04-24-2022',
    list: [
      {
        id: 1,
        title: "Take On Me",
        artist: "A-ha",
        releaseYear: "1985",
        genres: ["Synth-Pop", "New Wave"],
        image:
          "https://res.cloudinary.com/dh1kdvvlx/image/upload/v1658447878/Music-videos-info/Screenshot_2022-07-22_at_01.39.32_pwpe05.png",
        credits: {
          director: "Steve Barron",
          cast: [
            {
              id: 2,
              name: "Morten Harket",
            },
            {
              id: 3,
              name: "Philip Jackson",
            },
            {
              id: 4,
              name: "Bunty Bailey",
            },
          ],
        },
        rateScore: 9,
        votesNumber: 117777,
        duration: "4 min 4 sec",
      },
      {
        id: 0,
        title: "Thriller",
        artist: "Michael Jackson",
        releaseYear: "1982",
        genres: ["Pop"],
        image:
          "https://res.cloudinary.com/dh1kdvvlx/image/upload/v1657580808/maxresdefault_w7q8cp.jpg",
        credits: {
          director: "John Landis",
          directorPhotography: "Robert Paynter",
          cast: [
            {
              id: 0,
              name: "Michael Jackson",
            },
            {
              id: 1,
              name: "Ola Ray",
            },
          ],
        },
        rateScore: 10,
        votesNumber: 218877,
        duration: "13 min 43 sec",
      },
    ],
  },
  {
    id: 1,
    name: "My top 10 favourite music videos",
    dateCreated: '02-22-2022',
    lastModified: '02-23-2022',
    list: [
      {
        id: 1,
      },
      {
        id: 33,
      }
    ]
  }
];

export const sliderImages = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1583336663277-620dc1996580?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjF8fGRvZyUyMGNsb3RoZXN8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
    category: "Designer Hoodies And Imported Jackets",
    info: "Enjoy upto 30% discount",
    btnInfo: "Make your pet look smarter now",
  },
  {
    id: 2,
    img: "https://www.k9ofmine.com/wp-content/uploads/2019/11/best-interactive-dog-toys-1150x700.jpg",
    category: "DOG TOYS",
    info: "Have some fun with your dogs",
    btnInfo: "Order now",
  },
  {
    id: 3,
    img: "https://tailandfur.com/wp-content/uploads/2019/07/Different-Types-of-Dog-Bowls-830x450.jpg",
    category: "HEALTHY AND TASTY TREATS",
    info: "Enjoy upto 30% discount on delicious snacks",
    btnInfo: "Order now",
  },
];

export const optionsDefault = [
  "option 1",
  "advice 8",
  "option 3",
  "option 0",
  "advice 4",
  "suggestion 6",
  "advice 7",
  "suggestion 0",
];

export const filterOptionsRatings = [
  {
    id: 0,
    value: "Show All",
  },
  {
    id: 1,
    value: "1 star",
  },
  {
    id: 2,
    value: "2 star",
  },
  {
    id: 3,
    value: "3 star",
  },
  {
    id: 4,
    value: "4 star",
  },
  {
    id: 5,
    value: "5 star",
  },
  {
    id: 6,
    value: "6 star",
  },
  {
    id: 7,
    value: "7 star",
  },
  {
    id: 8,
    value: "8 star",
  },
  {
    id: 9,
    value: "9 star",
  },
  {
    id: 10,
    value: "10 star",
  },
];

export const sortOptionsRatings = [
  {
    id: 0,
    value: "Top Rated",
  },
  {
    id: 1,
    value: "Most Recent",
  },
];
