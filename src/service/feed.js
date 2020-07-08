'use strict';

const FeedMDB = require('../database/mysql/feed');
const { feedContents, feedLike } = require('../database/mysql-model');

const feedExample = [
  {
    feedId: 1,
    userId: 'test',
    userName: 'Test2',
    userProfileImage: 'https://www.topstarnews.net/news/photo/202001/718730_431150_811.png',
    feedText: '텍스트텍스트1',
    feedContents: [{'url': 'https://cdn.crowdpic.net/detail-thumb/thumb_d_A175A8EE60E76F315D7C02F85C3B5D01.jpg', 'type': 'image'}],
    likeCount: 1200,
    isScrap: true,
    isLike: true,
    date: '2020-07-01T00:00:00Z',
  },
  {
    feedId: 2,
    userId: 'test2',
    userName: 'Test2',
    userProfileImage: 'https://4.bp.blogspot.com/-Ndp9ucpPjY4/XTHqhPt6qRI/AAAAAAAAa_w/6pU95UzmhHw-Gr0dxj73J-Q_vKny1SsvACLcBGAs/s1600/1.jpg',
    feedText: '텍스트텍스트2',
    feedContents: [{'url': 'https://previews.123rf.com/images/4045qd/4045qd1608/4045qd160800044/61532164-%EA%B3%84%EB%A6%BC%EC%9D%98-%ED%92%8D%EA%B2%BD.jpg', 'type': 'image'}],
    likeCount: 2,
    isScrap: true,
    isLike: false,
    date: '2020-07-02T01:00:00Z',
  },
  {
    feedId: 3,
    userId: 'test3',
    userName: 'Test3',
    userProfileImage: 'https://www.topstarnews.net/news/photo/202001/718730_431150_811.png',
    feedText: '텍스트텍스트3',
    feedContents: [{'url': 'https://ojsfile.ohmynews.com/STD_IMG_FILE/2016/0516/IE001963941_STD.jpg', 'type': 'image'}],
    likeCount: 300,
    isScrap: false,
    isLike: false,
    date: '2020-07-02T01:32:00Z',
  }
];

exports.getFeedList = async function getFeedList() {
  const result = await FeedMDB.query({
    order: [
      ['FeedId', 'DESC'],
    ],
    include: [
      {
        model: feedContents,
        as: 'feedContents',
        attributes: ['feedContent'],
        required:false,
      },
      {
        model: feedLike,
        as: 'feedLike',
        attributes: ['isLike'],
        required:false,
      },
    ],
  });

  for (let i = 0; i < result.length; i += 1) {
    const contentList = [];
    for (let element of result[i].feedContents) {
      element = JSON.parse(element.feedContent);
      contentList.push(element);
    }
    result[i].feedContents = contentList;
    result[i].isLike = !!result[i].feedLike;
    result[i].isScrap = !!result[i].feedScrap;

    delete result[i].feedLike;
    delete result[i].feedScrap;
  }
  // DB 미연결 시, const result = feedExample;
  return result;
};

exports.getFeedByFeedId = async function getFeedByFeedId(feedId) {
  const result = await FeedMDB.get({
    where: { feedId },
    include: [
      {
        model: feedContents,
        as: 'feedContents',
        where: { feedId: Number(feedId) },
        attributes: ['feedContent'],
        required:false,
      },
      {
        model: feedLike,
        as: 'feedLike',
        where: { feedId: Number(feedId) },
        attributes: ['isLike'],
        required:false,
      },
    ],
  });

  const list = [];
  for (let element of result.feedContents) {
    element = JSON.parse(element.feedContent);
    list.push(element);
  }
  result.feedContents = list;
  result.isLike = !!result.feedLike;
  result.isScrap = !!result.feedScrap;

  delete result.feedLike;
  delete result.feedScrap;

  /* DB 미연결 시,
    const index = feedExample.findIndex(feed => feed.feedId === Number(feedId));
    const result = feedExample[index];
  */
  return result;
};
