import AcmeLogo from '@app/ui/common/acme-logo';
import SignUpForm from '@app/ui/signup/siginup-form';
 
 const SignUpPage = () =>{
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <AcmeLogo />
          </div>
        </div>
        <SignUpForm />
      </div>
    </main>
  );
}

export default SignUpPage