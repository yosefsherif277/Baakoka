import Image from 'next/image';
import { dummyConnectionsData } from '../../assets/assets';
import { Eye, MessageSquare } from 'lucide-react';

const Messages = () => {
    return (
        <div className='min-h-screen relative bg-slate-50'>
            <div className='max-w-6xl mx-auto p-6'>
                {/* Title */}
                <div className='mb-8'>
                    <h1 className='text-3xl font-bold text-slate-900 mb-2'>Messages</h1>
                    <p className='text-slate-600'>Talk to your friends and family</p>
                </div>

                {/* Connected Users */}
                <div className='flex flex-col gap-3'>
                    {dummyConnectionsData.map((user) => (
                        <div key={user._id} className='max-w-xl flex flex-wrap gap-5 p-6 bg-white shadow rounded-md'>
                            <Image 
                                src={user.profile_picture} 
                                alt={`${user.full_name}'s profile`} 
                                className='rounded-full size-12 mx-auto'
                                width={48}
                                height={48}
                            />
                            <div className='flex-1 min-w-0'>
                                <p className='font-medium text-slate-700 truncate'>{user.full_name}</p>
                                <p className='text-slate-500 truncate'>@{user.username}</p>
                                <p className='text-sm text-gray-600 truncate'>{user.bio}</p>
                            </div>
                            <div className='flex flex-col gap-2 mt-4'>
                                <button 
                                    className='size-10 flex items-center justify-center text-sm rounded bg-slate-100 hover:bg-slate-200 text-slate-800 active:scale-95 transition cursor-pointer gap-1'
                                >
                                    <MessageSquare className="w-4 h-4"/>
                                </button>
                                <button 
                                    className='size-10 flex items-center justify-center text-sm rounded bg-slate-100 hover:bg-slate-200 text-slate-800 active:scale-95 transition cursor-pointer'
                                >
                                    <Eye className="w-4 h-4"/>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Messages;