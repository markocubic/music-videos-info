export const artist = [
  {
    id: 0,
    slug: "michael-jackson",
    name: "Michael Jackson",
    image:
      "https://res.cloudinary.com/dh1kdvvlx/image/upload/v1658940704/Music-videos-info/michael_jackson_rbczjd.jpg",
    type: "Musician",
    description:
      "Michael Joseph Jackson (August 29, 1958 – June 25, 2009) was an American singer, songwriter, and dancer. Dubbed the 'King of Pop', he is regarded as one of the most significant cultural figures of the 20th century. Over a four-decade career, his contributions to music, dance, and fashion, along with his publicized personal life, made him a global figure in popular culture.",
    birth: "August 29, 1958 in Gary, Indiana, USA",
  },
  {
    id: 1,
    slug: "john-landis",
    name: "John Landis",
    type: "Director",
  },
  {
    id: 2,
    slug: "ola-ray",
    name: "Ola Ray",
    type: "Actor",
  },
  {
    id: 3,
    slug: "steve-barron",
    name: "Steve Barron",
    type: "Director",
  },
  {
    id: 4,
    slug: "morten-harket",
    name: "Morten Harket",
    image:
      "https://res.cloudinary.com/dh1kdvvlx/image/upload/v1658940705/Music-videos-info/Morten_Harket_FFM13_001_ldmbjf.jpg",
    description:
      "Morten Harket (born 14 September 1959)[1] is a Norwegian vocalist and songwriter, best known as the lead singer of the synthpop/rock band A-ha. A-ha has released 10 studio albums to date, and topped the charts internationally after their breakthrough hit 'Take On Me' in 1985.[2] Harket has also released six solo albums. Before joining a-ha in 1982, Harket had appeared on the Oslo club scene as the singer for blues outfit Souldier Blue. Harket was named a Knight First Class of the Order of St. Olav by King Harald for his services to Norwegian music and his international success.",
    type: "Musician",
    birth: "September 14, 1959 in Kongsberg, Norway",
  },
  {
    id: 5,
    slug: "philip-jackson",
    name: "Philip Jackson",
    type: "Musician",
  },
  {
    id: 6,
    slug: "bunty-bailey",
    name: "Bunty Bailey",
    type: "Musician",
  },
  {
    id: 7,
    slug: "bruce-gowers",
    name: "Bruce Gowers",
    type: "Director",
  },
  {
    id: 8,
    slug: "brian-may",
    name: "Brian May",
    type: "Musician",
  },
  {
    id: 9,
    slug: "john-deacon",
    name: "John Deacon",
    type: "Musician",
  },
  {
    id: 10,
    slug: "freddie-mercury",
    name: "Freddie Mercury",
    type: "Musician",
  },
];

export const band = [
  {
    id: 0,
    slug: "a-ha",
    name: "A-ha",
    image:
      "https://res.cloudinary.com/dh1kdvvlx/image/upload/v1658940703/Music-videos-info/500x500_kva9qo.jpg",
    type: "Band",
    members: [artist[4], artist[5], artist[6]],
    description:
      "A-ha is a Norwegian synth-pop band formed in Oslo in 1982. Founded by Paul Waaktaar-Savoy (guitars), Magne Furuholmen (keyboards and guitars and vocals), and Morten Harket (vocals), the band rose to fame during the mid-1980s. A-ha achieved their biggest success with their debut album Hunting High and Low in 1985.",
    birth: "1982 in Oslo",
  },
  {
    id: 1,
    slug: "queen",
    name: "Queen",
    image:
      "https://res.cloudinary.com/dh1kdvvlx/image/upload/v1658940703/Music-videos-info/af2b8e57f6d7b5d43a616bd1e27ba552cd8bfd42_j2bhrw.jpg",
    type: "Band",
    members: [artist[8], artist[9], artist[10]],
    description:
      "A-ha is a Norwegian synth-pop band formed in Oslo in 1982. Founded by Paul Waaktaar-Savoy (guitars), Magne Furuholmen (keyboards and guitars and vocals), and Morten Harket (vocals), the band rose to fame during the mid-1980s. A-ha achieved their biggest success with their debut album Hunting High and Low in 1985.",
  },
];

export const musicVideos = [
  {
    id: 0,
    slug: "michael-jackson-thriller-1982",
    title: "Thriller",
    artist: artist[0],
    releaseYear: "1982",
    album: "Thriller",
    genres: ["Pop"],
    image:
      "https://res.cloudinary.com/dh1kdvvlx/image/upload/v1657580808/maxresdefault_w7q8cp.jpg",
    ytEmbedded: "https://www.youtube.com/embed/sOnqjkJTMaA",
    credits: {
      director: artist[1],
      writers: [artist[1], artist[0]],
      directorPhotography: "Robert Paynter",
      cast: [artist[0], artist[2]],
    },
    rateScore: 9.1,
    votesNumber: 218877,
    duration: "13 min 43 sec",
  },
  {
    id: 1,
    slug: "a-ha-take-on-me-1985",
    title: "Take On Me",
    artist: band[0],
    releaseYear: "1985",
    album: "Hunting High and Low",
    genres: ["Synth-Pop", "New Wave"],
    image:
      "https://res.cloudinary.com/dh1kdvvlx/image/upload/v1658447878/Music-videos-info/Screenshot_2022-07-22_at_01.39.32_pwpe05.png",
    ytEmbedded: "https://youtube.com/embed/djV11Xbc914",
    credits: {
      director: artist[3],
      cast: [artist[4], artist[5], artist[6]],
    },
    rateScore: 9,
    votesNumber: 117777,
    duration: "4 min 4 sec",
  },
  {
    id: 2,
    slug: "queen-bohemian-rhapsody-1975",
    title: "Bohemian Rhapsody",
    artist: band[1],
    releaseYear: "1975",
    album: "A Night at the Opera",
    genres: ["Progressive rock", "Progressive pop"],
    image:
      "https://res.cloudinary.com/dh1kdvvlx/image/upload/v1658700290/Music-videos-info/queen_primary_hwxw5q.jpg",
    ytEmbedded: "https://www.youtube.com/embed/fJ9rUzIMcZQ",
    credits: {
      director: artist[7],
      cast: [artist[8], artist[9], artist[10]],
    },
    rateScore: 7.5,
    votesNumber: 90777,
    duration: "6 min 0 sec",
  },
  {
    id: 3,
    slug: "a-ha-the-sun-always-shines-on-tv-1985",
    title: "The Sun Always Shines on T.V.",
    artist: band[0],
    releaseYear: "1985",
    album: "Hunting High and Low",
    genres: ["Synth-Pop", "New Wave"],
    image:
      "https://res.cloudinary.com/dh1kdvvlx/image/upload/v1659022804/Music-videos-info/behind-the-song-the-sun-always-shines-on-t-v-by-a-ha-pop-icons_orig_d4pcdr.png",
    ytEmbedded: "https://www.youtube.com/embed/a3ir9HC9vYg",
    credits: {
      director: artist[3],
      cast: [artist[4], artist[5], artist[6]],
    },
    rateScore: 9,
    votesNumber: 117777,
    duration: "4 min 4 sec",
  },
  {
    id: 4,
    slug: "a-ha-im-in-2022",
    title: "I'm in",
    artist: band[0],
    releaseYear: "2022",
    album: "True North",
    genres: ["Pop-rock"],
    image:
      "https://res.cloudinary.com/dh1kdvvlx/image/upload/v1659027279/Music-videos-info/maxresdefault_b4hqhf.jpg",
    ytEmbedded: "https://www.youtube.com/embed/qR0NN8DBcVc",
    credits: {
      director: artist[3],
      cast: [artist[4], artist[5], artist[6]],
    },
    rateScore: 9,
    votesNumber: 117777,
    duration: "4 min 4 sec",
  },
];

export const musicVideosLoggedIn = [
  {
    id: 0,
    dateRated: "10-11-2022",
    userRating: 9,
    ...musicVideos[0],
  },
  {
    id: 1,
    dateRated: "10-12-2022",
    userRating: 8,
    ...musicVideos[1],
  },
  {
    id: 2,
    dateRated: null,
    userRating: null,
    ...musicVideos[2],
  },
  {
    id: 3,
    dateRated: null,
    userRating: null,
    ...musicVideos[3],
  },
  {
    id: 4,
    dateRated: null,
    userRating: null,
    ...musicVideos[4],
  },
];

export const userLists = [
  {
    id: 0,
    slug: "flashwuts-best-80s-videos-top10",
    name: "Best 80's Videos (Top 10)",
    dateCreated: "04-24-2022",
    lastModified: "04-24-2022",
    list: [musicVideosLoggedIn[1], musicVideosLoggedIn[0]],
  },
  {
    id: 1,
    slug: "dert66s-my-top10-favourite-music-videos",
    name: "My top 10 favourite music videos",
    dateCreated: "02-22-2022",
    lastModified: "02-23-2022",
    list: [musicVideosLoggedIn[1], musicVideosLoggedIn[0]],
  },
  {
    id: 2,
    slug: "flashwuts-best-music-videos",
    name: "Best music videos",
    dateCreated: "01-03-2022",
    lastModified: "01-07-2022",
    list: [
      musicVideosLoggedIn[2],
      musicVideosLoggedIn[1],
      musicVideosLoggedIn[0],
    ],
  },
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
    payload: "top",
  },
  {
    id: 1,
    value: "Most Recent",
    payload: "date",
  },
];
