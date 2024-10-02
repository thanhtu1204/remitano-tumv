export interface Movie {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  favorite: boolean;
  isBooked: boolean;
}

const titleWords = [
  'Cuộc',
  'Hành',
  'Tình',
  'Giấc',
  'Kỳ',
  'Mơ',
  'Sống',
  'Yêu',
  'Thế',
  'Giới',
  'Bí',
  'Mật',
  'Hồn',
  'Ma',
  'Cuộc',
  'Chiến',
  'Đường',
  'Tìm',
  'Kiếm',
  'Mùa',
];

const descriptionWords = [
  'thú vị',
  'kỳ diệu',
  'đầy cảm xúc',
  'nghĩa tình',
  'mạo hiểm',
  'hấp dẫn',
  'hài hước',
  'đẫm nước mắt',
  'bất ngờ',
  'kịch tính',
  'bí ẩn',
  'tình cảm',
  'huyền bí',
  'hành động',
  'tưởng tượng',
  'sáng tạo',
];

const generateRandomString = (length: number) => {
  return Math.random()
    .toString(36)
    .substring(2, length + 2);
};

const generateMovieTitle = (): string => {
  const titleLength = Math.floor(Math.random() * 3) + 2; // Tên phim có từ 2 đến 4 từ
  let title = '';
  for (let i = 0; i < titleLength; i++) {
    const wordIndex = Math.floor(Math.random() * titleWords.length);
    title += (i === 0 ? '' : ' ') + titleWords[wordIndex];
  }
  return title.trim();
};

const generateMovieDescription = (): string => {
  const descriptionLength = Math.floor(Math.random() * 4) + 3; // Mô tả có từ 3 đến 6 từ
  let description = '';
  for (let i = 0; i < descriptionLength; i++) {
    const wordIndex = Math.floor(Math.random() * descriptionWords.length);
    description += (i === 0 ? '' : ' ') + descriptionWords[wordIndex];
  }
  return description.trim();
};

const getRandomThumbnail = () => {
  const thumbnails = [
    'https://cmsposter.cdn.mytvnet.vn/vimages/dc/c5/55/5e/e4/44/dc55e-p512nguoidanonggiandulabophimcoloidanchuyencucsangtaojpeg-unkn-unkn.jpeg',
    'https://cmsposter.cdn.mytvnet.vn/vimages/72/21/1a/ad/d4/45/721ad-p4bogiaphan2nam1974voimichaelcorleonetrothanhbogiamoijpeg-unkn-unkn.jpeg',
  ];

  const randomIndex = Math.floor(Math.random() * thumbnails.length);
  return thumbnails[randomIndex];
};

const generateRandomMovies = (count: number): Movie[] => {
  const movies: Movie[] = [];
  for (let i = 0; i < count; i++) {
    movies.push({
      id: i,
      title: generateMovieTitle(),
      description: generateMovieDescription(),
      thumbnail: getRandomThumbnail(),
      isBooked: false,
      favorite: false,
    });
  }
  return movies;
};

export const moviesData = generateRandomMovies(1200);
