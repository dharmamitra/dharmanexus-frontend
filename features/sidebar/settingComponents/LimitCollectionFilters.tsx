/**
 * https://mui.com/material-ui/react-autocomplete/
 * https://codesandbox.io/s/2326jk?file=/demo.tsx
 */

import React from "react";
import { type ListChildComponentProps, VariableSizeList } from "react-window";
import { useTranslation } from "next-i18next";
import { useDbQueryParams } from "@components/hooks/useDbQueryParams";
import { useTextLists } from "@components/hooks/useTextLists";
import {
  Autocomplete,
  autocompleteClasses,
  Box,
  CircularProgress,
  FormLabel,
  ListSubheader,
  Popper,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/styles";
import { atom, useAtom } from "jotai";
import type { CategoryMenuItem, TextMenuItem } from "utils/api/textLists";
import type { QueryValues } from "utils/dbSidebar";
import {
  type CoercedCollectionValues,
  limitCollectionFilterValueAtom,
} from "utils/dbSidebar";

const OuterElementContext = React.createContext({});

// eslint-disable-next-line react/display-name
const OuterElementType = React.forwardRef<HTMLDivElement>((props, ref) => {
  const outerProps = React.useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

function useResetCache(data: any) {
  const ref = React.useRef<VariableSizeList>(null);
  React.useEffect(() => {
    // eslint-disable-next-line eqeqeq,no-eq-null
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true);
    }
  }, [data]);
  return ref;
}

// px
const LISTBOX_PADDING = 8;

const Row = (props: ListChildComponentProps) => {
  const { data, index, style } = props;
  const dataSet = data[index];
  const inlineStyle = {
    ...style,
    top: (style.top as number) + LISTBOX_PADDING,
    fontWeight: 700,
  };

  // eslint-disable-next-line no-prototype-builtins
  if (dataSet.hasOwnProperty("group")) {
    return (
      <ListSubheader key={dataSet.key} component="div" style={inlineStyle}>
        {dataSet.group}
      </ListSubheader>
    );
  }

  const [dataSetProps, { name, textName }] = dataSet;

  return (
    <Box
      {...dataSetProps}
      style={inlineStyle}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flex: 1,
        "&:nth-of-type(even)": { bgcolor: "background.accent" },
        "&:hover": { textDecoration: "underline" },
      }}
      component="li"
    >
      <Typography
        component="option"
        sx={{
          flex: 1,
          whiteSpace: "normal",
          wordBreak: "break-all",
        }}
      >
        {name}
      </Typography>
      <Typography
        component="small"
        variant="subtitle2"
        {...dataSetProps}
        sx={{ textTransform: "uppercase", fontSize: 12, whiteSpace: "normal" }}
      >
        {textName}
      </Typography>
    </Box>
  );
};

// Adapter for react-window
const ListboxComponent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLElement>
>(function ListboxComponent(props, ref) {
  const { children, ...other } = props;
  const itemData: React.ReactChild[] = [];
  // eslint-disable-next-line unicorn/no-array-for-each
  (children as React.ReactChild[]).forEach(
    (item: React.ReactChild & { children?: React.ReactChild[] }) => {
      itemData.push(item, ...(item.children ?? []));
    }
  );

  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"), {
    noSsr: true,
  });
  const itemCount = itemData.length;
  const itemSize = smUp ? 36 : 48;

  const getChildSize = (child: React.ReactChild) => {
    // eslint-disable-next-line no-prototype-builtins
    if (child.hasOwnProperty("group")) {
      return 48;
    }

    const charsInLine = smUp ? 80 : 40;
    // @ts-expect-error type issue
    const lineCount = Math.ceil(child[1].name.length / charsInLine);
    return itemSize * lineCount;
  };

  const getHeight = () => {
    if (itemCount > 8) {
      return 10 * itemSize;
    }
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
  };

  const gridRef = useResetCache(itemCount);

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          ref={gridRef}
          itemData={itemData}
          height={getHeight() + 2 * LISTBOX_PADDING}
          width="100%"
          outerElementType={OuterElementType}
          innerElementType="ul"
          itemSize={(index: number) => getChildSize(itemData[index])}
          overscanCount={5}
          itemCount={itemCount}
        >
          {Row}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  );
});

const StyledPopper = styled(Popper)({
  [`& .${autocompleteClasses.listbox}`]: {
    boxSizing: "border-box",
    "& ul": {
      padding: 0,
      margin: 0,
    },
  },
});

export const DEFAULT_DISABLE_LIMIT_SELECT_STATE = {
  excludedCategories: false,
  excludedTexts: false,
  includedCategories: false,
  includedTexts: false,
};

export const disableLimitColectionSelectAtom = atom(
  DEFAULT_DISABLE_LIMIT_SELECT_STATE
);

const LimitCollectionFilters = () => {
  // TODO: option filter on select to remove inaplicable texts

  const { t } = useTranslation("settings");
  const { setQueryParams } = useDbQueryParams();
  const { texts, categories, isLoadingCats, isLoadingTexts } = useTextLists();

  const [limitCollectionValues, setLimitCollectionValues] = useAtom(
    limitCollectionFilterValueAtom
  );

  const [disableSelectors, setDisableSelectors] = useAtom(
    disableLimitColectionSelectAtom
  );

  function setIsSelectorDisabled(
    key: keyof QueryValues["limit_collection"],
    value: boolean
  ) {
    setDisableSelectors((prevState) => {
      const updates = {
        excludedCategories: {},
        excludedTexts: {},
        includedCategories: {
          excludedCategories: !value,
          excludedTexts: !value,
        },
        includedTexts: {
          excludedCategories: !value,
          excludedTexts: !value,
          includedCategories: !value,
        },
      };
      return { ...prevState, ...updates[key] };
    });
  }

  const handleInputChange = (
    newValues: (CategoryMenuItem | TextMenuItem)[],
    filterType: keyof QueryValues["limit_collection"]
  ) => {
    const updatedSelectorValues = new Map();

    for (const value of newValues) {
      if (filterType.includes("included")) {
        limitCollectionValues.excludedCategories.clear();
        limitCollectionValues.excludedTexts.clear();
      }

      if (filterType === "includedTexts") {
        limitCollectionValues.includedCategories.clear();
      }

      updatedSelectorValues.set(value.id, value);
    }

    const updatedFilterValues = {
      ...limitCollectionValues,
      [filterType]: updatedSelectorValues,
    };

    setLimitCollectionValues(updatedFilterValues);

    const updatedParams = Object.keys(updatedFilterValues).flatMap((key) => {
      return [...updatedFilterValues[key as keyof CoercedCollectionValues]].map(
        ([, value]) => (key.includes("excluded") ? `!${value.id}` : value.id)
      );
    });

    setQueryParams({
      limit_collection: updatedParams.length > 0 ? updatedParams : undefined,
    });

    setIsSelectorDisabled(filterType, newValues.length === 0);
  };

  return (
    <Box sx={{ my: 1, width: 1 }}>
      <FormLabel id="include-exclude-filters-label">
        {t(`filtersLabels.minMatch`)}
      </FormLabel>
      <Autocomplete
        id="excluded-collections"
        sx={{ mt: 1, mb: 2 }}
        multiple={true}
        value={[...limitCollectionValues.excludedCategories.values()]}
        PopperComponent={StyledPopper}
        ListboxComponent={ListboxComponent}
        options={[...categories.values()]}
        getOptionLabel={(option) => option.name.toUpperCase()}
        renderInput={(params) => (
          <TextField
            {...params}
            label={t(`filtersLabels.excludeCollections`)}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {isLoadingCats ? (
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
        loading={isLoadingCats}
        disabled={disableSelectors.excludedCategories}
        filterSelectedOptions
        disableListWrap
        disablePortal
        onChange={(event, value) =>
          handleInputChange(value, "excludedCategories")
        }
      />
      <Autocomplete
        id="excluded-texts"
        sx={{ mb: 2 }}
        multiple={true}
        value={[...limitCollectionValues.excludedTexts.values()]}
        PopperComponent={StyledPopper}
        ListboxComponent={ListboxComponent}
        options={[...texts.values()]}
        getOptionLabel={(option) => option.name.toUpperCase()}
        groupBy={(option) => option.category.toUpperCase()}
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
        disabled={disableSelectors.excludedTexts}
        filterSelectedOptions
        // disableListWrap
        disablePortal
        onChange={(event, value) => handleInputChange(value, "excludedTexts")}
      />

      <Autocomplete
        id="included-collections"
        sx={{ mb: 2 }}
        multiple={true}
        value={[...limitCollectionValues.includedCategories.values()]}
        PopperComponent={StyledPopper}
        ListboxComponent={ListboxComponent}
        options={[...categories.values()]}
        getOptionLabel={(option) => option.name.toUpperCase()}
        renderInput={(params) => (
          <TextField
            {...params}
            label={t(`filtersLabels.includeCollections`)}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {isLoadingCats ? (
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
        loading={isLoadingCats}
        // disableListWrap
        isOptionEqualToValue={(option, value) => categories.has(value.id)}
        disabled={disableSelectors.includedCategories}
        filterSelectedOptions
        disablePortal
        onChange={(event, value) =>
          handleInputChange(value, "includedCategories")
        }
      />
      <Autocomplete
        id="included-texts"
        multiple={true}
        value={[...limitCollectionValues.includedTexts.values()]}
        PopperComponent={StyledPopper}
        ListboxComponent={ListboxComponent}
        options={[...texts.values()]}
        getOptionLabel={(option) => option.name.toUpperCase()}
        groupBy={(option) => option.category.toUpperCase()}
        renderInput={(params) => (
          <TextField
            {...params}
            label={t(`filtersLabels.includeTexts`)}
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
        disabled={disableSelectors.includedTexts}
        filterSelectedOptions
        disableListWrap
        disablePortal
        onChange={(event, value) => handleInputChange(value, "includedTexts")}
      />
    </Box>
  );
};

export default LimitCollectionFilters;