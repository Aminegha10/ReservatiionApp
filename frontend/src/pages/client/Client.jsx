import { useCreateClientMutation, useLoginClientMutation } from "@/app/services/clientApi";
import LoginClient from "@/components/client/LoginClient";
import SignupClient from "@/components/client/SignupClient";
import { useState } from "react";

export default function Client() {
  const [isSignIn, setSignIn] = useState(true); // Renamed SingIn to isSignIn for clarity
  const [addClient] = useCreateClientMutation(); // Client signup mutation
  const [loginClient] = useLoginClientMutation(); // Client login mutation

  return (
    <>
      {isSignIn ? (
        <LoginClient
          loginClient={loginClient} // Prop name should be clear and descriptive
          setSignIn={setSignIn} // Pass setSignIn function to switch between views
        />
      ) : (
        <SignupClient
          setSignIn={setSignIn} // Pass setSignIn function to switch to login view
          addClient={addClient} // Pass signup mutation function as addClient
        />
      )}
    </>
  );
}
