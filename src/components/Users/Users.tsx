import { useEffect, useState } from 'react';
import './Users.css';
import { TUser } from '../../types';
import { BASE_URL, Endpoints } from '../../constants';
import { useSearchParams } from 'react-router-dom';

const SEARCH_PARAM = 'id';

function Users() {
  const [users, seTAuthInfos] = useState<TUser[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get(SEARCH_PARAM);

  useEffect(() => {
    fetch(BASE_URL + Endpoints.Users + searchParams.get(SEARCH_PARAM))
      .then((result) => result.json())
      .then((data) => {
        if (Array.isArray(data)) {
          seTAuthInfos(data);
        } else if (typeof data === 'object') {
          seTAuthInfos([data]);
        } else {
          seTAuthInfos([]);
        }
      })
      .catch(() => seTAuthInfos([]));
  }, [searchParams]);

  if (!users) {
    return <h1>Loading...</h1>;
  }

  function onSearch(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    const form = evt.currentTarget;
    setSearchParams({ [SEARCH_PARAM]: form.search.value });
  }

  return (
    <div className="users">
      <h1>Users</h1>
      <form onSubmit={onSearch}>
        <input type="text" name="search" defaultValue={id !== null ? id : ''} />
        <button>Search by user id</button>
      </form>
      {users.length ? (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <p>
                <b>Name: </b>
                {user.firstname}
              </p>
              <p>
                <b>Surname:</b> {user.lastname}
              </p>
              <p>
                <b>Birth date: </b>
                {user.birthDate}
              </p>
              <p>
                <b>Email: </b>
                {user.email}
              </p>
              <p>
                <b>Phone: </b>
                {user.phone}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Ничего не найдено</p>
      )}
    </div>
  );
}

export default Users;
