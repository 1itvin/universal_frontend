import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ErrorText, Form, InputContainer, InputField, Title } from "./styled";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../app/store/hooks";
import LoaderElement from "../../../shared/ui/loaderElement";
import {
  useGetUserMutation,
  useSignupMutation,
} from "../../../features/auth/authService";
import { setTokens, setUser } from "../../../features/auth/authSlice";
import { ButtonDefault } from "../../../shared/globalStyles";

interface IFormInput {
  email: string;
  password: string;
}

export default function SigninForm() {
  const [
    signup,
    {
      data: signupData,
      isSuccess: isSignupSuccess,
      isError: isSignupError,
      isLoading: isSignupLoading,
      error: signupError,
    },
  ] = useSignupMutation();

  const [
    getUser,
    { data: getUserData, isError: isGetUserError, isSuccess: isGetUserSuccess },
  ] = useGetUserMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async ({ email, password }) => {
    try {
      await signup({ email, password });
    } catch (e) {
      console.log("signupForm > signinError", e);
    }
    reset();
  };

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignupSuccess) {
      dispatch(setTokens(signupData));
      try {
        (async () => {
          await getUser();
        })();
      } catch (e) {
        console.log("signupForm > getUserError", e);
      }
    }
  }, [isSignupSuccess]);

  useEffect(() => {
    if (isGetUserSuccess) {
      dispatch(setUser(getUserData!));
      getUserData?.roles.find((role) => role.value === "ADMIN")
        ? navigate("/users")
        : navigate("/profile");
    }
  }, [isGetUserSuccess]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Title>Регистрация</Title>
      <InputContainer>
        <InputField
          {...register("email", {
            required: { value: true, message: "Введите email" },
            // minLength: { value: 4, message: "Минимум 4 буквы" },
            // maxLength: { value: 40, message: "Максимум 40 букв" },
          })}
          placeholder="Email"
          type="text"
          $borderRed={isSignupError}
          autoComplete="off"
        />
        {errors.email?.message}
      </InputContainer>
      <InputContainer>
        <InputField
          {...register("password", {
            required: { value: true, message: "Введите пароль" },
            minLength: { value: 4, message: "Минимум 4 символов" },
            maxLength: { value: 16, message: "Максимум 16 букв" },
          })}
          placeholder="Пароль"
          type="text"
          $borderRed={isSignupError}
          autoComplete="off"
        />
        {errors.password?.message}
      </InputContainer>
      <ButtonDefault
        type="button"
        onClick={() => {
          navigate("/signin");
        }}
        $reverse
        $width="210px"
        $marginBottom="30px"
      >
        Есть аккаунт? Войти
      </ButtonDefault>
      {isSignupLoading ? (
        <LoaderElement />
      ) : (
        <ButtonDefault onClick={handleSubmit(onSubmit)} $reverse $width="200px">
          Зарегистрироваться
        </ButtonDefault>
      )}
      {isSignupError && (
        <ErrorText>
          {signupError?.message || "Не удалось зарегистрироваться"}
        </ErrorText>
      )}
      {isGetUserError && <ErrorText>Не удалось войти в аккаунт</ErrorText>}
    </Form>
  );
}
