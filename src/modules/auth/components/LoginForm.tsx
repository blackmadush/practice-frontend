import React, { useState, FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { useNavigate } from "react-router-dom";
import Button from "../../../shared-components/atoms/Button";
import Input from "../../../shared-components/atoms/Input";
import FormGroup from "../../../shared-components/molecules/FormGroup";
import LoginFormOrganism from "../../../shared-components/organisms/LoginFormOrganism";
import { login } from "../authSlice";
import { loginUser } from "../../../services/api";
import { authDataService } from "../../../services/data/authDataService";
import CdCard from "../../../shared-components/atoms/Card/CdCard";
import CdCardBody from "../../../shared-components/atoms/Card/CardBody";

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authState = useAppSelector((state: any) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    form?: string;
  }>({});

  const validate = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const resultAction = await dispatch(login({ email, password }));
      const response = await loginUser(email, password);
      const token: string = response.token;

      authDataService.jwtToken = token;

      if (authDataService.jwtToken?.length > 0) {
        navigate("/dashboard");
      } else {
        setErrors({
          ...errors,
          form: "Login failed. Please check your credentials.",
        });
      }
    } catch (err) {
      console.error("Failed to login:", err);
      setErrors({ ...errors, form: "An error occurred during login." });
    }
  };

  return (
    <div className="container mt-5">
      <CdCard className="card mx-auto">
        <CdCardBody>
          <div className="login-form-container">
            <LoginFormOrganism onSubmit={handleSubmit}>
              <FormGroup label="Email" error={errors.email}>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </FormGroup>
              <FormGroup label="Password" error={errors.password}>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </FormGroup>
              {errors.form && (
                <div className="text-danger mb-3">{errors.form}</div>
              )}
              <Button
                color="primary"
                type="submit"
                disabled={authState.loading}
                style={{ width: 100 }}
                block
                outline
                size="lg"
                className="mt-5"
              >
                {authState.loading ? "Logging in..." : "Login"}
              </Button>
            </LoginFormOrganism>
          </div>
        </CdCardBody>
      </CdCard>
    </div>
  );
};

export default LoginForm;
