import { format, formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  SvgIcon
} from '@mui/material';
import { useRouter } from 'next/navigation';

export const OverviewLatestProducts = (props) => {
  const { products = [], sx } = props;
  const router = useRouter()

  function handleFormateDate (payload)  {
    let formattingDate = format(new Date(payload), "yyyy M dd H m s").split(" ")
    formattingDate[1] = formattingDate[1] - 1
    const result = formatDistanceToNow(new Date(...formattingDate), {includeSeconds: true});

    return result
  }

  return (
    <Card sx={sx}>
      <CardHeader title="Latest Products" />
      <List>
        {products.map((product, index) => {
          const hasDivider = index < products.length - 1;
          const ago = handleFormateDate(product.updatedAt)

          return (
            <ListItem
              divider={hasDivider}
              key={product._id}
            >
              <ListItemAvatar>
                <Box
                  component="img"
                  src={product.image}
                  sx={{
                    borderRadius: 1,
                    height: 48,
                    width: 48
                  }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={product.name}
                primaryTypographyProps={{ variant: 'subtitle1' }}
                secondary={`Updated ${ago} ago`}
                secondaryTypographyProps={{ variant: 'body2' }}
              />
            </ListItem>
          );
        })}
      </List>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={(
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          )}
          size="small"
          variant="text"
          onClick={() => router.push('/products')}
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
};

OverviewLatestProducts.propTypes = {
  products: PropTypes.array,
  sx: PropTypes.object
};
