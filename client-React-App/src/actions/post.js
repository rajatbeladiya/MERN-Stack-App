import axios from 'axios';
import { setAlert } from './alert';
import { GET_POSTS, POST_ERROR, UPDATE_LIKES, DELETE_POST } from './types';

// get posts

export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get('/api/posts');

    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err && err.response && err.response.statusText, status: err && err.response && err.response.status }
    });
  }
};

// Add Like
export const addLike = postId => async dispatch => {
  console.log('like======');
  try {
    const res = await axios.put(`/api/posts/like/${postId}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id: postId, likes: res.data},
    })
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err && err.response && err.response.statusText, status: err && err.response && err.response.status }
    });
  }
}

// Remove Like
export const removeLike = postId => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/unlike/${postId}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id: postId, likes: res.data},
    })
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err && err.response && err.response.statusText, status: err && err.response && err.response.status }
    });
  }
}

// Delete Posts
export const deletePost = postId => async dispatch => {
  try {
    const res = await axios.delete(`/api/posts/${postId}`);

    dispatch({
      type: DELETE_POST,
      payload: postId,
    });

    dispatch(setAlert('Post removed', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err && err.response && err.response.statusText, status: err && err.response && err.response.status }
    });
  }
}
