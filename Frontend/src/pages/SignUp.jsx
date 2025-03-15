import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errrMessage, setErrorMessage] = useState(null);
  const [loding, setLoding] = useState(false);
  const navigate = useNavigate();

  // form data state
  // trim method is romove the white space in inputlo
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  /// handling on submit request
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("Please fill out all fields.");
    }

    try {
      setLoding(true);
      setErrorMessage(null);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData), // Pass formData, not setFormData
      });

      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoding(false);
      if (res.ok) {
        navigate("/sign-in");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoding(false);
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
        <div className="flex-1">
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <div className="">
              <Label value="UseName" />
              <TextInput
                type="text"
                id="username"
                placeholder="Name "
                onChange={handleChange}
              />
            </div>

            <div className="">
              <Label value="Email" />
              <TextInput
                type="email"
                id="email"
                placeholder="name@example.com"
                onChange={handleChange}
              />
            </div>

            <div className="">
              <Label value=" Password" />
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
              disabled={loding}
            >
              {loding ? (
                <>
                  <Spinner size="sm" />
                  <span>Loding...</span>
                </>
              ) : (
                " Sign Up"
              )}
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-3">
            <span>If you have a previous account?</span>
            <Link to="/sign-in" className="text-blue-500">
              Login
            </Link>
          </div>
          <div>
            {errrMessage && (
              <Alert className="mt-5" color="failure">
                {errrMessage}
              </Alert>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
