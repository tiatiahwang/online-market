import FormButton from '@/components/form-btn';
import FormInput from '@/components/form-input';

export default function SMSLogin() {
  return (
    <div className='container'>
      <div className='flex flex-col gap-2 *:font-medium'>
        <h1 className='text-3xl'>SMS Login</h1>
        <h2 className='text-xl'>Verify your phone number.</h2>
      </div>
      <form className='flex flex-col gap-3'>
        <FormInput type='number' placeholder='phone number' required errors={[]} />
        <FormInput type='number' placeholder='verification code' required errors={[]} />
        <FormButton loading={false} text='Verify' />
      </form>
    </div>
  );
}
