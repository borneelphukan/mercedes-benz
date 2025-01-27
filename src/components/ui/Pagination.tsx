import "../../styles/ui/Pagination.css";
import Button from "./Button";
import Dropdown from "./Dropdown";

type Props = {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  paginationItems: string[];
  onPageChange: (newPage: number) => void;
  onLimitChange: (selected: string) => void;
};

const Pagination = ({
  currentPage,
  totalPages,
  itemsPerPage,
  paginationItems,
  onPageChange,
  onLimitChange,
}: Props) => {
  // Previous Button
  const Previous = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  // Next Button
  const Next = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="pagination">
      {/* Previous and Next Buttons */}
      <div className="pagination-center">
        <Button
          text="Prev"
          arrow="left"
          isDisabled={currentPage === 1}
          onClick={Previous}
        />
        <span>{currentPage}</span>
        <Button
          text="Next"
          arrow="right"
          isDisabled={currentPage === totalPages}
          onClick={Next}
        />
      </div>

      {/* Items per Page Dropdown */}
      <Dropdown
        items={paginationItems}
        selectedItem={`${itemsPerPage} per page`}
        onChange={onLimitChange}
      />
    </div>
  );
};

export default Pagination;
