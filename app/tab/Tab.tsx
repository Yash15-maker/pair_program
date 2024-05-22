import React from 'react';

let steps = [
    {
        title: 'Sign in with Google',
        description: 'Sign in using your Google account to access the platform and find a pair programmer. Ensure you have a Google account and remember your login credentials.',
        src: "/Google.png",
    },
    {
        title: 'Create your Room',
        description: 'Create a room for collaboration. Familiarize yourself with the room creation process.',
        src: "/create-form.png",
    },
    {
        title: 'Join room',
        description: 'Join an existing room to collaborate with others. Understand how to join a room on the platform.',
        src: "/Room.png",
    },
];

export default function Step() {
    return (
        <div className='flex flex-col gap-8 px-5'>
            <h1 className="text-4xl font-bold text-center mt-10 italic tracking-tight text-gray-500 dark:text-white sm:text-6xl">
                Steps
            </h1>
            {steps.map((itr, index) => (
                <div
                    key={index}
                    className={` ${index === 2 && "mb-4"} flex flex-col items-center gap-4 px-4  shadow-md rounded-2xl border border-gray-200 ${index === 1 ? "lg:flex-row-reverse" : "lg:flex-row"} lg:justify-between `}
                >
                    <div className='flex-1'>
                        <h1 className='font-bold mb-2 dark:text-white text-base lg:text-4xl typewriter'>{itr.title}</h1>
                        <p className="text-gray-600 text-[18px] font-[400]">{itr.description}</p>
                    </div>
                    <div className='flex-1 h-[100px] w-full lg:h-[350px]'>
                        <img
                            src={itr.src}
                            alt={itr.title}
                            className='h-full w-full object-contain  rounded-lg'

                        />
                    </div>
                </div>
            ))}
        </div>
    );
}
