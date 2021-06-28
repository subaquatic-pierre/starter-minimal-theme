import { useState } from 'react';
// material
import {
  useTheme,
  experimentalStyled as styled
} from '@material-ui/core/styles';
import {
  Card,
  Grid,
  Paper,
  Radio,
  Container,
  Typography,
  CardHeader,
  RadioGroup,
  CardContent,
  FormControlLabel,
  GridSpacing,
  GridSize
} from '@material-ui/core';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Page from '../../components/Page';
import HeaderDashboard from '../../components/HeaderDashboard';

// ----------------------------------------------------------------------

const BlockStyle = styled('div')(({ theme }) => {
  const isLight = theme.palette.mode === 'light';

  return {
    padding: theme.spacing(5),
    borderRadius: theme.shape.borderRadiusSm,
    border: `solid 1px ${theme.palette.divider}`,
    backgroundColor: theme.palette.grey[isLight ? 100 : 800]
  };
});

// ----------------------------------------------------------------------

const LABELS = ['1col', '2col', '3col', '4col', '6col', '12col'];

export default function FoundationGrid() {
  const theme = useTheme();
  const [spacing, setSpacing] = useState<GridSpacing>(2);
  const [column, setColumn] = useState<GridSize>(3);

  const handleChangeSpacing = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpacing(Number((event.target as HTMLInputElement).value) as GridSpacing);
  };

  const handleChangeColumn = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColumn(Number((event.target as HTMLInputElement).value) as GridSize);
  };

  return (
    <Page title="Foundations: Grid | Minimal-UI">
      <Container maxWidth="lg">
        <HeaderDashboard
          heading="Grid"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Foundations', href: PATH_DASHBOARD.foundations.root },
            { name: 'Grid' }
          ]}
        />

        <Card sx={{ mb: 5 }}>
          <CardHeader title="Spacing" />
          <CardContent>
            <BlockStyle>
              <Typography variant="body2" sx={{ mb: 3, textAlign: 'center' }}>
                Spacing: <strong>{theme.spacing(Number(spacing))}</strong>
              </Typography>

              <Grid container spacing={spacing}>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((value) => (
                  <Grid key={value} item xs={1}>
                    <Paper
                      sx={{
                        height: 80,
                        boxShadow: (theme) => theme.customShadows.z8
                      }}
                    />
                  </Grid>
                ))}
              </Grid>

              <RadioGroup
                row
                name="spacing"
                value={spacing.toString()}
                onChange={handleChangeSpacing}
                sx={{
                  mt: 3,
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                  <FormControlLabel
                    key={value}
                    value={value.toString()}
                    label={value.toString()}
                    control={<Radio />}
                  />
                ))}
              </RadioGroup>
            </BlockStyle>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Column" />
          <CardContent>
            <BlockStyle>
              <Grid container spacing={3}>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((value) => (
                  <Grid key={value} item xs={column}>
                    <Paper
                      sx={{
                        py: 3,
                        textAlign: 'center',
                        boxShadow: (theme) => theme.customShadows.z8
                      }}
                    >
                      xs = {column}
                    </Paper>
                  </Grid>
                ))}
              </Grid>

              <RadioGroup
                row
                name="column"
                value={column.toString()}
                onChange={handleChangeColumn}
                sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}
              >
                {[12, 6, 4, 3, 2, 1].map((value, index) => (
                  <FormControlLabel
                    key={value}
                    value={value.toString()}
                    label={LABELS[index]}
                    control={<Radio />}
                  />
                ))}
              </RadioGroup>
            </BlockStyle>
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}
