import {
  Await,
  Form,
  LoaderFunctionArgs,
  Location,
  defer,
  redirect,
  useAsyncValue,
  useLoaderData,
  useLocation,
  useNavigation,
} from 'react-router-dom';
import './EditPost.css';
import { TPost } from '../../types';
import { AppRoute, BASE_URL, Endpoints } from '../../constants';
import { Suspense } from 'react';

enum RequestStatus {
  Idle = 'idle',
  Loading = 'loading',
  Submiting = 'submiting',
}

function EditPostForm() {
  const post = useAsyncValue() as TPost;
  const navigator = useNavigation();

  return (
    <Form method="post" action="">
      {/* куда отправить экшен (на этот же компонент)*/}
      <input type="hidden" name="id" value={post.id} />
      <input type="hidden" name="category" value={post.category} />
      <input type="hidden" name="image" value={post.image} />
      <input type="hidden" name="publishedAt" value={post.publishedAt} />
      <input type="hidden" name="slug" value={post.slug} />
      <input type="hidden" name="status" value={post.status} />
      <input type="hidden" name="thumbnail" value={post.thumbnail} />
      <input type="hidden" name="title" value={post.title} />
      <input type="hidden" name="updatedAt" value={post.updatedAt} />
      <input type="hidden" name="url" value={post.url} />
      <input type="hidden" name="userId" value={post.userId} />
      <label>
        Title:
        <input type="text" name="title" defaultValue={post.title} />
      </label>
      <label>
        Body:
        <textarea name="content" defaultValue={post.content}></textarea>
      </label>
      <button disabled={navigator.state !== RequestStatus.Idle}>
        {navigator.state === RequestStatus.Idle ? 'Save' : 'Saving...'}
      </button>
    </Form>
  );
}

function EditPost() {
  // const {state: post}: Location<TPost> = useLocation(); // можно передавать через ссылку, но тогда не сможем прийти по url
  const {post} = useLoaderData() as {post: TPost};


  return (
    <section className="edit-post">
      <h2>Edit Post</h2>
      <Suspense fallback={<h4>Loading...</h4>}>
        <Await resolve={post}>
          <EditPostForm />
        </Await>
      </Suspense>
    </section>
  );
}

async function updatePost(newPost: { userId: string; title: string; content: string; id: string }) {
  // const id = formData.get('id');
  const response = fetch(BASE_URL + Endpoints.Posts + newPost.id, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(newPost),
  });

  return response;
}

export async function updateFormAction({ request }: LoaderFunctionArgs<any>): Promise<Response> {
  const formData = await request.formData();

  const newPost = {
    title: formData.get('title') as string,
    content: formData.get('content') as string,
    userId: formData.get('userId') as string,
    id: formData.get('id') as string,
  };

  const response = await updatePost(newPost);

  if (!response.ok) {
    throw new Response('', { status: response.status, statusText: 'Could not update post' });
  }

  return redirect('/' + AppRoute.Posts + '/' + formData.get('id'));
}

export default EditPost;
