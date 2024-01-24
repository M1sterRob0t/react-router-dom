import { Form, LoaderFunctionArgs, redirect } from 'react-router-dom';
import { AppRoute, BASE_URL, Endpoints } from '../../constants';
import './CreatePost.css';

type TUserPost = {
  userId: string;
  title: string;
  content: string;
}

function CreatePost() {

  return (
    <section className="create-post" style={{ marginTop: '50px' }}>
      <h2>Create post section</h2>
      <Form method="post" action=''>{/* куда отправить экшен (на этот же компонент)*/}
        <input type="hidden" name="userId" value="2" />
        <label>
          Title:
          <input type="text" name="title" />
        </label>
        <label>
          Body:
          <textarea name="content"></textarea>
        </label>
        <button>Submit mthfcr</button>
      </Form>
    </section>
  );
}

async function createPost(body: TUserPost) {
  const response = await fetch(BASE_URL + Endpoints.Posts, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  return response;
}

export async function createPostAction({request}: LoaderFunctionArgs<any>): Promise<Response> {
  let formData = await request.formData();

  const data: TUserPost = {
    title: formData.get('title') as string,
    content: formData.get('content') as string,
    userId: formData.get('userId') as string,
  }

  const response: Response = await createPost(data);

  if (!response.ok) {
    throw new Response('', { status: response.status, statusText: 'Could not create post' });
  }

  return redirect('/' + AppRoute.Posts);
}

export default CreatePost;
