import { Alert, Button, Spinner, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// state management
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error: errrMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // form data state
  ///////////////////////////// trim method is romove the white space in input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  //////////////////////handling on submit request
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill in all fields."));
    }
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, //////
        body: JSON.stringify(formData), // Pass formData, not setFormData
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="py-2 px-4  text-white  rounded-lg bg-primary">
              TET
            </span>
            TTS App
          </Link>
          <p className="text-2xl mt-5">
            You can sign up with your email and password or with a Google
            account{" "}
          </p>
        </div>
        {/* right */}
        <div className=" flex-1">
          <form className="flex flex-col gap-3 signin" onSubmit={handleSubmit}>
            <div className="">
              <Label value="Email" />
              <TextInput
                type="email"
                id="email"
                placeholder="company@exampel.com"
                onChange={handleChange}
              />
            </div>

            <div className="">
              <Label value=" Passwrod" />
              <TextInput
                type="password"
                id="password"
                placeholder="**********"
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  {" "}
                  <Spinner size="sm" /> <span>Loding...</span>{" "}
                </>
              ) : (
                "ورود"
              )}
            </Button>

            <OAuth />
          </form>

          <div className="flex gap-2 text-sm mt-3">
            <span>Don't have an account?</span>

            <Link to="/sign-up" className="text-blue-500">
              {" "}
             SignUp{" "}
            </Link>
          </div>

          <div>
            {errrMessage && (
              <Alert className="mt-5" color="failure">
                {" "}
                {errrMessage}{" "}
              </Alert>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
