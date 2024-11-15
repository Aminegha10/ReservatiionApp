import {
  useCreatePrestataireMutation,
  useLoginPrestataireMutation,
} from "@/app/services/prestataireApi";
import LoginPrestataire from "../../components/Prestataire/LoginPrestataire";
import SignUpPrestataire from "@/components/Prestataire/SignUpPrestataire";
import { useState } from "react";

export default function Prestataire() {
  const [SingIn, setSignIn] = useState(true);
  const [addPrestataire] = useCreatePrestataireMutation();
  const [Login] = useLoginPrestataireMutation();
  return (
    <>
      {SingIn ? (
        <LoginPrestataire
          Login={Login}
          setSignIn={setSignIn}
        />
      ) : (
        <SignUpPrestataire setSignIn={setSignIn} PostData={addPrestataire} />
      )}
    </>
  );
}
