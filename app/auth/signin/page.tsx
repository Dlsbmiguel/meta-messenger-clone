import { getProviders } from "next-auth/react";
import Image from "next/image";
import SignInComponent from "../../../components/SignInComponent";

const SignInPage = async () => {
  const providers = await getProviders();
  return (
    <div className="grid justify-center">
      <div className="">
        <Image
          className="object-cover mx-2 rounded-full"
          width={700}
          height={700}
          src="https://links.papareact.com/161"
          alt="Profile Picture"
        />
      </div>
      <SignInComponent providers={providers} />
    </div>
  );
};

export default SignInPage;
