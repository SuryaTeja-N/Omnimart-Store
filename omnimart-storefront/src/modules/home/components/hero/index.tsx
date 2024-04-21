// import { Github } from "@medusajs/icons"
// import { Button, Heading } from "@medusajs/ui"

// const Hero = () => {
//   return (
//     <div className="h-[75vh] w-full border-b border-ui-border-base relative bg-ui-bg-subtle">
//       <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 gap-6">
//         <span>
//           <Heading
//             level="h1"
//             className="text-3xl leading-10 text-ui-fg-base font-normal"
//           >
//             Omnimart
//           </Heading>
//           <Heading
//             level="h3"
//             className="text-3xl leading-10 text-ui-fg-subtle font-normal"
//             style={{ fontSize: 'small' }}
//           >
//             Made by Harshitha Komati, Sathwik , Harshini, Surya Teja
//           </Heading>
//         </span>
//         <a
//           href="https://github.com/SuryaTeja-N/Omnimart-Store"
//           target="_blank"
//         >
//           <Button variant="secondary">
//             View on GitHub
//             <Github />
//           </Button>
//         </a>
//       </div>
//     </div>
//   )
// }

// export default Hero



import React from 'react';

const Hero = () => {
  return (
    <div className="flex items-center justify-between h-[75vh] w-full border-b border-ui-border-base relative bg-ui-bg-subtle">
      <div className="z-10 p-32 text-left">
        <h1 className="text-8xl font-bold text-ui-fg-base">
          Shop Everywhere, Anytime Easily
        </h1>
        <p className="mt-4 text-xl text-ui-fg-subtle">
          Discover an endless aisle of everything you need with Omnimart. From electronics to fashion, get everything delivered to your doorstep.
        </p>
      </div>
      <div className="h-full w-1/2">
        <img src="./ecart.jpg" alt="Shopping" className="h-full w-full object-cover" />
      </div>
    </div>
  )
}

export default Hero;
