import React, { useMemo } from "react";
import { t } from "ttag";

import EmptyState from "metabase/components/EmptyState";

import { MIN_SEARCH_LENGTH } from "./constants";

import type { DataPickerProps, DataPickerDataType } from "./types";
import type { DataTypeInfoItem } from "./utils";

import CardPicker from "./CardPicker";
import DataTypePicker from "./DataTypePicker";
import DataSearch from "./DataSearch";
import RawDataPicker from "./RawDataPicker";

import { Root, EmptyStateContainer } from "./DataPickerView.styled";

interface DataPickerViewProps extends DataPickerProps {
  dataTypes: DataTypeInfoItem[];
  searchQuery: string;
  hasDataAccess: boolean;
  onDataTypeChange: (type: DataPickerDataType) => void;
  onBack?: () => void;
}

function DataPickerViewContent({
  dataTypes,
  searchQuery,
  hasDataAccess,
  onDataTypeChange,
  ...props
}: DataPickerViewProps) {
  const { value, onChange } = props;

  const availableDataTypes = useMemo(
    () => dataTypes.map(type => type.id),
    [dataTypes],
  );

  if (!hasDataAccess) {
    return (
      <EmptyStateContainer>
        <EmptyState
          message={t`To pick some data, you'll need to add some first`}
          icon="database"
        />
      </EmptyStateContainer>
    );
  }

  if (searchQuery.trim().length > MIN_SEARCH_LENGTH) {
    return (
      <DataSearch
        value={value}
        searchQuery={searchQuery}
        availableDataTypes={availableDataTypes}
        onChange={onChange}
      />
    );
  }

  if (!value.type) {
    return <DataTypePicker types={dataTypes} onChange={onDataTypeChange} />;
  }

  if (value.type === "raw-data") {
    return <RawDataPicker {...props} />;
  }

  if (value.type === "models") {
    return <CardPicker {...props} targetModel="model" />;
  }

  if (value.type === "questions") {
    return <CardPicker {...props} targetModel="question" />;
  }

  return null;
}

function DataPickerView(props: DataPickerViewProps) {
  return (
    <Root>
      <DataPickerViewContent {...props} />
    </Root>
  );
}

export default DataPickerView;
