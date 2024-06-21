// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'


// ** Demo Components Imports
import OrdersTable from 'src/@core/components/data-table/order'

const Dashboard = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>
            Gerenciar pedidos
        </Typography>
        <Typography variant='body2'>Veja aqui os pedidos que foram feitos</Typography>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Pedidos' titleTypographyProps={{ variant: 'h6' }} />
          <OrdersTable />
        </Card>
      </Grid>
    </Grid>
  )
}

export default Dashboard
