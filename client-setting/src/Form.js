export default function FormInput() {
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("refresh prevented");
  };
  return (
    <div className="flex items-start space-x-4">
      <div className="min-w-0 flex-1 p-4">
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
           Description
        </label>
        <form onSubmit={onSubmit} className="relative">
          <div className="border border-gray-300 rounded-lg shadow-sm overflow-hidden focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
            <label htmlFor="comment" className="sr-only">
              type your bot description
            </label>
            <textarea
              rows={3}
              name="comment"
              id="comment"
              className="block w-full py-3 border-0 resize-none focus:ring-0 sm:text-sm"
              placeholder="Add your comment..."
              defaultValue={''}
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
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 loading"
              >
                Generate
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
