import { Suspense } from 'react';
import './Posts.css';
import { TPost } from '../../types';
import { BASE_URL, Endpoints } from '../../constants';
import { Await, Link, defer, useLoaderData, useSearchParams } from 'react-router-dom';

const SEARCH_PARAM = 'title';

function Posts() {
  const { posts } = useLoaderData() as { posts: TPost[] };
  const [searchParams, setSearchParams] = useSearchParams();

  const searchText = searchParams.get(SEARCH_PARAM) || '';

  function onSearch(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    const form = evt.currentTarget;
    setSearchParams({ [SEARCH_PARAM]: form.search.value });
  }

  return (
    <div className="posts">
      <h1>Posts</h1>
      <form onSubmit={onSearch}>
        <input type="text" name="search" defaultValue={searchText} />
        <button>Search</button>
      </form>
      <Suspense fallback={<h2>Loading...</h2>}>
        <Await resolve={posts}>
          {(resolvedPosts: TPost[]) => (
            <ul>
              {resolvedPosts
                .filter((post) => post.title.includes(searchText))
                .map((post, i, arr) => (
                  <li key={post.id}>
                    <Link to={`${post.id}`}>
                      {arr.length === 1 ? post.title : i + 1 + '. ' + post.title}
                    </Link>
                  </li>
                ))}
            </ul>
          )}
        </Await>
      </Suspense>
    </div>
  );
}

async function fetchPosts(): Promise<TPost[] | TPost> {
  const response = await fetch(BASE_URL + Endpoints.Posts);

  if (response.status === 404) {
    throw new Response('', { status: response.status, statusText: 'Posts not found' });
  }

  if (!response.ok) {
    throw new Response('', { status: response.status, statusText: 'Could not fetch posts' });
  }

  const data = await response.json();

  if (Array.isArray(data)) {
    return data;
  } else if (typeof data === 'object') {
    return [data];
  } else {
    return [];
  }
}

export async function postsLoader(): Promise<ReturnType<typeof defer>> {
  return defer({ posts: fetchPosts() });
}

export default Posts;
