const BetAreaPK10 = () => import('@/pages/BetArea/pk10')
const BetAreaCqssc = () => import('@/pages/BetArea/cqssc')
const BetAreaXyft = () => import('@/pages/BetArea/xyft')
const BetAreaPcdd = () => import('@/pages/BetArea/pcdd')
const BetAreaXync = () => import('@/pages/BetArea/cqxync')
const BetAreaKlsf = () => import('@/pages/BetArea/gdklsf')
const BetAreaMask = () => import('@/pages/BetArea/masksix')
export default [
  {
    path: '/games/pk10',
    name: 'pk10',
    component: BetAreaPK10
  },
  {
    path: '/games/cqssc',
    name: 'cqssc',
    component: BetAreaCqssc
  },
  {
    path: '/games/xyft',
    name: 'xyft',
    component: BetAreaXyft
  },
  {
    path: '/games/pcdd',
    name: 'pcdd',
    component: BetAreaPcdd
  },
  {
    path: '/games/cqxync',
    name: 'cqxync',
    component: BetAreaXync
  },
  {
    path: '/games/gdklsf',
    name: 'gdklsf',
    component: BetAreaKlsf
  },
  {
    path: '/games/marksix',
    name: 'marksix',
    component: BetAreaMask
  }
]
