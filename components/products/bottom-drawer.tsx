'use client';

import { useState } from 'react';
import { DeleteIcon, EditIcon, EllipsisIcon } from '../svg';
import Link from 'next/link';

const BottomDrawer = ({ productId }: { productId: string }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <>
      <div className='cursor-pointer size-[20px]' onClick={() => setOpenDrawer(true)}>
        <EllipsisIcon width='20' height='20' stroke='#ECECEC' />
      </div>
      {openDrawer && (
        <div className='z-40 fixed inset-0 max-w-sm mx-auto w-full h-screen bg-[#212121]/50'>
          <div className='w-full max-w-sm z-50 fixed bottom-0 bg-dark-bg border-t px-4 py-6 space-y-6 h-[150px]'>
            <Link href={`/products/${productId}/edit`} className='flex items-center space-x-2 cursor-pointer'>
              <EditIcon width='20' height='20' stroke='#ECECEC' />
              <span>수정하기</span>
            </Link>
            <div className='flex items-center space-x-2 cursor-pointer'>
              <DeleteIcon width='20' height='20' stroke='#ECECEC' />
              <span>삭제하기</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BottomDrawer;
