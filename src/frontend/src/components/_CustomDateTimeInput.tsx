import { Input } from '@chakra-ui/react'
import React from 'react'

// Dont use on it's own, use it with forwardRef
// Used to give a reactdate picker a chakra input style
const CustomDateTimeInput = (
  props: React.HTMLProps<HTMLInputElement>,
  ref: React.Ref<HTMLInputElement>
) => (
  <Input
    placeholder={props.placeholder}
    w='100%'
    onClick={props.onClick}
    value={props.value}
    onChange={props.onChange}
    ref={ref}
  />
)

export default CustomDateTimeInput
