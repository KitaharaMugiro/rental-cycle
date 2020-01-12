import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default () => {
  const router = useRouter();
  const [text, setText] = useState("aaa");
  const onChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const value = event.target.value;
    setText(value);
  };

  const onClickLogin = () => {
    router.push(`/system?id=${text}`);
  };

  return (
    <>
      ID:<input onChange={onChangeText} value={text}></input>
      <br></br>
      <button onClick={onClickLogin}>ログイン</button>
    </>
  );
};
