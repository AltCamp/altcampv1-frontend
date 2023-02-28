import layoutStyles from './layout.module.css'
import {Outlet} from 'react-router-dom'
import Topbar from '../components/topbar/Topbar'
import Sidebar from '../components/sidebar/Sidebar'


export default function Layout() {
  return (
    <div className={layoutStyles.container}>
    <Sidebar />
        <Topbar />
        <Outlet />
    </div>
  )
}
