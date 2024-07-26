export default function Loading() {
  return (
    <div className='animate-pulse p-5 flex flex-col gap-5'>
      <div className='aspect-square text-skeleton border-skeleton border-4 border-dashed rounded-md flex justify-center items-center' />
      <div className='flex gap-2 items-center'>
        <div className='size-14 rounded-full bg-skeleton' />
        <div className='flex flex-col gap-1'>
          <div className='h-5 w-40 bg-skeleton rounded-md' />
          <div className='h-5 w-20 bg-skeleton rounded-md' />
        </div>
      </div>
      <div className='h-10 w-80 bg-skeleton rounded-md' />
    </div>
  );
}
