import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { Card, InputAdornment, OutlinedInput, Stack, SvgIcon } from '@mui/material';

export default function CustomerSearch  ({setQuery, children})  {
  const handleInputChange = (event) => {
    setTimeout(() => {
      setQuery(event.target.value);
    }, 1000);
  };

  return (
  <Card sx={{ p: 2 }}>
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={2}
    >
      <OutlinedInput
        onChange={(e) => handleInputChange(e)}
        defaultValue=""
        fullWidth
        placeholder="Search customer"
        startAdornment={(
          <InputAdornment position="start">
            <SvgIcon
              color="action"
              fontSize="small"
              >
              <MagnifyingGlassIcon />
            </SvgIcon>
          </InputAdornment>
        )}
        sx={{ maxWidth: 500 }}
        />
    </Stack>
  </Card>
)};
