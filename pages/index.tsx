import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

import { useUser, useNewUserEmail, useNewUserPassword, login, logout, register } from "../lib/auth";

const Home: NextPage = () => {
  const user = useUser();
  const [newUserEmail, setNewUserEmail] = useNewUserEmail();
  const [newUserPassword, setNewUserPassword] = useNewUserPassword();

  const handleLogin = (): void => {
    login().catch((error) => console.error(error));
  };

  const handleLogout = (): void => {
    logout().catch((error) => console.error(error));
  };

  const handleRegister = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => { 
    // register(newUser.email, newUser.password).catch((error) => console.error(error));
    e.preventDefault();
    register(newUserEmail, newUserPassword)
    .then(
      (userCredentials)=>{
        console.log('userCredentials')
        console.log(userCredentials)
      })
    .catch(
      (error) => {
        console.error(error)
      });
    

  }

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUserEmail(e.currentTarget.value)
  };
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUserPassword(e.currentTarget.value)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>AuthDemo</title>
      </Head>

      <div>
        <h1>AuthDemo</h1>
        <div>
          {user !== null ? (
                    <h2>ログインしている</h2>
                  ) : (
                    <h2>ログインしていない</h2>
                  )}
          <div>
            <h2>current user</h2>
            <p>{user?.email}</p>
            <p>{user?.displayName}</p>
          </div>
          <button 
            onClick={handleLogout}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >ログアウト</button>
        </div>
        <div className="w-full max-w-xs">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={newUserEmail}
                onChange={handleChangeEmail}
                id="email" type="text" placeholder="Email"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                value={newUserPassword}
                onChange={handleChangePassword}
                id="password" type="password" placeholder="******************"
              />
              <p className="text-red-500 text-xs italic">Please choose a password.</p>
            </div>
            <div className="flex items-center justify-between">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                Sign In
              </button>
              <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                Forgot Password?
              </a>
            </div>
            <div>
              <h3>Or don't have an account?</h3>
              <div>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={handleRegister}
                  type="button"
                >
                  Sign Up
                </button>
              </div>
            </div>
            <div>
              <h3>Other</h3>
              <div className="flex items-center justify-between">
                <button 
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={handleLogin}
                  type="button"
                >
                  Google
                </button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                  Web3 Wallet
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home
