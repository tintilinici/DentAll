import { Input } from '@chakra-ui/react'
import React from 'react'

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
