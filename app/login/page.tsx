import FormButton from '@/components/form-btn';
import FormInput from '@/components/form-input';
import SocialLogin from '@/components/social-login';

export default function Login() {
  return (
    <div className='container'>
      <div className='flex flex-col gap-2 *:font-medium'>
        <h1 className='text-3xl'>Welcome!</h1>
        <h2 className='text-xl'>Login in with email and passwrod.</h2>
      </div>
      <form className='flex flex-col gap-3'>
        <FormInput type='email' placeholder='email' required errors={[]} />
        <FormInput type='password' placeholder='password' required errors={[]} />
        <FormButton loading={false} text='Login' />
      </form>
      <div className='w-full h-px bg-neutral-500' />
      <SocialLogin />
    </div>
  );
}
