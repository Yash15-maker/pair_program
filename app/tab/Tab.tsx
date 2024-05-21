import Image from 'next/image'
import React from 'react'

let steps = [
    {
        title: 'Sign in with Google',
        description: 'Sign in using your Google account to access the platform and find a pair programmer.Ensure you have a Google account and remember your login credentials.',
        // src: "/Google.png",
        completed: true,
    },
    {
        title: 'Create your Room',
        description: 'Create a room for collaboration.Familiarize yourself with the room creation process.',
        // src: "/create-form.png",
        completed: false,
    },
    {
        title: 'Join room',
        description: 'Join an existing room to collaborate with others.Understand how to join a room on the platform.',
        // src: "/Room.png",
        completed: false,
    },
]

export default function Step() {
    return (
        <div className='flex flex-col gap-3 p-5'>
            <div className='text-5xl font-[600] border-b border-gray-200 leading-8 text-gray-800 shadow-sm dark:text-gray-200 w-full flex justify-center px-4 py-4 '>HINTS</div>
            <link
                href="https://fonts.googleapis.com/icon?family=Material+Icons"
                rel="stylesheet"
            />
            <div className='flex flex-col gap-10 pt-4'>
                {steps.map((step, i) => (
                    <div className="flex flex-col gap-3" key={i}>
                        <div style={{ display: 'flex', alignItems: "center", gap: "4px" }}>
                            <div className='text-4xl text-gray-600'>
                                {i + 1 + "."}
                            </div>
                            <span className='text-5xl font-[800] text-gray-500'>{step.title}</span>
                        </div>
                        <div
                            style={{
                                ...(i !== steps.length - 1 && {
                                    borderLeft: 'solid 1px #ccc',
                                    marginTop: 4,
                                    marginBottom: 4,
                                }),
                                marginLeft: 12,
                                paddingLeft: 12,
                                paddingTop: 8,
                                paddingBottom: 8,
                            }}
                            className="text-xl text-gray-600 flex flex-col gap-2"
                        >
                            <span className='flex'>{step.description}</span>
                            {/* <div className='h-full w-full'><img src={step.src} className='h-[500px] w-fit' /></div> */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
