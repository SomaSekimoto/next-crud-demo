import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

import { useUser, login, logout } from "../lib/auth";

const Home: NextPage = () => {
  const user = useUser();

  const handleLogin = (): void => {
    login().catch((error) => console.error(error));
  };

  const handleLogout = (): void => {
    logout().catch((error) => console.error(error));
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Auth Example</title>
      </Head>

      <div>
        <h1>Auth Example</h1>
        <button onClick={handleLogin}>Googleログイン</button>
        <button onClick={handleLogout}>ログアウト</button>
        {user !== null ? (
          <h2>ログインしている</h2>
        ) : (
          <h2>ログインしていない</h2>
        )}
      </div>
      <div>
        <h2>current user</h2>
        <p>{user?.email}</p>
        <p>{user?.displayName}</p>
      </div>
    </div>
  );
};

export default Home
