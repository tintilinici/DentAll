import { PropsWithChildren } from 'react'
import Sidebar from './Sidebar'
import { cn } from '../lib/utils'

interface Props {
  className?: string
}

const SidebarLayout = (props: PropsWithChildren<Props>) => {
  return (
    <div className={cn('flex h-full bg-blue-50', props.className)}>
      <Sidebar />
      <div className='flex-1 bg-inherit p-8'>{props.children}</div>
    </div>
  )
}

export default SidebarLayout
