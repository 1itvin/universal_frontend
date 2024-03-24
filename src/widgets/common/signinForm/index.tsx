import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ErrorText, Form, InputContainer, InputField, Title } from "./styled";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../app/store/hooks";
import LoaderElement from "../../../shared/ui/loaderElement";
import {
  useGetUserMutation,
  useSigninMutation,
} from "../../../features/auth/authService";
import { setTokens, setUser } from "../../../features/auth/authSlice";
import { ButtonDefault } from "../../../shared/globalStyles";

interface IFormInput {
  email: string;
  password: string;
}

export default function SigninForm() {
  const [
    signin,
    {
      data: signinData,
      isSuccess: isSigninSuccess,
      isError: isSigninError,
      isLoading: isSigninLoading,
    },
  ] = useSigninMutation();

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
      await signin({ email, password });
    } catch (e) {
      console.log("signinForm > signinError", e);
    }
    reset();
  };

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSigninSuccess) {
      dispatch(setTokens(signinData));
      try {
        (async () => {
          await getUser();
        })();
      } catch (e) {
        console.log("signinForm > getUserError", e);
      }
    }
  }, [isSigninSuccess]);

  useEffect(() => {
    if (isGetUserSuccess) {
      dispatch(setUser(getUserData!));
      getUserData?.roles.find((role) => role.value === "ADMIN")
        ? // ? navigate("/users")
          navigate("/profile")
        : navigate("/profile");
    }
  }, [isGetUserSuccess]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Title>Вход в аккаунт</Title>
      <InputContainer>
        <InputField
          {...register("email", {
            required: { value: true, message: "Введите email" },
            // minLength: { value: 4, message: "Минимум 4 буквы" },
            // maxLength: { value: 40, message: "Максимум 40 букв" },
          })}
          placeholder="Email"
          type="text"
          $borderRed={isSigninError}
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
          $borderRed={isSigninError}
          autoComplete="off"
        />
        {errors.password?.message}
      </InputContainer>
      <ButtonDefault
        type="button"
        onClick={() => {
          navigate("/signup");
        }}
        $reverse
        $width="270px"
        $marginBottom="30px"
      >
        Нет аккаунта? Регистрация
      </ButtonDefault>
      {isSigninLoading ? (
        <LoaderElement />
      ) : (
        <ButtonDefault onClick={handleSubmit(onSubmit)} $reverse $width="100px">
          Войти
        </ButtonDefault>
      )}
      {isSigninError && <ErrorText>Неправильный email или пароль</ErrorText>}
      {isGetUserError && <ErrorText>Не удалось войти в аккаунт</ErrorText>}
    </Form>
  );
}
