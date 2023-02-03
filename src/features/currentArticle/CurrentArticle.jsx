import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectCurrentArticle,
  isLoadingCurrentArticle,
} from './currentArticleSlice.js';
import FullArticle from '../../components/FullArticle.jsx';

const CurrentArticle = () => {
  const article = useSelector(selectCurrentArticle);
  const currentArticleIsLoading = useSelector(isLoadingCurrentArticle);

  if (currentArticleIsLoading) {
    return <div>Loading</div>;
  } else if (!article) {
    return null;
    //return <h1>Current Article</h1>
  }

  return <FullArticle article={article} />;
};

export default CurrentArticle;
