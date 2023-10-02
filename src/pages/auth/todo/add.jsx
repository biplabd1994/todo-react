import React from "react";
import WithAuth from "../../../component/WithAuth";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useForm, useFieldArray } from "react-hook-form";
import InputErrorMsg from "../../../component/InputErrorMsg/InputErrorMsg";
import { loginService } from "../../../services/login.service";
import { toast } from "react-toastify";
import { todoAddService } from "../../../services/todo.service";
const AddTodo = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    control,
  } = useForm();
  const onSubmit = async (data) => {
    const response = await todoAddService(data);
    // console.log("response", response);
    if (response.status === 200) {
      reset();
      toast.success(`Todo added !`);
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
              <h2>Add Todo</h2>
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter title"
                  {...register("title", { required: "Title is required" })}
                />
                {errors.title && (
                  <InputErrorMsg error={errors.title?.message} />
                )}
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter description"
                  {...register("description", {
                    required: "Description is required",
                  })}
                  // value={password}
                  // onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              {errors.description && (
                <InputErrorMsg error={errors.description?.message} />
              )}
            </Col>
            <Col md={12}>
              <Button variant="primary" type="submit" className="mt-2">
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
};

const WithAuthAddTodo = WithAuth(AddTodo);

export default WithAuthAddTodo;
