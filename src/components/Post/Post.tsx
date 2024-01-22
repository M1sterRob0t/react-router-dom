import { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';

import { AppRoute, BASE_URL, Endpoints } from '../../constants';

import './Post.css';
import type { TPost } from '../../types';


function Post() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [post, setPost] = useState<TPost | null>(null);
  const [isLoading, setLoadingStatus] = useState<boolean>(true);
  console.log(location);
  useEffect(() => {
    if (id) {
      fetch(BASE_URL + Endpoints.Posts + id)
        .then((result) => result.json())
        .then((post) => setPost(post))
        .catch((err) => console.error(err))
        .finally(() =>setLoadingStatus(false));
    } else {
      navigate(AppRoute.NotFound);
    }
  }, [navigate, id]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!post) {
    return <Navigate to={AppRoute.NotFound} />;
  }

  return (
    <div className="post">
      <h1>{post.id + '. ' + post.title}</h1>
      <h4>{post.publishedAt}</h4>
      <p>{post.content}</p>
    </div>
  );
}

export default Post;
