import "../../styles/ui/Pagination.css";
import Button from "./Button";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  paginationItems: string[];
  onPageChange: (newPage: number) => void;
  onItemsPerPageChange: (selected: string) => void;
};

const Pagination = ({
  currentPage,
  totalPages,
  itemsPerPage,
  paginationItems,
  onPageChange,
  onItemsPerPageChange,
}: PaginationProps) => {
  return (
    <div className="pagination">
      {/* 1st Item */}
      <div></div>
      {/* 2nd Item */}
      <div className="pagination-center">
        <Button
          text="Prev"
          arrow="left"
          isDisabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        />
        <span>{currentPage}</span>
        <Button
          text="Next"
          arrow="right"
          isDisabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        />
      </div>
      {/* 3rd Item */}
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
