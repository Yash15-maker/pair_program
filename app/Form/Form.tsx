import React from 'react'

export default function Form() {
    return (
        <div className='flex flex-col gap-6 rounded-xl shadow-lg border border-gray-200 py-4 px-5'>
            <h2 className="text-center text-xl lg:text-3xl font-[500] text-gray-700">Feedback</h2>
            <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">Name</label>
                <div className="relative mt-2 rounded-md shadow-sm">

                    <input type="text" name="price" id="price" className="block w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6" placeholder="Enter your name" />

                </div>
            </div>
            <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">Email</label>
                <div className="relative mt-2 rounded-md shadow-sm">

                    <div className="relative mt-2 rounded-md shadow-sm">

                        <input type="text" name="price" id="price" className="block w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6" placeholder="Enter your name" />

                    </div>

                </div>
            </div>
            <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">Feedback</label>
                <div className="relative mt-2 rounded-md shadow-sm">
                    <div className="relative mt-2 rounded-md shadow-sm">

                        <textarea name="price" id="price" className="block w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6" placeholder="Enter your views" />
                    </div>

                </div>
            </div>
        </div>
    )
}
