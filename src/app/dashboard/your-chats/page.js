
//MAKE THIS RESPONSIVE TO SCREEN SIZE
export default function Page() {
    return (
        <div className="h-[calc(100vh-80px)] bg-gray-800 flex flex-row items-start p-7 mt-20">
            <div className = "flex flex-col justify-start items-start w-1/2 h-full pr-7">
                <form class="mx-auto w-full pb-7" >   
                    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div class="relative">
                        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for a person" required />
                        <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                    </div>
                </form>

                <ul className="w-full divide-y divide-gray-200 dark:divide-gray-700 overflow-auto">
                    <li className="pt-3 pb-3 ">
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <div className="flex-shrink-0">
                            <img
                                className="w-8 h-8 rounded-full"
                                src="/docs/images/people/profile-picture-1.jpg"
                                alt="Neil image"
                            />
                            </div>
                            <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                Neil Sims
                            </p>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        </div>
                    </div>
                    </li>
                    <li className="pt-3 pb-3">
                        <div className="flex items-center space-x-4 rtl:space-x-reverse">
                            <div className="flex-shrink-0">
                                <img
                                    className="w-8 h-8 rounded-full"
                                    src="/docs/images/people/profile-picture-1.jpg"
                                    alt="Neil image"
                                />
                                </div>
                                <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    Neil Sims
                                </p>
                                </div>
                                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                            
                            


                            </div>
                        </div>
                    </li>
                </ul>
            </div>

            <div className = "flex flex-col justify-between items-start w-1/2 h-full border-l-2 pl-10 ">

                <li className="pb-3 list-none border-b-2">
                    <div className="flex items-center space-x-4 rtl:space-x-reverse ">
                        <div className="flex-shrink-0">
                            <img
                                className="w-8 h-8 rounded-full"
                                src="/docs/images/people/profile-picture-1.jpg"
                                alt="Neil image"
                            />
                        </div>
                        <div className="flex-1 min-w-0 ">
                            <p className="text-lg font-medium text-gray-900 truncate dark:text-white">
                                Neil Sims
                            </p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        
                        


                        </div>
                    </div>
                </li>

                <div className="flex flex-col justify-end w-full h-full pb-4">
                    
                    <div className = "w-full flex justify-start">
                        <div class="flex items-start mb-2.5">
                            <div class="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">

                                <p class="text-sm font-normal py-2.5 text-gray-900 dark:text-white">That's awesome. I think our users will really appreciate the improvements.</p>
                            </div>
                        </div>

                    </div>
                    
                    <div className = "w-full flex justify-end">
                        <div class="flex items-end mb-2.5">
                            <div class="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-tl-xl rounded-br-xl rounded-bl-xl dark:bg-gray-700">
                                <p class="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
                                    That's awesome. I think our users will really appreciate the improvements.
                                </p>
                            </div>
                        </div>

                    </div>
                    


                </div>

                <form className = "w-full">
                    <label for="chat" class="sr-only">Your message</label>
                    <div class="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">

                        <textarea id="chat" rows="1" class="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..."></textarea>
                            <button type="submit" class="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
                            <svg class="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z"/>
                            </svg>
                            <span class="sr-only">Send message</span>
                        </button>
                    </div>
                </form>


            </div>
            
        </div>

    )
}