// THIS FILE IS FOR URLS THAT WILL BE USED IN THE APP

const url = {
  // API URL
  BASE_URL: import.meta.env.VITE_BASE_URL,

  // AUTH URLS
  LOGIN_URL: '/auth/login',
  REGISTER_URL: '/auth/register',

  // EMAIL VERIFICATION URLS
  START_VERIFY_EMAIL_URL: '/auth/start-email-verification',
  VERIFY_EMAIL_URL: '/auth/verify-email',

  // FORGOT & RESET PASSWORD URLS
  FORGOT_PASSWORD_URL: '/accounts/forgot-password',
  VERIFY_FORGOT_PASSWORD_OTP_URL: 'accounts/verify-password-reset-otp',
  RESET_PASSWORD_URL: '/accounts/reset-password',

  // ACCOUNT URLS
  ACCOUNTS_URL: '/accounts',
  UPDATE_PROFILE_PICTURE_URL: '/accounts/profile-picture',
  UPDATE_BIO_URL: '/accounts/bio',
  UPDATE_DETAILS_URL: '/accounts',
  GET_ACCOUNT_BY_ID_URL(url, accountId) {
    return `${url.ACCOUNTS_URL}/${accountId}`;
  },
  GET_SEARCHED_ACCOUNTS_URL(url, searchTerm, isPaginated) {
    return `${url.ACCOUNTS_URL}?searchTerm=${searchTerm}&isPaginated=${isPaginated}`;
  },
  GET_ALL_ACCOUNTS_URL(url, accountType, searchTerm, isPaginated, page, limit) {
    if (searchTerm && accountType) {
      return `${url.ACCOUNTS_URL}?category=${accountType}&searchTerm=${searchTerm}&isPaginated=${isPaginated}&page=${page}&limit=${limit}`;
    } else if (!accountType && searchTerm) {
      return `${url.ACCOUNTS_URL}?searchTerm=${searchTerm}&isPaginated=${isPaginated}&page=${page}&limit=${limit}`;
    } else if (accountType && !searchTerm) {
      return `${url.ACCOUNTS_URL}?category=${accountType}&isPaginated=${isPaginated}&page=${page}&limit=${limit}`;
    } else {
      return `${url.ACCOUNTS_URL}?isPaginated=${isPaginated}&page=${page}&limit=${limit}`;
    }
  },

  // BOOKMARK URLS
  BOOKMARKS_URL: '/bookmarks',
  GET_ALL_BOOKMARKS_URL(url, page, isPaginated, limit) {
    return `${url.BOOKMARKS_URL}?isPaginated=${isPaginated}&page=${page}&limit=${limit}`;
  },
  GET_BOOKMARK_BY_ID_URL(url, bookmarkId) {
    return `${url.BOOKMARKS_URL}/${bookmarkId}`;
  },
  CREATE_BOOKMARK_URL(url, postId, postType) {
    return `${url.BOOKMARKS_URL}?postId=${postId}&postType=${postType}`;
  },
  UPDATE_BOOKMARK_URL(url, bookmarkId) {
    return `${url.BOOKMARKS_URL}/${bookmarkId}`;
  },
  DELETE_BOOKMARK_URL(url, postId) {
    return `${url.BOOKMARKS_URL}?postId=${postId}`;
  },

  // COMMUNITY URLS
  QUESTIONS_URL: '/questions',
  GET_ALL_QUESTIONS_URL(url, page, isPaginated, limit) {
    return `${url.QUESTIONS_URL}?isPaginated=${isPaginated}&page=${page}&limit=${limit}`;
  },
  GET_QUESTION_BY_ID_URL(url, id) {
    return `${url.QUESTIONS_URL}/${id}`;
  },
  CREATE_QUESTION_URL: '/questions',
  UPDATE_QUESTION_URL(url, id) {
    return `${url.QUESTIONS_URL}/${id}`;
  },
  DELETE_QUESTION_URL(url, id) {
    return `${url.QUESTIONS_URL}/${id}`;
  },
  UPVOTE_QUESTION_URL(url, id) {
    return `${url.QUESTIONS_URL}/${id}/upvote`;
  },
  DOWNVOTE_QUESTION_URL(url, id) {
    return `${url.QUESTIONS_URL}/${id}/downvote`;
  },

  // ANSWERS URLS
  ANSWERS_URL: '/answers',
  GET_ALL_ANSWERS_URL(url, questionId) {
    return `${url.ANSWERS_URL}?questionId=${questionId}`;
  },
  CREATE_ANSWER_URL: '/answers',
  UPDATE_ANSWER_URL(url, answerId) {
    return `${url.ANSWERS_URL}/${answerId}`;
  },
  UPVOTE_ANSWER_URL(url, answerId) {
    return `${url.ANSWERS_URL}/upvote/${answerId}`;
  },
  DOWNVOTE_ANSWER_URL(url, answerId) {
    return `${url.ANSWERS_URL}/downvote/${answerId}`;
  },

  // POST URLS
  POSTS_URL: '/posts',
  GET_ALL_POSTS_URL(url, isPaginated, page, limit) {
    return `${url.POSTS_URL}?isPaginated=${isPaginated}&page=${page}&limit=${limit}`;
  },
  GET_POST_BY_ID(url, id) {
    return `${url.POSTS_URL}/${id}`;
  },
  CREATE_POST: '/posts',
  LIKE_POST(url, id) {
    return `${url.POSTS_URL}/${id}/upvote`;
  },

  // COMMENT URLS
  COMMENTS_URL: '/comments',
  GET_ALL_COMMENTS_URL(url, postId) {
    return `${url.COMMENTS_URL}?postId=${postId}`;
  },
  CREATE_COMMENT_URL: '/comments',
  LIKE_COMMENT_URL(url, id) {
    return `${url.COMMENTS_URL}/${id}/upvote`;
  },

  // TAGS
  TAGS_URL: '/tags',
  GET_SEARCHED_TAGS_URL(url, tagName) {
    return `${url.TAGS_URL}?tagName=${tagName}`;
  },
};

export default url;
