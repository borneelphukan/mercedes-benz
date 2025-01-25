import "../../styles/ui/Pagination.css";
import Button from "./Button";

type PaginationProps = {
  currentPage: number;
  totalRecordCount: number;
  itemsPerPage: number;
  paginationItems: string[];
  onPageChange: (newPage: number) => void;
  onItemsPerPageChange: (selected: string) => void;
};

const Pagination = ({
  currentPage,
  totalRecordCount,
  itemsPerPage,
  paginationItems,
  onPageChange,
  onItemsPerPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalRecordCount / itemsPerPage);

  return (
    <div className="pagination">
      <div></div>
      <div className="pagination-center">
        <Button
          text="Prev"
          arrow="left"
          isDisabled={currentPage === 1}
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        />
        <span>{currentPage}</span>
        <Button
          text="Next"
          arrow="right"
          isDisabled={currentPage === totalPages}
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        />
      </div>
      <select
        value={`${itemsPerPage} per page`}
        onChange={(e) => onItemsPerPageChange(e.target.value)}
      >
        {paginationItems.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Pagination;
