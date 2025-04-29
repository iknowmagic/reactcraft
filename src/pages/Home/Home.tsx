import React from 'react'
import type { HomeProps } from './Home.types'

export const Home: React.FC<HomeProps> = (_props) => {
  return <div data-testid="home">Home component</div>
}

export default Home
