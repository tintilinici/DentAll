import { PropsWithChildren } from 'react'
import { cn } from '../lib/utils'

interface Props {
  className?: string
}
const Card = (props: PropsWithChildren<Props>) => {
  return (
    <div className={cn('rounded-xl bg-white p-6 shadow-sm', props.className)}>{props.children}</div>
  )
}

export default Card
