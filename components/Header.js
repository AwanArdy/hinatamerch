"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const OtherHeader = () => {
    return (
        <header className='bg-white shadow-md py-4 rounded-br-xl rounded-bl-xl sticky top-0 z-50 mb-8'>
            <div className='container mx-auto px-6 flex justify-between items-center'>
                {/* <h1 className='text-xl font-bold text-gray-800'>HinataMerch</h1> */}
                <Link href="/" passHref>
                    <Image src='/icons/HinataMerch.png' width={170} height={170} />
                </Link>
            </div>
        </header>
    );
};

export default OtherHeader;