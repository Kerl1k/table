import { useEffect, useMemo, useReducer, useState } from "react";
import "./App.css";
import {
  TD,
  TH,
  THead,
  TR,
  Table,
  Input,
  HR,
  Button,
  SearchBlock,
} from "./components";
import IInfo from "./typeScript/IInfo";
import IState from "./typeScript/IState";
import IAction from "./typeScript/IAction";

const url =
  "http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D";

function App() {
  const [defaultInfo, setDefaultInfo] = useState<IInfo[]>();
  const [search, setSearch] = useState("");
  const [listInfo, setListInfo] = useState<IInfo[]>([]);
  const [lastSearch, setLastSearch] = useState<string>("");
  const [state, dispatch] = useReducer<
    (state: IState, action: IAction) => IState
  >(
    (state: IState, action: IAction) => {
      if (state.field === action.field) {
        if (state.sort === "top") {
          return { sort: "down", field: state.field };
        }
        return { sort: "default", field: "" };
      }
      return { sort: "top", field: action.field };
    },
    {
      sort: "default",
      field: "",
    }
  );

  useEffect(() => {
    fetch(url)
      .then((p) => p.json())
      .then((p) => {
        setDefaultInfo(p);
      });
  }, []);

  const searchInfo = useMemo(() => {
    if (defaultInfo === undefined) {
      return undefined;
    }

    return [...defaultInfo].filter((p) => {
      const values = Object.values(p);
      return values.some((p) =>
        String(p).toLowerCase().includes(lastSearch.toLowerCase())
      );
    });
  }, [defaultInfo, lastSearch]);
  const sortedInfo = useMemo(() => {
    if (searchInfo == undefined) {
      return undefined;
    }
    if (state.field === "") {
      return searchInfo;
    }
    switch (state.sort) {
      case "default":
        return searchInfo;
      case "top":
        return [...searchInfo].sort((a: IInfo, b: IInfo) =>
          a[state.field as keyof IInfo] > b[state.field as keyof IInfo] ? 1 : -1
        );
      case "down":
        return [...searchInfo].sort((a: IInfo, b: IInfo) =>
          a[state.field as keyof IInfo] > b[state.field as keyof IInfo] ? -1 : 1
        );
    }
  }, [state, searchInfo]);
  const keys: (keyof IInfo)[] = [
    "id",
    "firstName",
    "lastName",
    "phone",
    "email",
    "description",
  ];
  return (
    <div>
      <SearchBlock>
        <Input
          className="input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button className="button" onClick={() => setLastSearch(search)}>
          Search
        </Button>
      </SearchBlock>
      <Table>
        <THead>
          <TR>
            {keys.map((k) => (
              <TH key={k} onClick={() => dispatch({ field: k })}>
                {k} {state.field === k && (state.sort === "top" ? "↑" : "↓")}
              </TH>
            ))}
          </TR>
        </THead>
        {sortedInfo?.map((i) => (
          <TR key={i.id} onClick={() => setListInfo([i])}>
            <TD>{i.id}</TD>
            <TD>{i.firstName}</TD>
            <TD>{i.lastName}</TD>
            <TD>{i.phone}</TD>
            <TD>{i.email}</TD>
            <TD>{i.description}</TD>
          </TR>
        ))}
      </Table>
      <HR />
      <h1 style={{ textAlign: "center" }}>List</h1>
      {listInfo.map((p) => (
        <TR>
          <TD>{p.id}</TD>
          <TD>{p.firstName}</TD>
          <TD>{p.lastName}</TD>
          <TD>{p.phone}</TD>
          <TD>{p.email}</TD>
          <TD>{p.description}</TD>
        </TR>
      ))}
    </div>
  );
}

export default App;
