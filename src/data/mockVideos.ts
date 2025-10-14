import { VideoItem } from '../types/video';

export const mockVideos: VideoItem[] = [
  {
    id: 'video-1',
    source: 'https://assets.mixkit.co/videos/preview/mixkit-chef-cutting-fresh-vegetables-4762-large.mp4',
    poster: 'https://images.pexels.com/photos/3297808/pexels-photo-3297808.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=720',
    title: 'Яркий салат из свежих овощей',
    author: {
      name: 'Chef Marta',
      avatar: 'https://images.pexels.com/photos/3771101/pexels-photo-3771101.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=120',
    },
    description: 'Хрустящие овощи с пряной заправкой и микрозеленью.',
    tags: ['#salad', '#fresh', '#vegan'],
    duration: 32,
  },
  {
    id: 'video-2',
    source: 'https://assets.mixkit.co/videos/preview/mixkit-pouring-sauce-over-a-bowl-of-salad-4719-large.mp4',
    poster: 'https://images.pexels.com/photos/3915854/pexels-photo-3915854.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=720',
    title: 'Соус на основе тахини',
    author: {
      name: 'Gastro Lab',
      avatar: 'https://images.pexels.com/photos/3771811/pexels-photo-3771811.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=120',
    },
    description: 'Кремовый соус для боулов и салатов, готов за 5 минут.',
    tags: ['#sauce', '#veggie', '#quick'],
    duration: 27,
  },
  {
    id: 'video-3',
    source: 'https://assets.mixkit.co/videos/preview/mixkit-a-chef-stirring-vegetables-in-a-pan-4763-large.mp4',
    poster: 'https://images.pexels.com/photos/425364/pexels-photo-425364.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=720',
    title: 'Вок из сезонных овощей',
    author: {
      name: 'Wok & Co',
      avatar: 'https://images.pexels.com/photos/3184192/pexels-photo-3184192.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=120',
    },
    description: 'Обжаренные овощи с кунжутным маслом и соевым соусом.',
    tags: ['#wok', '#veggies', '#fusion'],
    duration: 41,
  },
  {
    id: 'video-4',
    source: 'https://assets.mixkit.co/videos/preview/mixkit-adding-berries-to-a-bowl-of-yogurt-4717-large.mp4',
    poster: 'https://images.pexels.com/photos/947879/pexels-photo-947879.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=720',
    title: 'Йогуртовый боул с ягодами',
    author: {
      name: 'Breakfast Lab',
      avatar: 'https://images.pexels.com/photos/3760861/pexels-photo-3760861.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=120',
    },
    description: 'Нежный йогурт, гранола и свежая голубика для бодрого утра.',
    tags: ['#breakfast', '#berries', '#protein'],
    duration: 22,
  },
  {
    id: 'video-5',
    source: 'https://assets.mixkit.co/videos/preview/mixkit-baker-decorating-a-cake-8996-large.mp4',
    poster: 'https://images.pexels.com/photos/266368/pexels-photo-266368.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=720',
    title: 'Украшение малинового торта',
    author: {
      name: 'Sweet Tooth',
      avatar: 'https://images.pexels.com/photos/3764451/pexels-photo-3764451.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=120',
    },
    description: 'Плавный крем, свежая малина и ягоды — идеальный десерт.',
    tags: ['#dessert', '#baking', '#raspberry'],
    duration: 36,
  },
  {
    id: 'video-6',
    source: 'https://assets.mixkit.co/videos/preview/mixkit-couple-preparing-a-healthy-smoothie-4718-large.mp4',
    poster: 'https://images.pexels.com/photos/4552047/pexels-photo-4552047.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=720',
    title: 'Зелёный смузи на завтрак',
    author: {
      name: 'Blend Bar',
      avatar: 'https://images.pexels.com/photos/4259140/pexels-photo-4259140.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=120',
    },
    description: 'Шпинат, манго и лайм — заряд витаминов на весь день.',
    tags: ['#smoothie', '#healthy', '#vitamins'],
    duration: 30,
  },
];
