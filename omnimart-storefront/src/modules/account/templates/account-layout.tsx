import React from "react"

import UnderlineLink from "@modules/common/components/interactive-link"

import AccountNav from "../components/account-nav"
import { Customer } from "@medusajs/medusa"

interface AccountLayoutProps {
  customer: Omit<Customer, "password_hash"> | null
  children: React.ReactNode
}

const AccountLayout: React.FC<AccountLayoutProps> = ({
  customer,
  children,
}) => {
  return (
    <div className="flex-1 small:py-12">
      <div className="flex-1 content-container h-full max-w-5xl mx-auto bg-white flex flex-col">
        <div className="grid grid-cols-1  small:grid-cols-[240px_1fr] py-12">
          <div>{customer && <AccountNav customer={customer} />}</div>
          <div className="flex-1">{children}</div>
        </div>
        <div className="flex flex-col small:flex-row items-end justify-between small:border-t border-gray-200 py-12 gap-8">
          <div>
            <h2 className="text-xl-semi mb-4">Forgot password or have any issue?</h2>
            <span className="txt-medium">
              For any issue, please feel free to contact us at:  < a href="mailto neerukattusurya11@gmail.com  ">neerukattusurya11@gmail.com</a>
            </span>
          </div>
          {/* <div>
            <UnderlineLink href="/customer-service">
              Customer Service
            </UnderlineLink>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default AccountLayout
