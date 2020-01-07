import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getPost } from '../../actions/post';
import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import { Link, withRouter } from 'react-router-dom';

const Post = ({ getPost, post: { post, loading }, match, history }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost]);
  return loading || post === null ? <Spinner /> :
    <Fragment>
      <Link to="/" onClick={e => history.goBack()} className="btn">
        Back  
      </Link> 
      <PostItem post={post} showActions={false} />
      <CommentForm postId={post._id} />
      <div className="comments">
        {
          post && post.comments && post.comments.map(comment => (
            <CommentItem key={comment._id} comment={comment} postId={post._id} />
          ))
        }
      </div>
    </Fragment>
}

Post.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost })(withRouter(Post));
