import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getPost } from '../../actions/post';
import PostItem from '../posts/PostItem';
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
