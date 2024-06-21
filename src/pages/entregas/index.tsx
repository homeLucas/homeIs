// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'


// ** Demo Components Imports
import DeliveryTable from 'src/@core/components/data-table/delivery'

const Orders = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>
            Gerenciar Entregas
        </Typography>
        <Typography variant='body2'>Veja as entregas feitas</Typography>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Entregas' titleTypographyProps={{ variant: 'h6' }} />
          <DeliveryTable />
        </Card>
      </Grid>
    </Grid>
  )
}

export default Orders
