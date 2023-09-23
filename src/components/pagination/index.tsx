interface IPaginationProps {
  total: number;
  data: any[];
  currentPage: number;
  handlePrevious: () => void;
  handleNext: () => void;
}

const Pagination = ({
  total,
  currentPage,
  data,
  handleNext,
  handlePrevious,
}: IPaginationProps) => {
  return (
    <nav aria-label="pagination">
      <ul className="inline-flex gap-2 -space-x-px">
        <li>
          <button
            className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-[4px] hover:bg-gray-100 hover:text-gray-700 disabled:bg-gray-100 disabled:text-gray-500"
            onClick={handlePrevious}
            disabled={currentPage === 1}
          >
            Previous
          </button>
        </li>

        {data.map((_, idx) => (
          <li key={idx + 1}>
            <button
              className={`px-3 py-2 leading-tight rounded-[4px] ${
                Number(idx + 1) === currentPage
                  ? "bg-[#9B1E25] text-white border border-[#9B1E25]"
                  : "text-gray-500 border border-gray-300"
              }`}
            >
              {Number(idx + 1)}
            </button>
          </li>
        ))}

        <li>
          <button
            className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-[4px] hover:bg-gray-100 hover:text-gray-700 disabled:bg-gray-100 disabled:text-gray-500"
            onClick={handleNext}
            disabled={currentPage === total}
          >
            Next
          </button>
        </li>
        <li>
          <button
            className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-[4px] hover:bg-gray-100 hover:text-gray-700 disabled:bg-gray-100 disabled:text-gray-500"
            disabled
          >
            {`${currentPage} / ${total}`}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
