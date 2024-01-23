import {
  Await,
  LoaderFunctionArgs,
  Params,
  defer,
  json,
  useAsyncValue,
  useLoaderData,
} from 'react-router-dom';

import { BASE_URL, Endpoints } from '../../constants';
import './Post.css';
import type { TPost } from '../../types';
import { Suspense } from 'react';


function Post() {
  const post = useAsyncValue() as TPost;

  return (
    <div className="post">
      <h1>{post.id + '. ' + post.title}</h1>
      <h4>{post.publishedAt}</h4>
      <p>{post.content}</p>
    </div>
  );
}

function SinglePost() {
  const { post } = useLoaderData() as { post: TPost };

  return (
    <Suspense fallback={<h2>Loading...</h2>}>
      <Await resolve={post}>
        <Post />
      </Await>
    </Suspense>
  );
}

export async function fetchPost(params: Params<string>): Promise<TPost | {error: string}> {
  const id = params.id;
  const response = await fetch(BASE_URL + Endpoints.Posts + id);

  const data = await response.json();
  return data;
}

export async function postLoader({params}: LoaderFunctionArgs<any>): Promise<ReturnType<typeof defer>> {
  const response = await fetchPost(params);

  if ('error' in response) {
    const data = {sorry: 'You have been fired.', hrEmail: 'hr@bigco.com'};
    const error = {status: 401, statusText: response.error};
    throw json(data, error);
  }

  return defer({ post: response });
}

export default SinglePost;
