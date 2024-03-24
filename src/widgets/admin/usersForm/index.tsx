import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { ButtonDefault, InputDefault } from "../../../shared/globalStyles";
import {
  ButtonContainer,
  ErrorText,
  Form,
  InputContainer,
  InputTitle,
  LoaderContainer,
  Wrapper,
} from "./styled";
import { SubmitHandler, useForm } from "react-hook-form";
import PopUp from "../../../shared/ui/pop-up";
import LoaderElement from "../../../shared/ui/loaderElement";
import {
  useBanUserMutation,
  useCreateUserMutation,
  useDeleteUserMutation,
  useGetRolesQuery,
  useGiveRoleMutation,
  useTakeRoleMutation,
  useUnBanUserMutation,
  useUpdateUserMutation,
} from "../../../features/admin/adminService";
import { setCurrentUser, setRoles } from "../../../features/admin/adminSlice";
import CustomSelect from "../../../shared/ui/customSelect";

interface IProps {
  isFormVisible: boolean;
  isButtonsVisible: boolean;
  changeFormVisibility: (prop: boolean) => void;
}

interface IFormProps {
  id: number;
  email: string;
  password: string;
  banReason: string;
  role: string;
}

export default function UsersForm({
  isFormVisible,
  isButtonsVisible,
  changeFormVisibility,
}: IProps) {
  const [isPopUpVisible, setPopUpVisibility] = useState<boolean>(false);
  const [createUser, { isLoading: isCreateUserLoading }] =
    useCreateUserMutation();
  const [updateUser, { isLoading: isUpdateUserLoading }] =
    useUpdateUserMutation();
  const [deleteUser, { isLoading: isDeleteUserLoading }] =
    useDeleteUserMutation();
  const [banUser, { isLoading: isBanUserLoading }] = useBanUserMutation();
  const [unBanUser, { isLoading: isUnBanUserLoading }] = useUnBanUserMutation();
  const [giveRole, { isLoading: isGiveRoleLoading }] = useGiveRoleMutation();
  const [takeRole, { isLoading: isTakeRoleLoading }] = useTakeRoleMutation();
  const {
    data: getRolesData,
    isSuccess: isGetRolesSuccess,
    isLoading: isGetRolesLoading,
  } = useGetRolesQuery();
  const roles = useAppSelector((state) => state.admin.roles);

  useEffect(() => {
    if (isGetRolesSuccess) {
      dispatch(setRoles(getRolesData));
    }
  }, [isGetRolesSuccess, getRolesData]);

  const defaultValues: IFormProps = {
    id: 0,
    email: "",
    password: "",
    banReason: "",
    role: "",
  };
  const currentUser = useAppSelector((state) => state.admin.currentUser);

  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormProps>({
    defaultValues,
    values: currentUser,
  });

  const [user, setUser] = useState<IFormProps | null>(null);
  const [banReason, setBanReason] = useState<string>("");

  const onSubmit: SubmitHandler<IFormProps> = async (data) => {
    if (isButtonsVisible) {
      try {
        await updateUser({ id: data.id, email: data.email });
        changeFormVisibility(false);
        reset();
      } catch (e) {
        console.log("usersForm > saveError", e);
      }
    } else {
      try {
        await createUser({ email: data.email, password: data.password });
        changeFormVisibility(false);
        reset();
      } catch (e) {
        console.log("usersForm > saveError", e);
      }
    }
  };

  function handleDeleteButton() {
    setPopUpVisibility(true);
  }

  async function handleBanButton() {
    try {
      await banUser({ id: +user!.id, banReason: banReason });
      changeFormVisibility(false);
      reset();
    } catch (e) {
      console.log("usersForm > banError", e);
    }
  }

  async function handleUnBanButton() {
    try {
      await unBanUser(+user!.id);
      changeFormVisibility(false);
      reset();
    } catch (e) {
      console.log("usersForm > unBanError", e);
    }
  }

  async function handleGiveRoleButton() {
    try {
      await giveRole({ id: +user!.id, value: user?.role });
      changeFormVisibility(false);
      reset();
    } catch (e) {
      console.log("usersForm > giveRoleError", e);
    } finally {
      reset();
    }
  }

  async function handleTakeRoleButton() {
    try {
      await takeRole({ id: +user!.id, value: user?.role });
      changeFormVisibility(false);
    } catch (e) {
      console.log("usersForm > takeRoleError", e);
    } finally {
      reset();
    }
  }

  function handleSelect(prop) {
    dispatch(setCurrentUser({ ...user, ...prop }));
    console.log(prop);
  }

  useEffect(() => {
    if (currentUser) {
      console.log(currentUser);

      setUser({ ...currentUser });
    }
  }, [currentUser]);

  return (
    <>
      {isFormVisible && user ? (
        <Wrapper>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <h2 style={{ userSelect: "none" }}>
              Изменение данных пользователя
            </h2>
            <InputContainer>
              {errors.email?.message ? (
                <ErrorText>{errors.email.message}:</ErrorText>
              ) : (
                <InputTitle>Email пользователя:</InputTitle>
              )}
              <InputDefault
                {...register("email", {
                  required: {
                    value: true,
                    message: "Введите email пользователя",
                  },
                  onChange: (e) => handleSelect({ email: e.target.value }),
                })}
                placeholder="Email пользователя"
                $redBorder={!!errors.email?.message}
                autoComplete="off"
              />
            </InputContainer>
            {currentUser?.id === 0 && (
              <InputContainer>
                {errors.password?.message ? (
                  <ErrorText>{errors.password.message}:</ErrorText>
                ) : (
                  <InputTitle>Пароль:</InputTitle>
                )}
                <InputDefault
                  {...register("password", {
                    required: { value: true, message: "Введите пароль" },
                    onChange: (e) => handleSelect({ password: e.target.value }),
                  })}
                  placeholder="Пароль"
                  $redBorder={!!errors.password?.message}
                  autoComplete="off"
                />
              </InputContainer>
            )}
            <ButtonContainer>
              <ButtonDefault key="clientsFormButton1">Сохранить</ButtonDefault>
              {isButtonsVisible && (
                <ButtonDefault
                  key="clientsFormButton2"
                  $red
                  type="button"
                  onClick={handleDeleteButton}
                >
                  Удалить
                </ButtonDefault>
              )}
            </ButtonContainer>
            {currentUser?.id !== 0 && (
              <InputContainer>
                {errors.role?.message ? (
                  <ErrorText>{errors.role.message}:</ErrorText>
                ) : (
                  <InputTitle>Роли:</InputTitle>
                )}
                <CustomSelect
                  items={roles.map((role) => role.value)}
                  name="role"
                  registerProps={{
                    ...register("role", {
                      required: {
                        value: true,
                        message: "Выберите роль",
                      },
                      minLength: 1,
                    }),
                  }}
                  placeholder="Роль"
                  isError={!!errors.role?.message}
                  handleSelect={handleSelect}
                />
              </InputContainer>
            )}
            <ButtonContainer>
              {isButtonsVisible && (
                <ButtonDefault
                  key="clientsFormButton5"
                  type="button"
                  onClick={handleGiveRoleButton}
                >
                  Назначить роль
                </ButtonDefault>
              )}
              {isButtonsVisible && (
                <ButtonDefault
                  key="clientsFormButton6"
                  type="button"
                  onClick={handleTakeRoleButton}
                  $red
                >
                  Забрать роль
                </ButtonDefault>
              )}
            </ButtonContainer>
            {!(currentUser?.id === 0) && !currentUser?.banned && (
              <InputContainer>
                {errors.banReason?.message ? (
                  <ErrorText>{errors.banReason.message}:</ErrorText>
                ) : (
                  <InputTitle>Причина бана:</InputTitle>
                )}
                <InputDefault
                  {...register("banReason", {
                    onChange: (e) => setBanReason(e.target.value),
                  })}
                  placeholder="Причина бана"
                  $redBorder={!!errors.banReason?.message}
                  autoComplete="off"
                />
              </InputContainer>
            )}
            <ButtonContainer>
              {isButtonsVisible && !currentUser?.banned && (
                <ButtonDefault
                  key="clientsFormButton3"
                  $red
                  type="button"
                  onClick={handleBanButton}
                >
                  Забанить
                </ButtonDefault>
              )}
              {isButtonsVisible && currentUser?.banned && (
                <ButtonDefault
                  key="clientsFormButton4"
                  type="button"
                  onClick={handleUnBanButton}
                  $green
                >
                  Разбанить
                </ButtonDefault>
              )}
            </ButtonContainer>
          </Form>
        </Wrapper>
      ) : (
        <Wrapper />
      )}
      {isPopUpVisible && (
        <PopUp
          text={`Вы действительно хотите удалить пользователя ${user?.email}?`}
          setVisibility={(prop: boolean) => setPopUpVisibility(prop)}
          changeFormVisibility={changeFormVisibility}
          submitFunction={async () => {
            await deleteUser(user?.id);
          }}
        />
      )}
      {isCreateUserLoading ||
      isUpdateUserLoading ||
      isDeleteUserLoading ||
      isBanUserLoading ||
      isUnBanUserLoading ||
      isGetRolesLoading ||
      isGiveRoleLoading ||
      isTakeRoleLoading ? (
        <LoaderContainer>
          <LoaderElement />
        </LoaderContainer>
      ) : (
        <></>
      )}
    </>
  );
}
