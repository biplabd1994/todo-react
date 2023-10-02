import React from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useForm, useFieldArray } from "react-hook-form";
import InputErrorMsg from "../../../component/InputErrorMsg/InputErrorMsg";
import { loginService } from "../../../services/login.service";
import { toast } from "react-toastify";
import { setAuthTokens } from "../../../libraries/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    control,
  } = useForm();
  const onSubmit = async (data) => {
    const response = await loginService(data);
    console.log("response", response);
    if (response.data.status === 200) {
      const { accessToken } = response.data.data;
      setAuthTokens(accessToken);
      navigate("/dashboard");
    } else {
      toast.error(response.data.error?.message);
    }
    // console.log("data", data);
  };
  return (
    <>
      <Container className="mt-5">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md={12}>
              <h2>Login</h2>
              <Form.Group controlId="username">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your email"
                  // value={username}
                  // onChange={(e) => setUsername(e.target.value)}
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <InputErrorMsg error={errors.email?.message} />
                )}
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  // value={password}
                  // onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              {errors.password && (
                <InputErrorMsg error={errors.password?.message} />
              )}
            </Col>
            <Col md={12}>
              <Button variant="primary" type="submit" className="mt-2">
                Login
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
};

export default Login;
