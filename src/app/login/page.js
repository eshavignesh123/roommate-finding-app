import Image from "next/image";
import Link from 'next/link';
import styles from "../styles/login.css";

export default function Login() {
  return (
    <div className="login-page-container">
      <form>
        <div className="flex first-row-login-container mb-5">
          <h1 className = "text-3xl" >Login</h1>
          <a 
            href="/" 
            class="text-blue-700 hover:text-blue-800 focus:underline underline underline-offset-4">
            Go back
          </a>
        </div>

          <div class="mb-6">
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
              <input type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required />
          </div> 
          <div class="mb-6">
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
              <input type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required />
          </div> 

          
          <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
          <a 
            href="/signup" 
            class="text-blue-700 hover:text-blue-800 focus:underline underline underline-offset-4 ml-4">
            Don't have an account?
          </a>
      </form>

    </div>
  );
}

