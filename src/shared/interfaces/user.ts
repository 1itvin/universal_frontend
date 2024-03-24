import IRole from "./role";

export default interface IUser {
  id: number;
  email: string;
  banned: boolean;
  banReason: null | {
    banReason: string;
  };
  roles: IRole[] | string;

  posts: [];
}
