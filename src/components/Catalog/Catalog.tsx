import React, { useEffect, useState } from 'react';
import './Catalog.css';
import { TPost } from '../../types';
import { AppRoute, BASE_URL, Endpoints } from '../../constants';
import { Link } from 'react-router-dom';

const POSTS_NUMBER = 10;

function Catalog() {
  const [posts, setPosts] = useState<TPost[] | null>(null);

  useEffect(() => {
    fetch(BASE_URL + Endpoints.Posts)
      .then((result) => result.json())
      .then((data) => setPosts(data.slice(0, POSTS_NUMBER)));
  }, []);

  if (!posts) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="catalog">
      <h1>Catalog</h1>
      <h4>Posts</h4>
      <ul>
        {posts.map((post, i) => (
          <li key={post.id}>
            <Link to={AppRoute.Posts + post.id}>{i + 1 + '. ' + post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Catalog;
