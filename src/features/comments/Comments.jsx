import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadCommentsForArticleId,
  selectComments,
  isLoadingComments,
} from './commentsSlice';
import { selectCurrentArticle } from '../currentArticle/currentArticleSlice';
import CommentList from '../../components/CommentList';
import CommentForm from '../../components/CommentForm';

const Comments = () => {
  const dispatch = useDispatch();
  const article = useSelector(selectCurrentArticle);
  // Declare additional selected data here.
  //const comments = [];
  const comments = useSelector(selectComments)
  //const commentsAreLoading = false;
  const commentsAreLoading = useSelector(isLoadingComments);

  if (commentsAreLoading) return <div>Loading Comments</div>;
  if (!article) return null;

  let commentsForArticleId = []
  if (!article) {
    commentsForArticleId = []
  } else {
    commentsForArticleId = comments[article.id]
  }

  //console.log("commentsForArticleId: ", commentsForArticleId)
  
  // //Dispatch loadCommentsForArticleId with useEffect here.
  //  useEffect(() => {
  //   dispatch(loadCommentsForArticleId(article.id))
  // }, [article, dispatch])

  return (
    <div className='comments-container'>
      <h3 className='comments-title'>Comments</h3>
      <CommentList comments={commentsForArticleId} />
      {/* <CommentList comments={[]} /> */}
      <CommentForm articleId={article.id} />
    </div>
  );
};

export default Comments;
