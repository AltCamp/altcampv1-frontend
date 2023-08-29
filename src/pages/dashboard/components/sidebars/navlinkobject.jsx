// import link icons

import {
  Airdrop,
  Bookmark,
  Bubble,
  ChartCircle,
  Designtools,
  FtxToken,
  Layer,
  Notification,
  People,
  ProfileCircle,
  Profile2User,
  InfoCircle,
  ArrowRight2,
  KeySquare,
  ProfileRemove,
  ColorSwatch,
} from 'iconsax-react';

const navlinkObj = [
  {
    header: 'OVERVIEW',
    links: [
      {
        to: '/dashboard/feed',
        icon: <FtxToken size="23" className="text-inherit" />,
        text: 'Feed',
      },
      {
        to: '/dashboard/community',
        icon: <People size="23" className="text-inherit" />,
        text: 'Community',
      },
      {
        to: '/dashboard/topics',
        icon: <Airdrop size="23" className="text-inherit" />,
        text: 'Topics',
      },
      {
        to: '/dashboard/bookmarks',
        icon: <Bookmark size="23" className="text-inherit" />,
        text: 'Bookmarks',
      },
    ],
  },
  {
    header: 'LEARNING',
    links: [
      {
        to: '/dashboard/circle',
        icon: <ChartCircle size="23" className="text-inherit" />,
        text: 'Learning Circle',
      },
      {
        to: '/dashboard/resources',
        icon: <Bubble size="23" className="text-inherit" />,
        text: 'Learning Resources',
      },
      {
        to: '/dashboard/contributors',
        icon: <Layer size="23" className="text-inherit" />,
        text: 'Contributors',
      },
      {
        to: '/dashboard/quiz',
        icon: <Designtools size="23" className="text-inherit" />,
        text: 'Quiz',
      },
    ],
  },
  {
    header: 'PERSONAL',
    links: [
      {
        to: '/dashboard/account',
        icon: <ProfileCircle size="23" className="text-inherit" />,
        text: 'Account',
        childLinks: [
          {
            to: '/dashboard/account',
            icon: <InfoCircle size="20" className="text-inherit" />,
            text: 'My Profile',
          },
          {
            to: '/dashboard/account/myprojects',
            icon: <ColorSwatch size="20" className="text-inherit" />,
            text: 'My Projects',
          },
          {
            to: '/dashboard/account/resetpassword',
            icon: <KeySquare size="20" className="text-inherit" />,
            text: 'Reset Password',
          },
          {
            to: '/dashboard/account/deactivateaccount',
            icon: <ProfileRemove size="20" className="text-inherit" />,
            text: 'Deactivate Account',
          },
        ],
      },
      {
        to: '/dashboard/notifications',
        icon: <Notification size="23" className="text-inherit" />,
        text: 'Notifications',
      },
      {
        to: '/dashboard/users',
        icon: <Profile2User size="23" className="text-inherit" />,
        text: 'Users',
      },
    ],
  },
];

export default navlinkObj;
