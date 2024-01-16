import { Tag, TagLabel } from '@chakra-ui/react'
import { Accommodation } from '../lib/api.types'

interface Porps {
  accommodationType: Accommodation['accommodationType']
}

const AccommodationTypeTag = ({ accommodationType }: Porps) => {
  return (
    <Tag
      backgroundColor={
        accommodationType === 'HOUSE'
          ? 'lightcoral'
          : accommodationType === 'APARTMENT'
            ? 'lightgreen'
            : 'lightblue'
      }
    >
      <TagLabel className='text-gray-700'>{accommodationType.toLowerCase()}</TagLabel>
    </Tag>
  )
}

export default AccommodationTypeTag
