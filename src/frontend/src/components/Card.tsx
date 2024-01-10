import { PropsWithChildren } from 'react'
import { cn } from '../lib/utils'

interface Props {
  className?: string
}
const Card = (props: PropsWithChildren<Props>) => {
  return (
    <div className={cn('bg-white rounded-xl p-6 shadow-sm', props.className)}>{props.children}</div>
  )
}

export default Card
