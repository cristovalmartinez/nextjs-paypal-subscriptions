// "use client"

// import { configureAutoTrack } from "aws-amplify/analytics"
// import React, { useEffect } from "react"

// type Props = {
//   pageName: string
// }

// export const PageSessionTracking: React.FC<Props> = ({ pageName }) => {
//   useEffect(() => {
//     configureAutoTrack({
//       enable: true,
//       type: "session",
//       options: {
//         attributes: {
//           page: pageName,
//         },
//       },
//     })
//   }, [])

//   return null
// }
