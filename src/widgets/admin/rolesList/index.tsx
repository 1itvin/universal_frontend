/* eslint-disable @typescript-eslint/ban-types */
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import {
  ButtonDefault,
  PlusButton,
  TableDefault,
  TbodyDefault,
  TdDefault,
  TheadDefault,
  TrDefault,
} from "../../../shared/globalStyles";
import { LoaderContainer, Text, TextContainer, Wrapper } from "./styled";
import LoaderElement from "../../../shared/ui/loaderElement";
import { useGetRolesQuery } from "../../../features/admin/adminService";
import { setCurrentRole, setRoles } from "../../../features/admin/adminSlice";
import IRole from "../../../shared/interfaces/role";

interface IProps {
  changeFormVisibility: (prop: boolean) => void;
  changeButtonsVisibility: (prop: boolean) => void;
}

export default function RolesList({
  changeFormVisibility,
  changeButtonsVisibility,
}: IProps) {
  const {
    data: getRolesData,
    isSuccess: isGetRolesSuccess,
    isLoading: isGetRolesLoading,
    refetch: refetchRoles,
  } = useGetRolesQuery();

  const dispatch = useAppDispatch();
  const roles = useAppSelector((state) => state.admin.roles);

  let key = 1;

  useEffect(() => {
    if (isGetRolesSuccess) {
      dispatch(setRoles(getRolesData));
    }
  }, [isGetRolesSuccess, getRolesData]);

  function addButtonHandler() {
    dispatch(
      setCurrentRole({
        id: 0,
        value: "",
        description: "",
      })
    );
    changeButtonsVisibility(false);
    changeFormVisibility(true);
  }

  function userOnClick(role: IRole) {
    dispatch(setCurrentRole(role));
  }

  return isGetRolesLoading ? (
    <LoaderContainer>
      <LoaderElement />
    </LoaderContainer>
  ) : roles && roles.length > 0 ? (
    <Wrapper>
      <TableDefault $width="480px" $maxHeight="698px">
        <TheadDefault>
          <TrDefault>
            <TdDefault $maxWidth="100px">ID роли</TdDefault>
            <TdDefault $maxWidth="140px">Роль</TdDefault>
            <TdDefault $maxWidth="240px">Описание</TdDefault>
          </TrDefault>
        </TheadDefault>
        <TbodyDefault>
          {...roles.map((role) => (
            <TrDefault
              key={"role" + key++}
              onClick={() => {
                userOnClick(role);
                changeButtonsVisibility(true);
                changeFormVisibility(true);
              }}
            >
              <TdDefault $maxWidth="100px">{role.id}</TdDefault>
              <TdDefault $maxWidth="140px">{role.value}</TdDefault>
              <TdDefault $maxWidth="240px">{role.description}</TdDefault>
            </TrDefault>
          ))}
        </TbodyDefault>
      </TableDefault>
      <PlusButton onClick={addButtonHandler}>Добавить</PlusButton>
    </Wrapper>
  ) : roles ? (
    <Wrapper>
      <Text>Список ролей пуст</Text>
      <PlusButton onClick={addButtonHandler}>Добавить</PlusButton>
    </Wrapper>
  ) : (
    <TextContainer>
      <Text>Ошибка получения данных</Text>
      <ButtonDefault
        $width="120px"
        onClick={() => {
          refetchRoles();
        }}
      >
        Обновить
      </ButtonDefault>
    </TextContainer>
  );
}
