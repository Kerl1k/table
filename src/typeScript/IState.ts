import IInfo from "./IInfo";

export default interface IState {
  sort: "default" | "top" | "down";
  field: keyof IInfo | "";
}
