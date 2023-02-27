import React from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";
import jwtDecode from "jwt-decode";
import { client } from "../client";

const Login = () => {
  const navigate = useNavigate();
  /*function handleCallbackResponse(response) {
    console.log(response);
  }
  useEffect(() => {
    /* global google */
  /*google.account.id.initialize({
      client_id:
        "820152016788-sdtal4dhmjat9mrpm3k9lep0sel6dq6a.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);*/

  const responseGoogle = (response) => {
    let userObject = jwtDecode(response.credential);

    localStorage.setItem("user", JSON.stringify(userObject));

    console.log(userObject);

    const { sub, family_name, given_name, picture } = userObject;

    const doc = {
      _id: sub,
      _type: "user",
      userName: `${given_name} ${family_name}`,
      image: picture,
    };

    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });
  };

  return (
    <section className="flex justify-start items-center flex-4 h-screen">
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />

        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="130px" alt="app-logo" />
          </div>
          <div className="shadow-2x1" id="signInDiv">
            <GoogleLogin onSuccess={responseGoogle} onError={responseGoogle} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
