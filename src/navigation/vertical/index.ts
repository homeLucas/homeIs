// ** Icon imports
import ListIcon from 'mdi-material-ui/FormatListCheckbox'
import BoxIcon from 'mdi-material-ui/Package'
import FileIcon from 'mdi-material-ui/File'



// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      sectionTitle: 'Gerenciamento de pedidos'
    },
    {
      title: 'Pedidos',
      icon: ListIcon,
      path: '/pedidos'
    },
    {
      sectionTitle: 'Gerenciamento de entregas'
    },
    {
      title: 'Entregas',
      icon: BoxIcon,
      path: '/entregas'
    },
    {
      sectionTitle: 'Gerenciamento de boletos'
    },
    {
      title: 'Boletos',
      icon: FileIcon,
      path: '/boletos'
    },
  ]
}

export default navigation
