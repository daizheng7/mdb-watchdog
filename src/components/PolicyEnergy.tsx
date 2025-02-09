// OPTION TIMELINE LONG
// "use client";

// import { Box, Typography, useTheme } from "@mui/material";
// import { motion } from "framer-motion";
// import {
//   Timeline,
//   TimelineItem,
//   TimelineSeparator,
//   TimelineConnector,
//   TimelineContent,
//   TimelineDot,
// } from "@mui/lab";

// // Timeline Data (Extracted from Your Image)
// const events = [
//   {
//     year: "1979",
//     text: "International Financial Institutions and Aid agencies recognize the importance of developing renewable energy infrastructure in developing countries.",
//   },
//   {
//     year: "1980",
//     text: "Ronald Reagan elected as the U.S. President. He removes subsidies and research funds for development in renewable energy.",
//   },
//   {
//     year: "1981",
//     text: "Pakistan enters into an Extended Fund Facility with the International Monetary Fund. Privatization and deregulation is one of the conditions in the facility.",
//   },
//   {
//     year: "1985",
//     text: "The World Bank provides Pakistan with the first Energy Sector Loan. It claims that the Government does not have the funds to create the generation capacity needed to catch up with increasing demand. The Bank fails to highlight that debt servicing and interest payments were creating an increased burden on the finances of the Government. Despite WAPDA’s annual losses decreasing consistently, the Bank states that efficiency can only be brought out through unbundling and deregulation.",
//   },
//   {
//     year: "1988",
//     text: "The World Bank creates the Private Sector Energy Development Programme for Pakistan. This loan would provide funds to Independent Power Producers to establish power plants. There is no provision in the loan for ensuring that Pakistan does not end up becoming even more dependent on fuel oil imports.",
//   },
//   {
//     year: "1991",
//     text: "HUBCO is established. The Bank states that this will help bring in Foreign Direct Investment (FDI) to Pakistan. FDI works best when it is in a foreign exchange earning sector or a sector at the apex of the technological frontier. The IPPs represented neither. Energy consumption is projected to grow at 8.8% according to the World Bank.",
//   },
//   {
//     year: "1994",
//     text: "The PSEDP II loan is established to fund other IPP projects since HUBCO took the bulk of the PSEDP I financing. The Bank does not express any concerns about the increasing debt burden on the country nor does it raise concern over HUBCO’s fuel choice.",
//   },
//   {
//     year: "1997",
//     text: "NEPRA is finally established as Pakistan enters into another IMF programme due to its weak economy. Despite the World Bank stating that the establishment of an independent regulator should be the first step in the deregulation process, they raised no concerns over the late development of NEPRA nor did they raise any concerns over the significant amount of Government control over it.",
//   },
//   {
//     year: "2000",
//     text: "Pakistan’s power demand does not grow the way it was projected and the country is left with a surplus of capacity with forced payments to plants not producing any energy. WAPDA takes HUBCO to court over high energy tariffs and alleged corruption.",
//   },
//   {
//     year: "2001",
//     text: "The World Bank finally admits to several failures in the PSEDP programme. They admit that instead of facilitating competitive bidding, they were responsible for acting as a liaison between energy companies and the Government of Pakistan. The Bank still failed to acknowledge its role in increasing the debt burden for Pakistan by saddling it with more debt to finance the IPPs and increased imported fuel payments.",
//   },
// ];

// // Animation Variants
// const timelineVariants = {
//   initial: { opacity: 0, y: 50 },
//   animate: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
// };

// export default function PolicyEnergy() {
//   const theme = useTheme();

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         padding: "80px 20px",
//         backgroundColor: theme.palette.background.default,
//         width: "100%",
//         textAlign: "center",
//       }}
//     >
//       {/* Title */}
//       <Typography
//         variant="h2"
//         color="primary"
//         fontWeight="bold"
//         sx={{ marginBottom: 4, textTransform: "uppercase", letterSpacing: 1 }}
//       >
//         Energy Policy Timeline
//       </Typography>

//       {/* Timeline */}
//       <motion.div variants={timelineVariants} initial="initial" animate="animate">
//         <Timeline position="alternate">
//           {events.map((event, index) => (
//             <TimelineItem key={index}>
//               <TimelineSeparator>
//                 <TimelineDot
//                   sx={{
//                     backgroundColor: theme.palette.primary.main,
//                     width: 18,
//                     height: 18,
//                   }}
//                 />
//                 {index !== events.length - 1 && (
//                   <TimelineConnector sx={{ backgroundColor: theme.palette.secondary.main, height: "40px" }} />
//                 )}
//               </TimelineSeparator>

//               <TimelineContent sx={{ padding: "12px 16px" }}>
//                 <Typography variant="h5" color={theme.palette.primary.main} fontWeight="bold">
//                   {event.year}
//                 </Typography>
//                 <Typography variant="body1" color={theme.palette.text.primary} sx={{ marginTop: 1 }}>
//                   {event.text}
//                 </Typography>
//               </TimelineContent>
//             </TimelineItem>
//           ))}
//         </Timeline>
//       </motion.div>
//     </Box>
//   );
// }

// OPTION TIMELINE HORIZONTAL AUTOMATIC
"use client";

import { Box, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { useRef, useEffect } from "react";

// Timeline Data (Exact Text from Your Image)
const events = [
  { year: "1979", text: "International Financial Institutions and Aid agencies recognize the importance of developing renewable energy infrastructure in developing countries." },
  { year: "1980", text: "Ronald Reagan elected as the U.S. President. He removes subsidies and research funds for development in renewable energy." },
  { year: "1981", text: "Pakistan enters into an Extended Fund Facility with the IMF. Privatization and deregulation is one of the conditions in the facility." },
  { year: "1985", text: "The World Bank provides Pakistan with the first Energy Sector Loan, claiming deregulation is the key to efficiency despite growing debt burdens." },
  { year: "1988", text: "The World Bank creates the Private Sector Energy Development Programme for Pakistan, focusing on Independent Power Producers (IPPs)." },
  { year: "1991", text: "HUBCO is established. The Bank claims this will attract Foreign Direct Investment (FDI), but IPPs struggle to generate long-term value." },
  { year: "1994", text: "The PSEDP II loan is established to fund additional IPP projects despite rising debt concerns." },
  { year: "1997", text: "NEPRA is established, but remains under significant Government control despite World Bank recommendations." },
  { year: "2000", text: "Pakistan's power demand does not grow as projected, leading to surplus capacity and financial inefficiencies." },
  { year: "2001", text: "The World Bank admits failures in the PSEDP program, acknowledging its role in increasing Pakistan’s debt burden." },
];

// Animation Variants
const scrollVariants = {
  initial: { x: 0 },
  animate: {
    x: ["0%", "-100%"],
    transition: {
      ease: "linear",
      duration: 50, // Adjust speed of scrolling (seconds)
      repeat: Infinity,
    },
  },
};

export default function PolicyEnergy() {
  const theme = useTheme();
  const containerRef = useRef(null);

  // Enable smooth manual scrolling
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", (e) => {
        e.preventDefault();
        container.scrollLeft += e.deltaY * 2; // Scrolls horizontally with the mouse wheel
      });
    }
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 20px",
        backgroundColor: theme.palette.background.default,
        width: "100%",
        textAlign: "center",
      }}
    >
      {/* Title */}
      <Typography
        variant="h2"
        color="primary"
        fontWeight="bold"
        sx={{ marginBottom: 4, textTransform: "uppercase", letterSpacing: 1 }}
      >
        Energy Policy Timeline
      </Typography>

      {/* Scrollable Timeline Container */}
      <Box
        ref={containerRef}
        sx={{
          display: "flex",
          overflowX: "auto",
          width: "100%",
          padding: "20px 0",
          scrollSnapType: "x mandatory", // Ensures smooth snapping per event
          scrollbarWidth: "none", // Hide scrollbar for Firefox
          "&::-webkit-scrollbar": { display: "none" }, // Hide scrollbar for Chrome/Safari
        }}
      >
        {/* Animated Scrollable Events */}
        <motion.div
          variants={scrollVariants}
          initial="initial"
          animate="animate"
          style={{
            display: "flex",
            gap: "40px",
            padding: "0 20px",
          }}
        >
          {events.map((event, index) => (
            <Box
              key={index}
              sx={{
                minWidth: "350px", // Increased width for better text containment
                maxWidth: "350px",
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.text.secondary,
                padding: "20px",
                borderRadius: "16px",
                boxShadow: 5,
                textAlign: "center",
                scrollSnapAlign: "center", // Ensures smooth stop at each event
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.05)", // Subtle hover effect
                  boxShadow: 10,
                },
              }}
            >
              <Typography
                variant="h5"
                fontWeight="bold"
                sx={{
                  color: theme.palette.warning.main,
                  marginBottom: 1,
                  fontSize: "1.8rem",
                }}
              >
                {event.year}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: "1rem",
                  lineHeight: "1.5",
                  maxHeight: "120px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {event.text}
              </Typography>
            </Box>
          ))}
        </motion.div>
      </Box>
    </Box>
  );
}
