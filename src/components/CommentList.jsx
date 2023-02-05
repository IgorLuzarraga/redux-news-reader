import React from 'react';
import Comment from './Comment';

export default function CommentList({ comments }) {
  if (!comments) {
    return null;
  }
  
  return (
    <ul className='comments-list'>
      {renderComment(comments)}
    </ul>
  );
}

const renderComment = (comments) =>
  comments.map(comment => {
    return <li><Comment comment={comment} /></li>
  })
