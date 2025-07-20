'use client'

import React, { useEffect, useState } from 'react'
import { Dialog } from '@headlessui/react' // Or any modal library you prefer
import { Loader2 } from 'lucide-react'
import { client } from '@/sanity/lib/client';

interface VendorListing {
  vendorName: string
  location: string
  productUrl: string
  price: number
}

export const VendorFallback = ({ productId }: { productId: string }) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [vendors, setVendors] = useState<VendorListing[]>([])

  useEffect(() => {
    const fetchVendors = async () => {
      setLoading(true)
      try {
        const query = `*[_type == "vendorListing" && references($productId) && available == true]{
          vendorName,
          location,
          productUrl,
          price
        }`
        const results = await client.fetch(query, { productId })
        setVendors(results)
      } catch (error) {
        console.error('Error fetching vendors:', error)
      } finally {
        setLoading(false)
      }
    }

    if (open) {
      fetchVendors()
    }
  }, [open, productId])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        See Other Shops Selling This Item
      </button>

      <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white max-w-md w-full rounded p-6 shadow-xl">
            <Dialog.Title className="text-lg font-semibold mb-4">Available Vendors</Dialog.Title>

            {loading ? (
              <div className="flex justify-center items-center">
                <Loader2 className="animate-spin w-5 h-5" />
                <span className="ml-2">Loading vendors...</span>
              </div>
            ) : vendors.length > 0 ? (
              <ul className="space-y-4">
                {vendors.map((vendor, idx) => (
                  <li key={idx} className="border rounded p-3">
                    <p className="font-semibold">{vendor.vendorName}</p>
                    <p className="text-sm text-gray-500">{vendor.location}</p>
                    <p className="mt-1 font-bold text-blue-600">${vendor.price}</p>
                    <a
                      href={vendor.productUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-500 underline"
                    >
                      Visit Shop
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No other vendors currently available.</p>
            )}

            <button
              onClick={() => setOpen(false)}
              className="mt-4 text-sm text-red-700 hover:underline"
            >
              Close
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  )
}