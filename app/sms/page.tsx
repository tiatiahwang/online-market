import Button from '@/components/button';
import Input from '@/components/input';

export default function SMSLogin() {
  return (
    <div className='container'>
      <div className='flex flex-col gap-2 *:font-medium'>
        <h1 className='text-3xl'>SMS Login</h1>
        <h2 className='text-xl'>Verify your phone number.</h2>
      </div>
      <form className='flex flex-col gap-3'>
        <Input name='phone' type='number' placeholder='phone number' required errors={[]} />
        <Input name='code' type='number' placeholder='verification code' required errors={[]} />
        <Button text='Verify' />
      </form>
    </div>
  );
}
