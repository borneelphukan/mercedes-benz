import "../../styles/ui/Pagination.css";
import Button from "./Button";
import Dropdown from "./Dropdown";

type Props = {
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
}: Props) => {
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
      <Dropdown
        items={paginationItems}
        selectedItem={`${itemsPerPage} per page`}
        onChange={onItemsPerPageChange}
      />
    </div>
  );
};

export default Pagination;
