import { useQueryState } from "nuqs";

export default function Search() {
  const [name, setName] = useQueryState("name");

  const handleSubmit = (formData: any) => {
    const name = formData.get("name");
    setName(name);
  };

  return (
    <>
      <form action={handleSubmit}>
        <input value={name || ""} onChange={(e) => setName(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
      <button onClick={() => setName(null)}>Clear</button>
      <p>Hello, {name || "anonymous visitor"}!</p>
    </>
  );
}
