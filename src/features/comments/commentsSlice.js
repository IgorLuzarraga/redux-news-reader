// Import createAsyncThunk and createSlice here.
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Create loadCommentsForArticleId here.
export const loadCommentsForArticleId = createAsyncThunk(
  'comments/loadCommentsForArticleId',
  async (articleId) => {
    const response = await fetch('api/articles/${articleId}/comments');
    const json = await response.json();
    return json;
  }
);

// Create postCommentForArticleId here.
export const postCommentForArticleId = createAsyncThunk(
  'comments/postCommentForArticleId',
  async ({articleId, comment}) => {
    const requestBody = JSON.stringify({comment: comment});

    const response = await fetch('api/articles/${articleId}/comments', {
      method: 'POST',
      body: requestBody
    });
    
    const json = await response.json();
    return json;
  }
);

export const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
      // Add initial state properties here.
      byArticleId: {},
      isLoadingComments: false,
      hasError: false,
      createCommentIsPending: false,
      failedToCreateComment: false
    },
    // Add extraReducers here.
    extraReducers: (builder) => {
      builder
        .addCase(loadCommentsForArticleId.pending, (state) => {
          state.isLoadingComments = true;
          state.hasError = false;
        })
        .addCase(loadCommentsForArticleId.fulfilled, (state, action) => {
          state.isLoadingComments = false;
          state.hasError = false;
          //state.byArticleId = action.payload;
          state.byArticleId = {[action.payload.articleId]: action.payload.comments}
        })
        .addCase(loadCommentsForArticleId.rejected, (state) => {
          state.isLoadingComments = false;
          state.hasError = true;;
        })
        .addCase(postCommentForArticleId.pending, (state) => {
          state.createCommentIsPending = true;
          state.failedToCreateComment = false;
        })
        .addCase(postCommentForArticleId.fulfilled, (state, action) => {
          state.createCommentIsPending = false;
          state.failedToCreateComment = false;
          state.byArticleId[action.payload.articleId]
              .push(action.payload);
        })
        .addCase(postCommentForArticleId.rejected, (state) => {
          state.createCommentIsPending = false;
          state.failedToCreateComment = true;;
        })
    }
  });
  
  export const selectComments = (state) => state.comments.byArticleId;
  export const isLoadingComments = (state) => state.comments.isLoadingComments;
  export const createCommentIsPending = (state) => state.comments.createCommentIsPending;
  
  export default commentsSlice.reducer;
  