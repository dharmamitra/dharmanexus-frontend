import { Link } from "@components/common/Link";
import { PageContainer } from "@components/layout/PageContainer";
import { serifFontFamily } from "@components/theme";
import { Paper } from "@mui/material";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useTheme as useMaterialTheme } from "@mui/material/styles";

export { getI18NextStaticProps as getStaticProps } from "utils/common";

export default function AtiiIndex() {
  const materialTheme = useMaterialTheme();

  return (
    <PageContainer>
      <Box
        component="img"
        src="/assets/images/atii_logo_full.png"
        alt="ATII logo"
        sx={{
          p: 4,
          [materialTheme.breakpoints.down("sm")]: {
            p: 3,
            m: 2,
          },
          backgroundColor: "#361F0D",
          filter: "drop-shadow(2px 2px 1px rgba(0,0,0,0.25))",
          borderRadius: 1,
        }}
      />
      <Paper
        elevation={1}
        sx={{
          p: 4,
          mt: 2,
          mb: 4,
          [materialTheme.breakpoints.down("sm")]: {
            p: 3,
            m: 2,
          },
        }}
      >
        <Typography
          align="center"
          variant="body1"
          sx={{ fontFamily: serifFontFamily }}
        >
          The goal of ATII is the creation of an open source database of all the
          persons (authors, translators, etc.) involved in the creation of Indic
          Buddhist texts and the literary corpora containing them, including
          particularly the Tibetan and Chinese Buddhist Canons. The ATII uses
          person records instead of name records, and thus disambiguates names
          when multiple persons have the same name or one person has multiple
          names. This methodology has never been applied before in the case of
          the Tibetan Canon.
        </Typography>
      </Paper>

      <Link href="/atii/sample-page" variant="h5">
        Sample sub-page
      </Link>
    </PageContainer>
  );
}
