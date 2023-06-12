import React, { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { useTextLists } from "@components/hooks/useTextLists";
import { Autocomplete, Box, CircularProgress, TextField } from "@mui/material";
import { DEFAULT_QUERY_PARAMS } from "features/sidebarSuite/common/dbSidebarSettings";
import { ArrayParam, useQueryParam } from "use-query-params";
import type { TextMenuItem } from "utils/api/textLists";

import { ListboxComponent, StyledPopper } from "./textMenuComponents";

const ExcludeTextFilter = () => {
  const { t } = useTranslation("settings");

  const { texts, isLoadingTexts } = useTextLists();

  const [excludeTextParam, setExcludeTextParam] = useQueryParam(
    // TODO: replace with "exclude_text",
    "limit_collection",
    ArrayParam
  );

  const [excludeTextValue, setExcludeTextValue] = useState<TextMenuItem[]>([]);

  useEffect(
    () =>
      setExcludeTextParam(
        excludeTextParam ?? DEFAULT_QUERY_PARAMS.exclude_text
      ),
    [excludeTextParam, setExcludeTextParam]
  );

  const handleInputChange = (value: TextMenuItem[]) => {
    setExcludeTextValue(value);
    setExcludeTextParam(() => {
      return value.map((item) => `!${item.id}`);
    });
  };

  return (
    <Box sx={{ my: 1, width: 1 }}>
      <Autocomplete
        id="excluded-texts"
        sx={{ mt: 1, mb: 2 }}
        multiple={true}
        value={excludeTextValue ?? []}
        PopperComponent={StyledPopper}
        ListboxComponent={ListboxComponent}
        options={[...texts.values()]}
        getOptionLabel={(option) => option.name.toUpperCase()}
        renderInput={(params) => (
          <TextField
            {...params}
            label={t(`filtersLabels.excludeTexts`)}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {isLoadingTexts ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
        renderOption={(props, option) => [props, option] as React.ReactNode}
        renderGroup={(params) => params as unknown as React.ReactNode}
        loading={isLoadingTexts}
        filterSelectedOptions
        disablePortal
        onChange={(event, value) => handleInputChange(value)}
      />
    </Box>
  );
};

export default ExcludeTextFilter;