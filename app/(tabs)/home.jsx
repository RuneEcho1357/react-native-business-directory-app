import { ScrollView } from 'react-native'
import Category from '../../components/Home/Category'
import Header from '../../components/Home/Header'
import PopularBusiness from '../../components/Home/PopularBusiness'
import Slider from '../../components/Home/Slider'

export default function home() {
  return (
    <ScrollView>
      {/* Header */}
      <Header />
      {/* Slider */}
      <Slider />
      {/* Category */}
      <Category />
      {/* Popular Business List */}
      <PopularBusiness />
    </ScrollView>
  )
}