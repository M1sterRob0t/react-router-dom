import { Form, LoaderFunctionArgs, redirect } from "react-router-dom";
import { AppRoute, BASE_URL, Endpoints } from "../../constants";
import './CreateUser.css';

type TUser = {
  id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
}

function CreateUser() {
  return (
    <section className="create-user" style={{ marginTop: '50px' }}>
      <h2>Create post section</h2>
      <Form method="post" action={AppRoute.CreateUser}>
        <input type="hidden" name="id" value="42" />
        <label>
          Name:
          <input type="text" name="Name" />
        </label>
        <label>
          Surname:
          <input type="text" name="Surname" />
        </label>
        <label>
          Email:
          <input type="email" name="Email" />
        </label>
        <label>
          Phone:
          <input type="number" name="Phone" />
        </label>
        <button>Submit mthfcr</button>
      </Form>
    </section>
  );
}

async function createUser(body: TUser) {
  const response = await fetch(BASE_URL + Endpoints.Users, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  return response;
}

export async function createUserAction({request}: LoaderFunctionArgs<any>): Promise<Response> {
  let formData = await request.formData();

  const data: TUser = {
    name: formData.get('name') as string,
    surname: formData.get('surname') as string,
    phone: formData.get('phone') as string,
    email: formData.get('email') as string,
    id: formData.get('id') as string,
  }

  const response: Response = await createUser(data);

  if (!response.ok) {
    console.log(response.ok, response);
    throw new Response('', { status: response.status, statusText: 'Could not create user' });
  }

  return redirect('/' + AppRoute.Users);
}

export default CreateUser;
