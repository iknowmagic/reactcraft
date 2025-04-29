import React from 'react'
import type { HomeProps } from './Home.types'
import Navbar from '@/components/Navbar'

export const Home: React.FC<HomeProps> = (_props) => {
  return (
    <div data-testid="home">
      <Navbar />

      <section className="bg-base-200 min-h-screen hero">
        <div className="text-center hero-content">
          <div className="max-w-md">
            <h1 className="font-bold text-5xl">Welcome to ReactCraft</h1>
            <p className="py-6">
              Switch themes using the toggle in the top right and see DaisyUI
              adapt instantly.
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </section>

      <section className="bg-base-100 px-4 py-10">
        <h2 className="mb-8 font-semibold text-3xl text-center">
          Theme-Aware Cards
        </h2>
        <div className="gap-6 grid grid-cols-1 md:grid-cols-3 mx-auto max-w-6xl">
          {['Project One', 'Project Two', 'Project Three'].map((title) => (
            <div key={title} className="bg-base-200 shadow card">
              <div className="card-body">
                <h3 className="card-title">{title}</h3>
                <p>This card demonstrates how colors adapt across themes.</p>
                <div className="justify-end card-actions">
                  <button className="btn btn-secondary">Explore</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-base-300 px-4 py-10">
        <h2 className="mb-4 font-medium text-2xl text-center">
          Live Theme Feedback
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          <span className="badge badge-primary">Primary</span>
          <span className="badge badge-secondary">Secondary</span>
          <span className="badge badge-accent">Accent</span>
          <span className="badge badge-info">Info</span>
          <span className="badge badge-success">Success</span>
          <span className="badge badge-warning">Warning</span>
          <span className="badge badge-error">Error</span>
        </div>
      </section>
    </div>
  )
}

export default Home
