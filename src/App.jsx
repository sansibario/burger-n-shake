import { StoreProvider, useStore } from './store'
import TabBar from './components/TabBar'
import Toast from './components/Toast'
import ItemModal from './components/ItemModal'
import CartDrawer from './components/CartDrawer'
import HomeScreen from './screens/HomeScreen'
import MenuScreen from './screens/MenuScreen'
import RewardsScreen from './screens/RewardsScreen'
import LocationsScreen from './screens/LocationsScreen'
import AccountScreen from './screens/AccountScreen'

export default function App() {
  return (
    <StoreProvider>
      <Shell />
    </StoreProvider>
  )
}

function Shell() {
  const { tab, selected, cartOpen } = useStore()

  return (
    <div className="device">
      <div className="screen-wrap">
        {tab === 'home' && <HomeScreen />}
        {tab === 'menu' && <MenuScreen />}
        {tab === 'rewards' && <RewardsScreen />}
        {tab === 'locations' && <LocationsScreen />}
        {tab === 'account' && <AccountScreen />}
      </div>

      <TabBar />

      {selected && <ItemModal />}
      {cartOpen && <CartDrawer />}
      <Toast />
    </div>
  )
}
