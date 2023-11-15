import { cookies } from 'next/headers';

export default function SignOutButton({ router, deleteLocalStorage }) {
  return (
    <button
      className="btn btn-error content-center"
      onClick={() => {
        cookies().delete('user');
        deleteLocalStorage('user_data');
        router.redirect('/');
      }}
    >
      Sign out
    </button>
  );
}
