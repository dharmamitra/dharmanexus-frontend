import { useSourceFile } from "@components/hooks/useSourceFile";
import { useSourceLanguage } from "@components/hooks/useSourceLanguage";
import { PageContainer } from "@components/layout/PageContainer";
import { CircularProgress, Typography } from "@mui/material";

export {
  getSourceTextStaticPaths as getStaticPaths,
  getI18NextStaticProps as getStaticProps,
} from "utils/nextJsHelpers";

// https://buddhanexus.kc-tbts.uni-hamburg.de/api/files/dn3/table?co_occ=2000&sort_method=position&folio=

export default function TablePage() {
  const { sourceLanguageName, sourceLanguage } = useSourceLanguage();
  const { sourceFile, isFallback } = useSourceFile();

  if (isFallback) {
    return (
      <PageContainer backgroundName={sourceLanguage}>
        <CircularProgress color="inherit" />
      </PageContainer>
    );
  }

  return (
    <PageContainer backgroundName={sourceLanguage}>
      <Typography variant="h1">Table view for {sourceLanguageName}.</Typography>
      <Typography variant="h2">File: {sourceFile}</Typography>
    </PageContainer>
  );
}