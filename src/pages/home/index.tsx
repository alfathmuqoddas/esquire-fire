import { addressOptions } from "../../config/options";

export default function Home() {
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="p-4 border rounded-2xl w-full md:w-1/4 mx-8">
          <h1 className="font-bold text-2xl">Search</h1>
          <div className="fgrid grid-flow-col grid-cols-1 md:grid-cols-4">
            <select name="provinsi" id="provinsi" className="col-span-1">
              <option></option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
}
