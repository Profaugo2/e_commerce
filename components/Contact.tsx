import React from 'react'
import Container from './Container'
import Logo from './Logo'
import { Button } from './ui/button'

const Contact = () => {
  return (
    <Container>
      <div className="min-h-[100px] bg-gray-50 flex flex-col items-center px-6 py-12">
      {/* Logo */}
        <div>
            <Logo />
        </div>
      {/* Contact card */}
      <div className="bg-white shadow-lg rounded-lg max-w-xl w-full p-8">
        <h1 className="text-3xl font-semibold mb-4 text-gray-900">Contact Us</h1>
        <p className="text-gray-600 mb-8">
          We&apos;d love to hear from you. Please fill out the form below and we&apos;ll get
          back to you as soon as possible.
        </p>

        <form className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-shop_dark_orange"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Your email"
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-shop_dark_orange"
              required
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Message
            </label>
            <textarea
              id="message"
              placeholder="Your message"
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-shop_dark_orange resize-none"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-shop_dark_orange text-white font-semibold py-3 rounded-md hover:bg-shop_light_orange transition-colors duration-300"
          >
            Send Message
          </Button>
        </form>
      </div>
    </div>
    </Container>
  )
}

export default Contact
