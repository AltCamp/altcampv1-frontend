export default function Pagination({ meta, page, setPage, setSearchParams }) {
  return (
    <div className="mb-8 mt-4 flex w-full flex-wrap items-center justify-end gap-2 font-poppins md:mt-2 ">
      <button
        className="w-fit cursor-pointer rounded-[4px] border-2 border-[#e9ebec] bg-white px-4 py-2 font-semibold  text-[#878a99] outline-none transition-all duration-200 ease-in-out hover:border-secondary-400 hover:bg-secondary-400 hover:text-white disabled:cursor-not-allowed disabled:border-[#e9ebec] disabled:bg-[#e9ebec] disabled:text-[#878a99] md:px-2 md:py-1  md:text-[12px]"
        onClick={() => setSearchParams({ page: meta?.currentPage - 1 })}
        disabled={meta?.currentPage === 1}
      >
        Previous
      </button>
      {
        // create an array of page numbers
        [...Array(meta?.totalPages)].map((_, index) => (
          <button
            key={index}
            className={`w-fit cursor-pointer rounded-[4px] border-2 px-4 py-2 font-semibold outline-none  md:px-2 md:py-1 md:text-[12px]
                    ${
                      meta?.currentPage === index + 1
                        ? 'border-secondary-400 bg-secondary-400 text-white '
                        : 'border-[#e9ebec] bg-white text-[#878a99] transition-all duration-200 ease-in-out hover:border-secondary-400 hover:bg-secondary-400 hover:text-white '
                    }
                  `}
            onClick={() => setSearchParams({ page: index + 1 })}
          >
            {index + 1}
          </button>
        ))
      }
      <button
        className="w-fit cursor-pointer rounded-[4px] border-2 border-[#e9ebec] bg-white px-4 py-2 font-semibold text-[#878a99] outline-none transition-all duration-200 ease-in-out hover:border-secondary-400 hover:bg-secondary-400 hover:text-white disabled:cursor-not-allowed disabled:border-[#e9ebec] disabled:bg-[#e9ebec] disabled:text-[#878a99] md:px-2 md:py-1 md:text-[12px] "
        onClick={() => setSearchParams({ page: meta?.currentPage + 1 })}
        disabled={meta?.currentPage === meta?.totalPages}
      >
        Next
      </button>
      <div
        id="pageCount"
        className="flex h-fit w-20 items-center justify-center rounded-[4px] border-2 border-[#e9ebec] text-[14px] text-[#bfbfbf] md:px-2 md:py-1 md:text-[12px]  "
      >
        <input
          type="number"
          className="w-1/2 border-none text-[#bfbfbf] outline-none focus:ring-0 md:h-3  md:px-2 md:py-1 md:text-[12px]"
          value={page}
          onChange={(e) => setPage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setSearchParams({ page });
            }
          }}
          onKeyUp={(e) => {
            if (Number(e.target.value) > meta?.totalPages) {
              setPage(meta?.totalPages);
            }
          }}
        />
        <div className="w-1/2">
          <span className="">/</span>
          <span className="w-fit">{meta?.totalPages}</span>
        </div>
      </div>
    </div>
  );
}
