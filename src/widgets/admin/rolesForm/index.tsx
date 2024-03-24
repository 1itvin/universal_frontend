import { useEffect, useState } from "react";
import { useAppSelector } from "../../../app/store/hooks";
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
  useCreateRoleMutation,
  useDeleteRoleMutation,
  useUpdateRoleMutation,
} from "../../../features/admin/adminService";
import IRole from "../../../shared/interfaces/role";

interface IProps {
  isFormVisible: boolean;
  isButtonsVisible: boolean;
  changeFormVisibility: (prop: boolean) => void;
}

export default function RolesForm({
  isFormVisible,
  isButtonsVisible,
  changeFormVisibility,
}: IProps) {
  const [isPopUpVisible, setPopUpVisibility] = useState<boolean>(false);
  const [createRole, { isLoading: isCreateRoleLoading }] =
    useCreateRoleMutation();
  const [updateRole, { isLoading: isUpdateRoleLoading }] =
    useUpdateRoleMutation();
  const [deleteRole, { isLoading: isDeleteRoleLoading }] =
    useDeleteRoleMutation();

  const defaultValues: IRole = {
    id: 0,
    value: "",
    description: "",
  };
  const currentRole = useAppSelector((state) => state.admin.currentRole);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IRole>({
    defaultValues,
    values: currentRole,
  });

  const [role, setRole] = useState<IRole | null>(null);

  const onSubmit: SubmitHandler<IRole> = async (data) => {
    if (isButtonsVisible) {
      try {
        await updateRole(data);
        changeFormVisibility(false);
        reset();
      } catch (e) {
        console.log("rolesForm > saveError", e);
      }
    } else {
      try {
        await createRole(data);
        changeFormVisibility(false);
        reset();
      } catch (e) {
        console.log("rolesForm > saveError", e);
      }
    }
  };

  function handleDeleteButton() {
    setPopUpVisibility(true);
    reset();
  }

  function handleSelect(prop) {
    setRole({ ...role, ...prop });
  }

  useEffect(() => {
    if (currentRole) {
      setRole({ ...currentRole });
    }
  }, [currentRole]);

  return (
    <>
      {isFormVisible && role ? (
        <Wrapper>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <h2 style={{ userSelect: "none" }}>Изменение данных роли</h2>
            <InputContainer>
              {errors.value?.message ? (
                <ErrorText>{errors.value.message}:</ErrorText>
              ) : (
                <InputTitle>Название роли:</InputTitle>
              )}
              <InputDefault
                {...register("value", {
                  required: {
                    value: true,
                    message: "Введите название роли",
                  },
                  onChange: (e) => handleSelect({ value: e.target.value }),
                })}
                placeholder="Название роли"
                $redBorder={!!errors.value?.message}
                autoComplete="off"
              />
            </InputContainer>
            <InputContainer>
              {errors.description?.message ? (
                <ErrorText>{errors.description.message}:</ErrorText>
              ) : (
                <InputTitle>Описание:</InputTitle>
              )}
              <InputDefault
                {...register("description", {
                  required: {
                    value: true,
                    message: "Введите описание",
                  },
                  onChange: (e) =>
                    handleSelect({ description: e.target.value }),
                })}
                placeholder="Описание"
                $redBorder={!!errors.description?.message}
                autoComplete="off"
              />
            </InputContainer>
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
          </Form>
        </Wrapper>
      ) : (
        <Wrapper />
      )}
      {isPopUpVisible && (
        <PopUp
          text={`Вы действительно хотите удалить роль ${role?.value}?`}
          setVisibility={(prop: boolean) => setPopUpVisibility(prop)}
          changeFormVisibility={changeFormVisibility}
          submitFunction={async () => {
            await deleteRole(role!.id);
          }}
        />
      )}
      {isCreateRoleLoading || isUpdateRoleLoading || isDeleteRoleLoading ? (
        <LoaderContainer>
          <LoaderElement />
        </LoaderContainer>
      ) : (
        <></>
      )}
    </>
  );
}
