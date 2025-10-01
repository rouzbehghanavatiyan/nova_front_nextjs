import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";

const GlobalDropdown = ({
  triggerText = "Open Menu",
  triggerVariant = "bordered",
  menuVariant = "flat",
  ariaLabel = "Dropdown menu",
  items = [],
  onAction,
  className = "",
  ...dropdownProps
}) => {
  return (
    <Dropdown className={className} {...dropdownProps}>
      <DropdownTrigger>
        <Button variant={triggerVariant}>{triggerText}</Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label={ariaLabel}
        variant={menuVariant}
        onAction={onAction}
      >
        {items.map((item) => (
          <DropdownItem
            key={item.key}
            shortcut={item.shortcut}
            className={item.className}
            color={item.color}
            description={item.description}
          >
            {item.children || item.text}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default GlobalDropdown;
