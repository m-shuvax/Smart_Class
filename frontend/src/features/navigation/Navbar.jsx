import React from "react";


function Navbar() {

    return (
        <div class='text-orange-600 flex'>
            <div class="w-8/12 bg-green-100 h-screen flex flex-col justify-center items-center">
                <p class="text-center">Log in</p>
                <div class="mb-4 w-6/12 flex">
                    <label for="username" class="block text-gray-700 text-sm font-bold mb-2">Username</label>
                    <input type="text" id="username" name="username" class="shadow appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></input>                </div>
                <div class="mb-6 w-6/12 flex">
                    <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input type="password" id="password" name="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></input>
                </div>
                <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-0.5 px-4 border border-blue-500 hover:border-transparent rounded">
                    Forgot Password
                </button>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded w-6/12">
                    Enter
                </button>
            </div>
            <div class="flex justify-center items-center w-4/12 bg-green-400 h-screen">
                <div class="text-white text-center">
                    <p>Sign in</p>
                    <div class="mt-8">
                        <p class="mb-2">Your first time here? Register</p>
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Register</button>
                    </div>
                </div>
            </div>
            <div id="root"></div>
            <script type="module" src="/src/main.jsx"></script>
        </div>
    )

}
export default Navbar