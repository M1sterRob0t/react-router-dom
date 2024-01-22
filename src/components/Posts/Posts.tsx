import { useEffect, useState } from 'react';
import './Posts.css';
import { TPost } from '../../types';
import { AppRoute, BASE_URL, Endpoints } from '../../constants';
import { Link, useSearchParams } from 'react-router-dom';

const SEARCH_PARAM = 'title';

function Posts() {
  const [posts, setPosts] = useState<TPost[] | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const searchText = searchParams.get(SEARCH_PARAM) || '';

  useEffect(() => {
    fetch(BASE_URL + Endpoints.Posts) // '?' + searchParams.toString()
      .then((result) => result.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPosts(data);
        } else if (typeof data === 'object') {
          setPosts([data]);
        }  else {
          setPosts([]);
        }
      });

  }, []);

  if (!posts) {
    return <h1>Loading...</h1>;
  }

  function onSearch(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    const form = evt.currentTarget;
    setSearchParams({[SEARCH_PARAM]: form.search.value});
  }

  return (
    <div className="posts">
      <h1>Posts</h1>
      <form onSubmit={onSearch}>
        <input type="text" name="search" defaultValue={searchText} />
        <button>Search</button>
      </form>
      <ul>
        {posts.filter((post) => post.title.includes(searchText)).map((post, i, arr) => (
          <li key={post.id}>
            <Link to={AppRoute.Posts + '/' + post.id}>{arr.length === 1 ? post.title : i + 1 + '. ' + post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Posts;
