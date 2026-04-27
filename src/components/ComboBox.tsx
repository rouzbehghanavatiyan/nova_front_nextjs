"use client";
import React from "react";
import {
  TextField,
  Autocomplete,
  Chip,
  createFilterOptions,
} from "@mui/material";

type ComboBoxProps<T> = {
  label: string;
  value: T | T[] | null;
  options: T[];
  onChange: (value: T | T[] | null) => void;

  optionLabel?: string;
  optionValue?: string;

  fullWidth?: boolean;
  disabled?: boolean;
  multiple?: boolean;
  error?: boolean;
  helperText?: string;
  placeholder?: string;
};

export function ComboBox<T extends { [key: string]: any }>({
  label,
  value,
  options = [],
  onChange,
  optionLabel = "label",
  optionValue = "value",
  fullWidth = true,
  disabled = false,
  multiple = false,
  error = false,
  helperText,
  placeholder,
}: ComboBoxProps<T>) {
  const opts = Array.isArray(options) ? options : [];
  const safeValue = multiple
    ? Array.isArray(value)
      ? value
      : []
    : (value ?? null);

  const filterOptions = createFilterOptions({
    matchFrom: "any",
    stringify: (option: T) => option[optionLabel] || "",
    trim: true,
  });

  return (
    <Autocomplete
      filterOptions={filterOptions}
      key={JSON.stringify(opts)}
      multiple={multiple}
      fullWidth={fullWidth}
      disabled={disabled}
      options={opts}
      value={safeValue}
      disableCloseOnSelect={multiple}
      clearOnEscape
      onChange={(_, newValue) => {
        onChange(newValue as T | T[] | null);
      }}
      getOptionLabel={(option: T) => option?.[optionLabel]?.toString() ?? ""}
      isOptionEqualToValue={(opt: T, val: T) =>
        opt?.[optionValue] === val?.[optionValue]
      }
      renderTags={(value, getTagProps) =>
        multiple
          ? (value as T[]).map((option, index) => {
              const { key, ...chipProps } = getTagProps({ index }); // 🔸 key را جدا کن
              return (
                <Chip
                  key={key}
                  {...chipProps}
                  label={option[optionLabel]}
                  sx={{
                    fontFamily: "inherit",
                    borderRadius: 0,
                    width: "72%",
                    justifyItems: "start",
                    justifyContent: "start",
                    placeItems: "center",
                  }}
                />
              );
            })
          : null
      }
      sx={{
        width: "25%",
        fontFamily: "inherit", // فونت پروژه
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant="filled"
          placeholder={placeholder}
          error={error}
          helperText={helperText}
          InputLabelProps={{
            shrink: true, // لیبل همیشه بالا
            sx: {
              fontFamily: "inherit",
            },
          }}
          inputProps={{
            ...params.inputProps,
            style: { fontFamily: "inherit" },
          }}
        />
      )}
    />
  );
}
