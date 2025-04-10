// import { useState } from 'react'
// import Joyride from 'react-joyride'

// const Tour = () => {
//     const [runTour, setRunTour] = useState(true)
//     const location = useLocation() 

//     return (
//     <div className='flex justify-between items-center h-screen bg-gray-200 text-2xl'>
//     <Joyride 
//         steps={[
//             {
//             target: '.tour-0',
//             content: 'This is the first tour step!',
//             disableBeacon: true,
//             },
//             {
//             target: '.tour-1',
//             content: 'This is the second tour step!',
//             disableBeacon: true,
//             },
//             {   
//             target: '.tour-2',
//             content: 'This is the third tour step!',
//             disableBeacon: true,
//             },
//             {
//             target: '.tour-3',
//             content: 'This is the fourth tour step!',
//             disableBeacon: true,
//             },
//             {
//             target: '.tour-4',
//             content: 'This is the fifth tour step!',
//             disableBeacon: true,
//             },
//             {
//             target: '.tour-5',
//             content: 'This is the sixth tour step!',
//             disableBeacon: true,
//             },
//             {
//             target: '.tour-6',
//             content: 'This is the seventh tour step!',
//             disableBeacon: true,
//             },
//             {
//             target: '.tour-7',
//             content: 'This is the eighth tour step!',
//             disableBeacon: true,
//             },
//         ]}
//         continuous={true}
//         run={runTour}
//         showProgress={true}
//         showSkipButton={true}
//         styles={{
//             options: {
//             zIndex: 10000,
//             },
//         }}
//     />
//         <div className="tour-0">tour-0</div>
//         <div className="tour-1">tour-1</div>
//         <div className="tour-2">tour-2</div>
//         <div className="tour-3">tour-3</div>
//         <div className="tour-4">tour-4</div>
//         <div className="tour-5">tour-5</div>
//         <div className="tour-6">tour-6</div>
//         <div className="tour-7">tour-7</div>
//     </div>
//   )
// }

// export default Tour