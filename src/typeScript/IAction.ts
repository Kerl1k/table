import IInfo from "./IInfo";

export default interface IAction {
  field: keyof IInfo;
}
