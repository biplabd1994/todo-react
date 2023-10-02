import React, { useEffect, useMemo, useState } from "react";
import WithAuth from "../../../component/WithAuth";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useForm, useFieldArray } from "react-hook-form";
import InputErrorMsg from "../../../component/InputErrorMsg/InputErrorMsg";
import { loginService } from "../../../services/login.service";
import { toast } from "react-toastify";
import {
  todoAddService,
  todoDetailsService,
  todoEditService,
} from "../../../services/todo.service";
import { useParams, Link } from "react-router-dom";

const EditTodo = () => {
  const params = useParams();
  const id = params.id;
  const [todoDetails, setTodoDetails] = useState({});

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    control,
  } = useForm();
  useEffect(() => {
    getTodoDetails();
  }, []);
  const getTodoDetails = async () => {
    const response = await todoDetailsService(id);
    if (response.status === 200) {
      setTodoDetails(response.data.data);
    } else {
      toast.error(response.data.error?.message);
    }
  };

  const setDefaultValueForm = async () => {
    let defaultValues = {};
    defaultValues.title = todoDetails?.title;
    defaultValues.description = todoDetails?.description;
    defaultValues.isCompleted = todoDetails?.isCompleted === false ? 0 : 1;
    reset({ ...defaultValues });
  };
  useMemo(() => {
    setDefaultValueForm();
  }, [todoDetails]);

  const onSubmit = async (data) => {
    const response = await todoEditService(id, {
      ...data,
      isCompleted: data.isCompleted == 0 ? false : true,
    });
    if (response.status === 200) {
      toast.success(`Todo updated !`);
    } else {
      toast.error(response.data.error?.message);
    }
  };
  return (
    <>
      <Container className="mt-5">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md={12}>
              <h2>Edit Todo</h2>
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
                />
                {errors.description && (
                  <InputErrorMsg error={errors.description?.message} />
                )}
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Select
                  {...register("isCompleted", {
                    required: "status is required",
                  })}
                >
                  <option value="">--select--</option>
                  <option value="1">Complete</option>
                  <option value="0">Incomplete</option>
                </Form.Select>
                {errors.isCompleted && (
                  <InputErrorMsg error={errors.isCompleted?.message} />
                )}
              </Form.Group>
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

const WithAuthEditTodo = WithAuth(EditTodo);

export default WithAuthEditTodo;
