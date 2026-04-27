"use client";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

interface Props {
  label: string;
  items: { key: string; label: string }[];
  selected: string;
  onChange: (key: string) => void;
}

const FilterDropdown: React.FC<Props> = ({
  label,
  items,
  selected,
  onChange,
}) => {
  const selectedItem = items.find((i) => i.key === selected);

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant="flat"
          className={clsx(
            "px-4 py-1 m-2 text-sm flex items-center gap-2 transition-all",
            selected
              ? "bg-gray-100 text-blue-main"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          )}
        >
          <span className="font-light text-gray-400">{label}:</span>
          {selectedItem && (
            <>
              <span className="font-semibold text-blue-700">
                {selectedItem.label}
              </span>
            </>
          )}
          <ChevronDownIcon className="w-4 h-4" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label={label}
        selectionMode="single"
        selectedKeys={[selected]}
        onSelectionChange={(keys: any) => {
          const value = Array.from(keys)[0] as string;
          onChange(value);
        }}
        className="shadow-lg rounded-xl"
      >
        {items.map((item) => (
          <DropdownItem
            key={item.key}
            className="text-sm hover:bg-blue-50"
          >
            {item.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default FilterDropdown;