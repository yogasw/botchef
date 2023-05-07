import { useState } from "react";
import { saveAs } from 'file-saver'

export default function FormInput() {
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [errMessage, setErrMessage] = useState("");
  // const URL = "http://localhost:5000/xlsx/download";
  const URL = "/xlsx/download";
  const onSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    fetch(URL,
      {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          description
        })
      })
      .then(response => {
        if (!response.ok){
          console.log(response)
          throw new Error(`HTTP error ${response.status} : ${response.statusText}`)
        }

        return response.blob()
      })
      .then(blob => saveAs(blob, 'Bot.xlsx'))
      .then((data) => {
        // console.log(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof Error) {
          setErrMessage(err.message)
        }
        setLoading(false);
      });
  };
  return (
    <div className={`flex items-start space-x-4 ${loading && "animate-pulse"}`}>
      {loading && (
        <div className="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
          <div
            className="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-8 h-64 w-64"></div>
        </div>
      )}
      <div className="min-w-0 flex-1 p-4">
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <form onSubmit={onSubmit} className="relative">
          <div
            className="border border-gray-300 rounded-lg shadow-sm overflow-hidden focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
            <label htmlFor="comment" className="sr-only">
              Type your bot description
            </label>
            <textarea
              rows={3}
              name="comment"
              id="comment"
              className="block w-full py-3 border-0 resize-none focus:ring-0 sm:text-sm"
              placeholder="Type your bot description..."
              defaultValue={""}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />

            {/* Spacer element to match the height of the toolbar */}
            <div className="py-2" aria-hidden="true">
              {/* Matches height of button in toolbar (1px border + 36px content height) */}
              <div className="py-px">
                <div className="h-9" />
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 inset-x-0 pl-3 pr-2 py-2 flex justify-between">
            <div className="flex items-center space-x-5">

            </div>
            <div className="flex-shrink-0">
              <button
                disabled={loading}
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 loading"
              >
                Generate
              </button>

              {errMessage && (<div className="text-red-500 text-right">
                {!errMessage ? "Generate" : errMessage}
              </div>)}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
