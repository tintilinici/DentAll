import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../components/navbar/auth/AuthProvider";
import routes from "../constants/routes";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(state => !state);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    login({ email, password });
    navigate(routes.TRANSPORT.COMPANIES);
  };

  return (
    <div className="bg-gray-100 h-full p-8">
      <Link className="text-cyan-500 text-2xl font-bold italic" to="/">
        DentAll
      </Link>
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md mt-48">
        <div className="p-8 space-y-8">
          <p className="text-center font-bold">Prijavi se u svoj račun</p>
          <div>
            <p className="mb-2">Email</p>
            <Input
              value={email}
              type="email"
              onChange={e => setEmail(e.target.value)}
              placeholder="john.doe@domain.example"
            />
          </div>
          <div>
            <p className="mb-2">Password</p>
            <InputGroup>
              <Input
                value={password}
                type={showPassword ? "text" : "password"}
                onChange={e => setPassword(e.target.value)}
                placeholder="yourpassword"
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </div>
          <Button width={"full"} colorScheme="orange" onClick={handleLogin}>
            Prijavi se
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
