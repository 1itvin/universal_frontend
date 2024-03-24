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
import { useGetUsersQuery } from "../../../features/admin/adminService";
import { setCurrentUser, setUsers } from "../../../features/admin/adminSlice";
import IUser from "../../../shared/interfaces/user";

interface IProps {
  changeFormVisibility: (prop: boolean) => void;
  changeButtonsVisibility: (prop: boolean) => void;
}

export default function UsersList({
  changeFormVisibility,
  changeButtonsVisibility,
}: IProps) {
  const {
    data: getUsersData,
    isSuccess: isGetUsersSuccess,
    isLoading: isGetUsersLoading,
    refetch: refetchUsers,
  } = useGetUsersQuery();

  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.admin.users);

  let key = 1;

  useEffect(() => {
    if (isGetUsersSuccess) {
      dispatch(setUsers(getUsersData));
    }
  }, [isGetUsersSuccess, getUsersData]);

  function addButtonHandler() {
    dispatch(
      setCurrentUser({
        id: 0,
        email: "",
        banned: false,
        banReason: "",
        posts: [],
        roles: [],
        role: "",
        password: "",
      })
    );
    changeButtonsVisibility(false);
    changeFormVisibility(true);
  }

  function userOnClick(user: IUser) {
    dispatch(
      setCurrentUser({
        id: user.id,
        email: user.email,
        banned: user.banned,
        banReason: "",
        posts: [],
        roles: [],
        role: "",
      })
    );
  }

  return isGetUsersLoading ? (
    <LoaderContainer>
      <LoaderElement />
    </LoaderContainer>
  ) : users && users.length > 0 ? (
    <Wrapper>
      <TableDefault $width="840px" $maxHeight="698px">
        <TheadDefault>
          <TrDefault>
            <TdDefault $maxWidth="80px">User ID</TdDefault>
            <TdDefault $maxWidth="200px">Email пользователя</TdDefault>
            <TdDefault $maxWidth="80px">Бан</TdDefault>
            <TdDefault $maxWidth="240px">Причина бана</TdDefault>
            <TdDefault $maxWidth="240px">Роли</TdDefault>
          </TrDefault>
        </TheadDefault>
        <TbodyDefault>
          {...users.map((user) => (
            <TrDefault
              key={"user" + key++}
              onClick={() => {
                userOnClick(user);
                changeButtonsVisibility(true);
                changeFormVisibility(true);
              }}
            >
              <TdDefault $maxWidth="80px">{user.id}</TdDefault>
              <TdDefault $maxWidth="200px">{user.email}</TdDefault>
              <TdDefault $maxWidth="80px">
                {user.banned ? "Да" : "Нет"}
              </TdDefault>
              <TdDefault $maxWidth="240px">
                {user.banReason || "Не забанен"}
              </TdDefault>
              <TdDefault $maxWidth="240px">
                {user?.roles.map((role) => role.description).join(", ")}
              </TdDefault>
            </TrDefault>
          ))}
        </TbodyDefault>
      </TableDefault>
      <PlusButton onClick={addButtonHandler}>Добавить</PlusButton>
    </Wrapper>
  ) : users ? (
    <Wrapper>
      <Text>Список пользователей пуст</Text>
      <PlusButton onClick={addButtonHandler}>Добавить</PlusButton>
    </Wrapper>
  ) : (
    <TextContainer>
      <Text>Ошибка получения данных</Text>
      <ButtonDefault
        $width="120px"
        onClick={() => {
          refetchUsers();
        }}
      >
        Обновить
      </ButtonDefault>
    </TextContainer>
  );
}
